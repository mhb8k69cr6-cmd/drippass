alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists orders_owner_insert on public.orders;
create policy orders_owner_insert
  on public.orders for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists order_items_owner_insert on public.order_items;
create policy order_items_owner_insert
  on public.order_items for insert
  to authenticated
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = (select auth.uid())
    )
  );
