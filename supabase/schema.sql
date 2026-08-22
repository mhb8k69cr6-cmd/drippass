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

create index if not exists orders_user_created_idx on public.orders(user_id, created_at desc);
create index if not exists order_items_product_idx on public.order_items(product_id);
create index if not exists reviews_product_created_idx on public.reviews(product_id, created_at desc);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''));
  insert into public.preferences (user_id) values (new.id);
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

drop policy if exists profiles_owner on public.profiles;
create policy profiles_owner on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists preferences_owner on public.preferences;
create policy preferences_owner on public.preferences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists orders_owner on public.orders;
create policy orders_owner on public.orders for select using (auth.uid() = user_id);
drop policy if exists order_items_owner on public.order_items;
create policy order_items_owner on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));
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
