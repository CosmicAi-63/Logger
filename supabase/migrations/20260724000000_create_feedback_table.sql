create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  message text not null check (char_length(message) between 1 and 1000),
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

create policy "anyone can submit feedback" on public.feedback
  for insert to anon, authenticated
  with check (char_length(message) between 1 and 1000);
