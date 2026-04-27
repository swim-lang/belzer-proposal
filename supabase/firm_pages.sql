create table if not exists public.firm_pages (
  id uuid primary key default gen_random_uuid(),
  firm_name text not null,
  slug text not null unique,
  url text not null,
  status text not null default 'active',
  template text not null default 'preMeeting',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.firm_pages enable row level security;
