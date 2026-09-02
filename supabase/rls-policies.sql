-- ============================================================================
-- Tobgyel Global Expos — Row Level Security (RLS) policies
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- Security model after the CR-2 / CR-3b fixes:
--   * PII tables (exhibitors, sponsors, visitors, contact_inquiries):
--       NO anonymous/public access at all. Every read/write goes through the
--       server API routes using the SERVICE ROLE key (which bypasses RLS).
--       Enabling RLS with NO anon/authenticated policy denies the anon key.
--   * CMS content tables (cms_events, cms_news):
--       Public SELECT is allowed (the website reads them in the browser).
--       Writes go through the authenticated admin API (service role).
--
-- NOTE: the `service_role` key ALWAYS bypasses RLS, so the server routes keep
-- working. The `anon` key (shipped to the browser) is what these policies lock.
-- ============================================================================

-- ---------- PII / submissions: lock out the anon key completely ----------
alter table public.exhibitors        enable row level security;
alter table public.sponsors          enable row level security;
alter table public.visitors          enable row level security;
alter table public.contact_inquiries enable row level security;

-- Belt-and-suspenders: revoke direct table grants from the public API roles.
revoke all on public.exhibitors        from anon, authenticated;
revoke all on public.sponsors          from anon, authenticated;
revoke all on public.visitors          from anon, authenticated;
revoke all on public.contact_inquiries from anon, authenticated;
-- (No policies are created for anon/authenticated => all their access is denied.
--  Inserts from the public forms now go through /api/register/* and /api/contact
--  which use the service role, so they are unaffected.)

-- ---------- CMS content: public read, service-role writes ----------
alter table public.cms_events enable row level security;
alter table public.cms_news   enable row level security;

drop policy if exists "cms_events public read" on public.cms_events;
drop policy if exists "cms_news public read"   on public.cms_news;

create policy "cms_events public read"
  on public.cms_events for select
  to anon, authenticated
  using (true);

create policy "cms_news public read"
  on public.cms_news for select
  to anon, authenticated
  using (true);

-- No anon INSERT/UPDATE/DELETE policies on cms_* => writes are service-role only
-- (admin saves go through /api/admin/cms-news).
