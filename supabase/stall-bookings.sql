-- ============================================================================
-- Tobgyel Global Expos — Stall Bookings table
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query) or via psql:
--   psql "postgresql://postgres:[PASSWORD]@db.<ref>.supabase.co:5432/postgres" \
--        -f supabase/stall-bookings.sql
--
-- Backs the public "Book a Stall" page and the admin "Stall Bookings" module.
-- Same security model as the other PII tables (exhibitors/sponsors/visitors):
-- NO anon access. All reads/writes go through the server API routes using the
-- SERVICE ROLE key, which bypasses RLS. The public availability endpoint only
-- selects the non-PII columns (stall_id / status), so no personal data reaches
-- the browser.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.stall_bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  stall_id text NOT NULL,                 -- catalog id, e.g. 'smart-1'
  stall_label text NOT NULL,              -- human label, e.g. 'Smart Techs #1 (INDIA)'
  zone text NOT NULL,                     -- zone id, e.g. 'smart'
  size text NOT NULL DEFAULT '',          -- e.g. '6m x 6m'
  contact_name text NOT NULL,
  company_name text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone text NOT NULL,
  country text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  status text DEFAULT 'Pending'::text CHECK (status = ANY (ARRAY['Pending'::text, 'Approved'::text, 'Rejected'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT stall_bookings_pkey PRIMARY KEY (id)
);

-- One active (non-rejected) booking per physical stall. A rejected booking
-- frees the stall again, so a rejected row does not block a fresh booking.
CREATE UNIQUE INDEX IF NOT EXISTS stall_bookings_active_stall_uidx
  ON public.stall_bookings (stall_id)
  WHERE status <> 'Rejected';

CREATE INDEX IF NOT EXISTS stall_bookings_status_idx
  ON public.stall_bookings (status);

-- ---------- Lock out the anon key completely (service role bypasses RLS) ----------
ALTER TABLE public.stall_bookings ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.stall_bookings FROM anon, authenticated;
-- No anon/authenticated policies => all their direct access is denied.
-- Inserts/reads happen through /api/book-stall and /api/admin/stall-bookings.
