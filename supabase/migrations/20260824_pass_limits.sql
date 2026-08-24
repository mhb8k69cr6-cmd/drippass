create or replace function public.consume_pass_feature(feature_name text, request_key text)
returns table (allowed boolean, remaining integer)
language plpgsql
security definer
set search_path = public
as $$
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

  if exists (
    select 1 from public.pass_usage_events
    where user_id = auth.uid() and feature = feature_name and idempotency_key = request_key
  ) then
    select case when feature_name = 'AI_TRY_ON' then ai_try_on_uses else ai_stylist_uses end
      into current_remaining
    from public.pass_entitlements where user_id = auth.uid();
    return query select true, coalesce(current_remaining, 0);
  end if;

  if current_plan = 'SILVER' and feature_name = 'AI_TRY_ON' then
    select count(*) into monthly_used
    from public.pass_usage_events
    where user_id = auth.uid()
      and feature = 'AI_TRY_ON'
      and created_at >= (
        select current_period_start from public.subscriptions
        where user_id = auth.uid() and status = 'ACTIVE'
        order by created_at desc limit 1
      );
    if monthly_used >= 10 then
      return query select false, 0;
    end if;
  end if;

  if current_plan <> 'FREE' then
    insert into public.pass_usage_events (user_id, feature, idempotency_key)
    values (auth.uid(), feature_name, request_key);
    return query select true, -1;
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

revoke all on function public.consume_pass_feature(text, text) from public, anon;
grant execute on function public.consume_pass_feature(text, text) to authenticated;
