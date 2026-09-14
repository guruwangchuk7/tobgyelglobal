-- ============================================================================
-- Tobgyel Global Expos — Stall Bookings table
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- Backs the public "Book a Stall" page and the admin "Stall Bookings" module.
-- Follows the same security model as the other PII tables: NO anon access.
-- All reads/writes go through the server API routes using the SERVICE ROLE key
-- (which bypasses RLS). The public availability endpoint only ever selects the
-- non-PII columns (stall_id / status), so no personal data reaches the browser.
-- ============================================================================

create table if not exists public.stall_bookings (
  id            uuid primary key default gen_random_uuid(),
  stall_id      text not null,              -- catalog id, e.g. "smart-1"
  stall_label   text not null,             -- human label, e.g. "Smart Techs #1 (INDIA)"
  zone          text not null,             -- zone id, e.g. "smart"
  size          text not null default '',  -- e.g. "6m x 6m"
  contact_name  text not null,
  company_name  text not null default '',
  email         text not null,
  phone         text not null,
  country       text not null default '',
  notes         text not null default '',
  status        text not null default 'Pending',   -- Pending | Approved | Rejected
  created_at    timestamptz not null default now()
);

-- One active (non-rejected) booking per physical stall. Rejected bookings are
-- freed up again, so a rejected row does not block a fresh booking.
create unique index if not exists stall_bookings_active_stall_uidx
  on public.stall_bookings (stall_id)
  where status <> 'Rejected';

create index if not exists stall_bookings_status_idx on public.stall_bookings (status);

-- ---------- Lock out the anon key completely (service role bypasses RLS) ----------
alter table public.stall_bookings enable row level security;
revoke all on public.stall_bookings from anon, authenticated;
-- No anon/authenticated policies => all their direct access is denied.
-- Inserts/reads happen through /api/book-stall and /api/admin/stall-bookings.
