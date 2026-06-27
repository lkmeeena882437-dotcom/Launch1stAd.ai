-- Launch1stAd.ai private provider record storage
-- Run this after the base schema.
-- This table is for server-only provider connection records.
-- Keep RLS enabled and do not add client read policies.

create table if not exists public.provider_private_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  provider text not null,
  account_ref text not null default '',
  private_payload jsonb not null default '{}'::jsonb,
  expires_at timestamptz,
  scopes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.provider_private_records enable row level security;

create index if not exists provider_private_records_user_provider_idx on public.provider_private_records(user_id, provider);
create index if not exists provider_private_records_provider_account_idx on public.provider_private_records(provider, account_ref);
