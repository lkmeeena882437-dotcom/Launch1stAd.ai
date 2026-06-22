-- Launch1stAd.ai Supabase schema
-- Run this in Supabase SQL Editor after creating a project.

create table if not exists public.business_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_name text not null default '',
  category text not null default 'Clothing',
  product text not null default '',
  price_range text not null default '',
  location text not null default 'India',
  target_customer text not null default '',
  whatsapp text not null default '',
  website text not null default '',
  tone text not null default 'Local Hindi',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.campaign_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  input jsonb not null,
  output jsonb not null,
  summary text not null default '',
  source text not null default 'fallback',
  client_id text not null default '',
  client_name text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.platform_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null,
  account_label text not null default '',
  account_ref text not null default '',
  page_ref text not null default '',
  status text not null default 'not_connected',
  secure_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.launch_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  campaign_id text not null default '',
  provider text not null default '',
  status text not null default 'draft',
  payload jsonb not null default '{}'::jsonb,
  platform_response jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.business_profiles enable row level security;
alter table public.campaign_drafts enable row level security;
alter table public.platform_connections enable row level security;
alter table public.launch_requests enable row level security;

create policy "Users can read own business profiles" on public.business_profiles
  for select using (auth.uid() = user_id);

create policy "Users can insert own business profiles" on public.business_profiles
  for insert with check (auth.uid() = user_id);

create policy "Users can update own business profiles" on public.business_profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can delete own business profiles" on public.business_profiles
  for delete using (auth.uid() = user_id);

create policy "Users can read own campaign drafts" on public.campaign_drafts
  for select using (auth.uid() = user_id);

create policy "Users can insert own campaign drafts" on public.campaign_drafts
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own campaign drafts" on public.campaign_drafts
  for delete using (auth.uid() = user_id);

create policy "Users can read own platform connections" on public.platform_connections
  for select using (auth.uid() = user_id);

create policy "Users can insert own platform connections" on public.platform_connections
  for insert with check (auth.uid() = user_id);

create policy "Users can update own platform connections" on public.platform_connections
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can delete own platform connections" on public.platform_connections
  for delete using (auth.uid() = user_id);

create policy "Users can read own launch requests" on public.launch_requests
  for select using (auth.uid() = user_id);

create policy "Users can insert own launch requests" on public.launch_requests
  for insert with check (auth.uid() = user_id);

create policy "Users can update own launch requests" on public.launch_requests
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists business_profiles_user_id_idx on public.business_profiles(user_id);
create index if not exists campaign_drafts_user_id_created_at_idx on public.campaign_drafts(user_id, created_at desc);
create index if not exists campaign_drafts_client_id_idx on public.campaign_drafts(client_id);
create index if not exists platform_connections_user_id_idx on public.platform_connections(user_id);
create index if not exists launch_requests_user_id_idx on public.launch_requests(user_id);
create index if not exists launch_requests_campaign_id_idx on public.launch_requests(campaign_id);

-- Existing projects can run these safely if the table already exists.
alter table public.campaign_drafts add column if not exists client_id text not null default '';
alter table public.campaign_drafts add column if not exists client_name text not null default '';
