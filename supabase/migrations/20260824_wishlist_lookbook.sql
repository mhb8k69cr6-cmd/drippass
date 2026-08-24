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

create index if not exists lookbook_entries_user_created_idx
  on public.lookbook_entries(user_id, created_at desc);

alter table public.wishlist_items enable row level security;
alter table public.lookbook_entries enable row level security;

drop policy if exists wishlist_items_owner on public.wishlist_items;
create policy wishlist_items_owner on public.wishlist_items for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists lookbook_entries_owner on public.lookbook_entries;
create policy lookbook_entries_owner on public.lookbook_entries for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
