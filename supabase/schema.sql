create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  sizes jsonb not null default '[]'::jsonb,
  style_tags jsonb not null default '[]'::jsonb,
  addresses jsonb not null default '[]'::jsonb,
  notification_opt_in boolean not null default false,
  updated_at timestamptz not null default now()
);

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

create unique index if not exists subscriptions_one_active_per_user_idx
  on public.subscriptions(user_id) where status = 'ACTIVE';
create index if not exists subscriptions_user_idx on public.subscriptions(user_id, created_at desc);

create table if not exists public.pass_activation_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id text not null check (plan_id in ('SILVER', 'GOLD', 'VIP')),
  activation_key text not null,
  created_at timestamptz not null default now(),
  unique (user_id, activation_key)
);

create index if not exists pass_activation_events_user_idx
  on public.pass_activation_events(user_id, created_at desc);

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
  insert into public.subscriptions (user_id, plan_id, status)
  values (target_user_id, 'FREE', 'ACTIVE')
  on conflict (user_id) where status = 'ACTIVE' do nothing;
  insert into public.pass_entitlements (user_id)
  values (target_user_id)
  on conflict (user_id) do nothing;
end;
$$;

create or replace function public.consume_pass_feature(feature_name text, request_key text)
returns table (allowed boolean, remaining integer)
language plpgsql security definer set search_path = public as $$
declare
  current_plan text;
  current_remaining integer;
  monthly_used integer;
begin
  if auth.uid() is null or feature_name not in ('AI_TRY_ON', 'AI_STYLIST') or length(request_key) < 1 then
    return query select false, 0;
  end if;

  select plan_id into current_plan
  from public.subscriptions
  where user_id = auth.uid() and status = 'ACTIVE'
  order by created_at desc
  limit 1;

  if current_plan is null then
    perform public.provision_free_pass(auth.uid());
    current_plan := 'FREE';
  end if;

  if current_plan = 'SILVER' and feature_name = 'AI_TRY_ON' then
    select count(*) into monthly_used
    from public.pass_usage_events
    where user_id = auth.uid()
      and feature = 'AI_TRY_ON'
      and created_at >= (select current_period_start from public.subscriptions where user_id = auth.uid() and status = 'ACTIVE' order by created_at desc limit 1);
    if monthly_used >= 10 then
      return query select false, 0;
    end if;
  end if;

  if current_plan <> 'FREE' then
    insert into public.pass_usage_events (user_id, feature, idempotency_key)
    values (auth.uid(), feature_name, request_key);
    return query select true, -1;
  end if;

  if exists (
    select 1 from public.pass_usage_events
    where user_id = auth.uid() and feature = feature_name and idempotency_key = request_key
  ) then
    select case when feature_name = 'AI_TRY_ON' then ai_try_on_uses else ai_stylist_uses end
      into current_remaining
    from public.pass_entitlements where user_id = auth.uid();
    return query select true, coalesce(current_remaining, 0);
  end if;

  if feature_name = 'AI_TRY_ON' then
    update public.pass_entitlements
    set ai_try_on_uses = ai_try_on_uses - 1, updated_at = now()
    where user_id = auth.uid() and ai_try_on_uses > 0
    returning ai_try_on_uses into current_remaining;
  else
    update public.pass_entitlements
    set ai_stylist_uses = ai_stylist_uses - 1, updated_at = now()
    where user_id = auth.uid() and ai_stylist_uses > 0
    returning ai_stylist_uses into current_remaining;
  end if;

  if current_remaining is null then
    return query select false, 0;
  end if;

  insert into public.pass_usage_events (user_id, feature, idempotency_key)
  values (auth.uid(), feature_name, request_key);
  return query select true, current_remaining;
end;
$$;

create or replace function public.consume_rental_credit(credit_count integer)
returns table (allowed boolean, remaining integer)
language plpgsql security definer set search_path = public as $$
declare
  current_plan text;
  current_remaining integer;
begin
  if auth.uid() is null or credit_count < 1 then return query select false, 0; end if;
  select plan_id into current_plan from public.subscriptions where user_id = auth.uid() and status = 'ACTIVE' order by created_at desc limit 1;
  if current_plan in ('VIP') then return query select true, -1; end if;
  update public.pass_entitlements set rental_credits = rental_credits - credit_count, updated_at = now()
  where user_id = auth.uid() and rental_credits >= credit_count
  returning rental_credits into current_remaining;
  return query select current_remaining is not null, coalesce(current_remaining, 0);
end;
$$;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  status text not null check (status in ('upcoming', 'active', 'returned', 'cancelled')),
  rental_start date not null,
  rental_end date not null,
  total_amount integer not null check (total_amount >= 0),
  payment_mode text not null default 'sandbox' check (payment_mode = 'sandbox'),
  created_at timestamptz not null default now(),
  check (rental_end >= rental_start)
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_slug text not null,
  product_title text not null,
  size text not null,
  daily_price integer not null check (daily_price >= 0),
  rental_days integer not null check (rental_days > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  email text,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  rating integer not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 10 and 2000),
  display_name text,
  helpful_count integer not null default 0 check (helpful_count >= 0),
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table if not exists public.wishlist_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table if not exists public.lookbook_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  generated_image_url text not null,
  original_product_image_url text,
  title text not null,
  designer text not null,
  category text not null,
  caption text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists orders_user_created_idx on public.orders(user_id, created_at desc);
create index if not exists order_items_product_idx on public.order_items(product_id);
create index if not exists reviews_product_created_idx on public.reviews(product_id, created_at desc);

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
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.preferences enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.waitlist_entries enable row level security;
alter table public.reviews enable row level security;
alter table public.subscriptions enable row level security;
alter table public.pass_entitlements enable row level security;
alter table public.pass_usage_events enable row level security;
alter table public.pass_activation_events enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.lookbook_entries enable row level security;

drop policy if exists profiles_owner on public.profiles;
create policy profiles_owner on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists preferences_owner on public.preferences;
create policy preferences_owner on public.preferences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists orders_owner on public.orders;
create policy orders_owner on public.orders for select using (auth.uid() = user_id);
drop policy if exists orders_owner_insert on public.orders;
create policy orders_owner_insert on public.orders for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists order_items_owner on public.order_items;
create policy order_items_owner on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));
drop policy if exists order_items_owner_insert on public.order_items;
create policy order_items_owner_insert on public.order_items for insert to authenticated with check (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = (select auth.uid())));
drop policy if exists waitlist_owner on public.waitlist_entries;
create policy waitlist_owner on public.waitlist_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists reviews_public_read on public.reviews;
create policy reviews_public_read on public.reviews for select using (true);
drop policy if exists reviews_owner_insert on public.reviews;
create policy reviews_owner_insert on public.reviews for insert with check (auth.uid() = user_id and exists (select 1 from public.orders o join public.order_items i on i.order_id = o.id where o.user_id = auth.uid() and o.status = 'returned' and i.product_id = reviews.product_id));
drop policy if exists reviews_owner_update on public.reviews;
create policy reviews_owner_update on public.reviews for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists reviews_owner_delete on public.reviews;
create policy reviews_owner_delete on public.reviews for delete using (auth.uid() = user_id);

drop policy if exists subscriptions_owner on public.subscriptions;
create policy subscriptions_owner on public.subscriptions for select to authenticated using (auth.uid() = user_id);
drop policy if exists pass_entitlements_owner on public.pass_entitlements;
create policy pass_entitlements_owner on public.pass_entitlements for select to authenticated using (auth.uid() = user_id);
drop policy if exists pass_usage_events_owner on public.pass_usage_events;
create policy pass_usage_events_owner on public.pass_usage_events for select to authenticated using (auth.uid() = user_id);
drop policy if exists pass_activation_events_owner on public.pass_activation_events;
create policy pass_activation_events_owner on public.pass_activation_events for select to authenticated using (auth.uid() = user_id);
drop policy if exists wishlist_items_owner on public.wishlist_items;
create policy wishlist_items_owner on public.wishlist_items for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists lookbook_entries_owner on public.lookbook_entries;
create policy lookbook_entries_owner on public.lookbook_entries for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create or replace function public.activate_paid_pass(target_plan text, activation_key text)
returns table (plan_id text, status text)
language plpgsql security definer set search_path = public as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null or target_plan not in ('SILVER', 'GOLD', 'VIP') or length(activation_key) < 8 then
    raise exception 'Invalid pass activation request';
  end if;
  if exists (select 1 from public.pass_activation_events where user_id = current_user_id and pass_activation_events.activation_key = activate_paid_pass.activation_key) then
    return query select s.plan_id, s.status from public.subscriptions s where s.user_id = current_user_id and s.status = 'ACTIVE' order by s.created_at desc limit 1;
    return;
  end if;
  update public.subscriptions set status = 'EXPIRED', updated_at = now() where user_id = current_user_id and status = 'ACTIVE';
  insert into public.subscriptions (user_id, plan_id, status, started_at, current_period_start, current_period_end)
    values (current_user_id, target_plan, 'ACTIVE', now(), now(), now() + interval '1 month');
  insert into public.pass_entitlements (user_id, ai_try_on_uses, ai_stylist_uses, rental_credits)
    values (current_user_id, 0, 0, case target_plan when 'SILVER' then 2 when 'GOLD' then 4 else 0 end)
    on conflict (user_id) do update set rental_credits = excluded.rental_credits, updated_at = now();
  insert into public.pass_activation_events (user_id, plan_id, activation_key) values (current_user_id, target_plan, activate_paid_pass.activation_key);
  return query select target_plan, 'ACTIVE'::text;
end;
$$;

revoke all on function public.provision_free_pass(uuid) from public, anon, authenticated;
revoke all on function public.activate_paid_pass(text, text) from public, anon;
grant execute on function public.activate_paid_pass(text, text) to authenticated;
revoke all on function public.consume_pass_feature(text, text) from public, anon;
grant execute on function public.consume_pass_feature(text, text) to authenticated;
revoke all on function public.consume_rental_credit(integer) from public, anon;
grant execute on function public.consume_rental_credit(integer) to authenticated;

insert into public.subscriptions (user_id, plan_id, status)
select p.id, 'FREE', 'ACTIVE'
from public.profiles p
where not exists (select 1 from public.subscriptions s where s.user_id = p.id and s.status = 'ACTIVE');
insert into public.pass_entitlements (user_id)
select s.user_id from public.subscriptions s
where s.plan_id = 'FREE'
on conflict (user_id) do nothing;
