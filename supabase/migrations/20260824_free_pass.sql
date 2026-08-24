create extension if not exists pgcrypto;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id text not null check (plan_id in ('FREE', 'SILVER', 'GOLD', 'VIP')),
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'CANCELLED', 'EXPIRED', 'PAST_DUE')),
  started_at timestamptz not null default now(),
  current_period_start timestamptz not null default now(),
  current_period_end timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists subscriptions_one_active_per_user_idx on public.subscriptions(user_id) where status = 'ACTIVE';
create index if not exists subscriptions_user_idx on public.subscriptions(user_id, created_at desc);

create table if not exists public.pass_entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  ai_try_on_uses integer not null default 1 check (ai_try_on_uses >= 0),
  ai_stylist_uses integer not null default 1 check (ai_stylist_uses >= 0),
  rental_credits integer not null default 0 check (rental_credits >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.pass_usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature text not null check (feature in ('AI_TRY_ON', 'AI_STYLIST')),
  idempotency_key text not null,
  created_at timestamptz not null default now(),
  unique (user_id, feature, idempotency_key)
);
create index if not exists pass_usage_events_user_idx on public.pass_usage_events(user_id, created_at desc);

create or replace function public.provision_free_pass(target_user_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.subscriptions (user_id, plan_id, status) values (target_user_id, 'FREE', 'ACTIVE') on conflict (user_id) where status = 'ACTIVE' do nothing;
  insert into public.pass_entitlements (user_id) values (target_user_id) on conflict (user_id) do nothing;
end;
$$;

create or replace function public.consume_pass_feature(feature_name text, request_key text)
returns table (allowed boolean, remaining integer)
language plpgsql security definer set search_path = public as $$
declare
  current_plan text;
  current_remaining integer;
begin
  if auth.uid() is null or feature_name not in ('AI_TRY_ON', 'AI_STYLIST') or length(request_key) < 1 then return query select false, 0; end if;
  select plan_id into current_plan from public.subscriptions where user_id = auth.uid() and status = 'ACTIVE' order by created_at desc limit 1;
  if current_plan is null then perform public.provision_free_pass(auth.uid()); current_plan := 'FREE'; end if;
  if current_plan <> 'FREE' then return query select true, -1; end if;
  if exists (select 1 from public.pass_usage_events where user_id = auth.uid() and feature = feature_name and idempotency_key = request_key) then
    select case when feature_name = 'AI_TRY_ON' then ai_try_on_uses else ai_stylist_uses end into current_remaining from public.pass_entitlements where user_id = auth.uid();
    return query select true, coalesce(current_remaining, 0);
  end if;
  if feature_name = 'AI_TRY_ON' then
    update public.pass_entitlements set ai_try_on_uses = ai_try_on_uses - 1, updated_at = now() where user_id = auth.uid() and ai_try_on_uses > 0 returning ai_try_on_uses into current_remaining;
  else
    update public.pass_entitlements set ai_stylist_uses = ai_stylist_uses - 1, updated_at = now() where user_id = auth.uid() and ai_stylist_uses > 0 returning ai_stylist_uses into current_remaining;
  end if;
  if current_remaining is null then return query select false, 0; end if;
  insert into public.pass_usage_events (user_id, feature, idempotency_key) values (auth.uid(), feature_name, request_key);
  return query select true, current_remaining;
end;
$$;

create or replace function public.consume_rental_credit(credit_count integer)
returns table (allowed boolean, remaining integer)
language plpgsql security definer set search_path = public as $$
declare current_plan text; current_remaining integer;
begin
  if auth.uid() is null or credit_count < 1 then return query select false, 0; end if;
  select plan_id into current_plan from public.subscriptions where user_id = auth.uid() and status = 'ACTIVE' order by created_at desc limit 1;
  if current_plan = 'VIP' then return query select true, -1; end if;
  update public.pass_entitlements set rental_credits = rental_credits - credit_count, updated_at = now() where user_id = auth.uid() and rental_credits >= credit_count returning rental_credits into current_remaining;
  return query select current_remaining is not null, coalesce(current_remaining, 0);
end;
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''));
  insert into public.preferences (user_id) values (new.id);
  perform public.provision_free_pass(new.id);
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.subscriptions enable row level security;
alter table public.pass_entitlements enable row level security;
alter table public.pass_usage_events enable row level security;
drop policy if exists subscriptions_owner on public.subscriptions;
create policy subscriptions_owner on public.subscriptions for select to authenticated using (auth.uid() = user_id);
drop policy if exists pass_entitlements_owner on public.pass_entitlements;
create policy pass_entitlements_owner on public.pass_entitlements for select to authenticated using (auth.uid() = user_id);
drop policy if exists pass_usage_events_owner on public.pass_usage_events;
create policy pass_usage_events_owner on public.pass_usage_events for select to authenticated using (auth.uid() = user_id);
revoke all on function public.provision_free_pass(uuid) from public, anon, authenticated;
revoke all on function public.consume_pass_feature(text, text) from public, anon;
grant execute on function public.consume_pass_feature(text, text) to authenticated;
revoke all on function public.consume_rental_credit(integer) from public, anon;
grant execute on function public.consume_rental_credit(integer) to authenticated;

insert into public.subscriptions (user_id, plan_id, status)
select p.id, 'FREE', 'ACTIVE' from public.profiles p where not exists (select 1 from public.subscriptions s where s.user_id = p.id and s.status = 'ACTIVE');
insert into public.pass_entitlements (user_id)
select s.user_id from public.subscriptions s where s.plan_id = 'FREE' on conflict (user_id) do nothing;
