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

alter table public.pass_activation_events enable row level security;

drop policy if exists pass_activation_events_owner on public.pass_activation_events;
create policy pass_activation_events_owner
  on public.pass_activation_events for select
  to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.activate_paid_pass(target_plan text, activation_key text)
returns table (plan_id text, status text)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  existing_plan text;
begin
  if current_user_id is null
    or target_plan not in ('SILVER', 'GOLD', 'VIP')
    or length(activation_key) < 8
  then
    raise exception 'Invalid pass activation request';
  end if;

  if exists (
    select 1
    from public.pass_activation_events
    where user_id = current_user_id and activation_key = activate_paid_pass.activation_key
  ) then
    return query
      select s.plan_id, s.status
      from public.subscriptions s
      where s.user_id = current_user_id and s.status = 'ACTIVE'
      order by s.created_at desc
      limit 1;
    return;
  end if;

  select s.plan_id into existing_plan
  from public.subscriptions s
  where s.user_id = current_user_id and s.status = 'ACTIVE'
  order by s.created_at desc
  limit 1;

  update public.subscriptions
  set status = 'EXPIRED', updated_at = now()
  where user_id = current_user_id and status = 'ACTIVE';

  insert into public.subscriptions (
    user_id, plan_id, status, started_at, current_period_start, current_period_end
  ) values (
    current_user_id, target_plan, 'ACTIVE', now(), now(), now() + interval '1 month'
  );

  insert into public.pass_entitlements (
    user_id, ai_try_on_uses, ai_stylist_uses, rental_credits
  ) values (
    current_user_id, 0, 0,
    case target_plan when 'SILVER' then 2 when 'GOLD' then 4 else 0 end
  )
  on conflict (user_id) do update set
    rental_credits = excluded.rental_credits,
    updated_at = now();

  insert into public.pass_activation_events (user_id, plan_id, activation_key)
  values (current_user_id, target_plan, activate_paid_pass.activation_key);

  return query select target_plan, 'ACTIVE'::text;
end;
$$;

revoke all on function public.activate_paid_pass(text, text) from public, anon;
grant execute on function public.activate_paid_pass(text, text) to authenticated;
