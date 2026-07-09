# StudyTask

A student task and study tracker for assignments, priorities, subjects, and due dates.

## Purpose

StudyTask helps students keep track of their schoolwork in one place: what's due, what's high priority, and what's already done. Each user has a private, protected dashboard showing only their own tasks.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) components
- [Supabase](https://supabase.com) — Postgres database, authentication, and Row Level Security
- Deployed on [Vercel](https://vercel.com)

## Features

- Email/password signup and login (Supabase Auth)
- Protected `/dashboard` route — logged-out users are redirected to `/login`; logged-in users are redirected away from `/login` and `/signup`
- Create, view, edit, and delete study tasks
- Mark tasks complete/incomplete
- Filter tasks by status, priority, and subject
- Summary cards (total tasks, due soon, high priority, completed)
- Loading, empty, and error states throughout
- Each user can only ever see and modify their own tasks, enforced by Postgres Row Level Security — not just app-level checks

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment variable template and fill in your own Supabase project's values:
   ```bash
   cp .env.local.example .env.local
   ```
3. Set up the database — see [Supabase setup](#supabase-setup) below.
4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Defined in `.env.local` (never committed — see `.gitignore`). Names only, no real values here:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Both come from your Supabase project's **Project Settings → API** page (Project URL and the `anon` / `public` key — never the `service_role` key).

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run `supabase/schema.sql` from this repo. It creates the `study_tasks` table, an `updated_at` trigger, table grants for the `authenticated` role, and Row Level Security policies restricting every row to its owning user (`auth.uid() = user_id`).
3. Under **Authentication → URL Configuration**, set the Site URL (`http://localhost:3000` for local dev; your deployed URL in production).
4. Under **Authentication → Providers → Email**, confirm Email is enabled, and decide whether "Confirm email" should be on (recommended) or off (faster for testing).

## Deployment (Vercel)

1. Push this repo to GitHub and import it in Vercel ("Add New Project").
2. In the Vercel project's **Settings → Environment Variables**, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase project's real values (same ones from your local `.env.local`).
3. Deploy.
4. Back in Supabase, add your production Vercel URL to **Authentication → URL Configuration** (Site URL and/or Redirect URLs), or auth redirects will still point at localhost.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run a production build locally
- `npm run lint` — lint the codebase
