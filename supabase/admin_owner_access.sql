-- Launch1stAd.ai owner/admin review access
-- Run this after the base schema in Supabase SQL Editor.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create policy "Admins can read own admin record" on public.admin_users
  for select using (auth.uid() = user_id);

create policy "Admins can read all launch requests" on public.launch_requests
  for select using (exists (select 1 from public.admin_users where admin_users.user_id = auth.uid()));

create policy "Admins can update all launch requests" on public.launch_requests
  for update using (exists (select 1 from public.admin_users where admin_users.user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where admin_users.user_id = auth.uid()));

create index if not exists admin_users_user_id_idx on public.admin_users(user_id);

-- After your owner account signs in once, replace the email below and run:
-- insert into public.admin_users (user_id, role)
-- select id, 'owner' from auth.users where email = 'OWNER_EMAIL_HERE'
-- on conflict (user_id) do update set role = excluded.role;
