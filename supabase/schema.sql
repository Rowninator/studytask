-- StudyTask: study_tasks table, updated_at trigger, and row level security.
-- Run this in the Supabase SQL editor for your project.

create table if not exists public.study_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text,
  subject text,
  priority text not null default 'Medium' check (priority in ('Low', 'Medium', 'High')),
  status text not null default 'Not Started' check (status in ('Not Started', 'In Progress', 'Completed')),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists study_tasks_user_id_idx on public.study_tasks (user_id);

-- Keep updated_at current on every row update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists study_tasks_set_updated_at on public.study_tasks;

create trigger study_tasks_set_updated_at
before update on public.study_tasks
for each row
execute function public.set_updated_at();

-- Row Level Security: each user can only access their own tasks.
alter table public.study_tasks enable row level security;

drop policy if exists "Users can view their own tasks" on public.study_tasks;
create policy "Users can view their own tasks"
on public.study_tasks for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own tasks" on public.study_tasks;
create policy "Users can insert their own tasks"
on public.study_tasks for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own tasks" on public.study_tasks;
create policy "Users can update their own tasks"
on public.study_tasks for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own tasks" on public.study_tasks;
create policy "Users can delete their own tasks"
on public.study_tasks for delete
using (auth.uid() = user_id);
