-- Prepared for review. Not applied automatically or by the static app.
-- Use a dedicated development project before applying to production.
begin;
create table if not exists public.opportunities (
 id text primary key,
 title_es text not null,
 title_en text not null,
 brief_es jsonb not null,
 brief_en jsonb not null,
 source_url text not null check (source_url ~ '^https://'),
 source_checked_at timestamptz not null,
 published boolean not null default false,
 created_at timestamptz not null default now()
);
create table if not exists public.saved_opportunities (
 user_id uuid not null references auth.users(id) on delete cascade,
 opportunity_id text not null references public.opportunities(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key (user_id, opportunity_id)
);
alter table public.opportunities enable row level security;
alter table public.saved_opportunities enable row level security;
revoke all on public.opportunities, public.saved_opportunities from anon, authenticated;
grant select on public.opportunities to anon, authenticated;
grant select, insert, delete on public.saved_opportunities to authenticated;
create policy "Only published opportunities are readable" on public.opportunities for select to anon, authenticated using (published = true);
create policy "Read own saved ideas" on public.saved_opportunities for select to authenticated using ((select auth.uid()) = user_id);
create policy "Save published ideas for self" on public.saved_opportunities for insert to authenticated with check ((select auth.uid()) = user_id and exists(select 1 from public.opportunities o where o.id = opportunity_id and o.published = true));
create policy "Delete own saved ideas" on public.saved_opportunities for delete to authenticated using ((select auth.uid()) = user_id);
commit;
