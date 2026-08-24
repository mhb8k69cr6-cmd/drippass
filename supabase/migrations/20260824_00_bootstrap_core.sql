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

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_outfits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  image_url text,
  outfit_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists orders_user_created_idx on public.orders(user_id, created_at desc);
create index if not exists order_items_product_idx on public.order_items(product_id);
create index if not exists reviews_product_created_idx on public.reviews(product_id, created_at desc);
create index if not exists lookbook_entries_user_created_idx on public.lookbook_entries(user_id, created_at desc);
create index if not exists chat_sessions_user_updated_idx on public.chat_sessions(user_id, updated_at desc);
create index if not exists saved_outfits_user_created_idx on public.saved_outfits(user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.preferences enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.waitlist_entries enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.lookbook_entries enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.saved_outfits enable row level security;

drop policy if exists profiles_owner on public.profiles;
create policy profiles_owner on public.profiles for all to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
drop policy if exists preferences_owner on public.preferences;
create policy preferences_owner on public.preferences for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists orders_owner on public.orders;
create policy orders_owner on public.orders for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists orders_owner_insert on public.orders;
create policy orders_owner_insert on public.orders for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists order_items_owner on public.order_items;
create policy order_items_owner on public.order_items for select to authenticated using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = (select auth.uid())));
drop policy if exists order_items_owner_insert on public.order_items;
create policy order_items_owner_insert on public.order_items for insert to authenticated with check (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = (select auth.uid())));
drop policy if exists waitlist_owner on public.waitlist_entries;
create policy waitlist_owner on public.waitlist_entries for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists reviews_public_read on public.reviews;
create policy reviews_public_read on public.reviews for select using (true);
drop policy if exists reviews_owner_write on public.reviews;
create policy reviews_owner_write on public.reviews for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists wishlist_items_owner on public.wishlist_items;
create policy wishlist_items_owner on public.wishlist_items for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists lookbook_entries_owner on public.lookbook_entries;
create policy lookbook_entries_owner on public.lookbook_entries for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists chat_sessions_owner on public.chat_sessions;
create policy chat_sessions_owner on public.chat_sessions for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists saved_outfits_owner on public.saved_outfits;
create policy saved_outfits_owner on public.saved_outfits for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
