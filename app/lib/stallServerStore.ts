// SERVER-ONLY file-based fallback store for stall bookings.
//
// The project's primary datastore is Supabase. This module is a resilient local
// fallback used ONLY when Supabase is not configured or is unreachable, so the
// "Book a Stall" flow keeps working on localhost (and the admin still sees the
// bookings). When a working Supabase project + the stall_bookings table exist,
// the API routes use Supabase and this file is never touched.
//
// Data is written to <project>/.data/stall-bookings.json (gitignored).

import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface StoredBooking {
  id: string;
  stall_id: string;
  stall_label: string;
  zone: string;
  size: string;
  contact_name: string;
  company_name: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
  status: string;
  created_at: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "stall-bookings.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readAll(): StoredBooking[] {
  try {
    if (!fs.existsSync(FILE)) return [];
    const raw = fs.readFileSync(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(list: StoredBooking[]) {
  ensureDir();
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2), "utf8");
}

export const stallFileStore = {
  // Full records, newest first (admin view).
  listAll(): StoredBooking[] {
    return readAll().sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  },

  // Non-PII availability list.
  listTaken(): { stall_id: string; status: string }[] {
    return readAll()
      .filter((b) => b.status !== "Rejected")
      .map((b) => ({ stall_id: b.stall_id, status: b.status }));
  },

  isTaken(stallId: string): boolean {
    return readAll().some((b) => b.stall_id === stallId && b.status !== "Rejected");
  },

  add(booking: Omit<StoredBooking, "id">): StoredBooking {
    const list = readAll();
    const record: StoredBooking = { id: crypto.randomUUID(), ...booking };
    list.push(record);
    writeAll(list);
    return record;
  },

  updateStatus(id: string, status: string): boolean {
    const list = readAll();
    const idx = list.findIndex((b) => b.id === id);
    if (idx === -1) return false;
    list[idx].status = status;
    writeAll(list);
    return true;
  },

  remove(id: string): boolean {
    const list = readAll();
    const next = list.filter((b) => b.id !== id);
    if (next.length === list.length) return false;
    writeAll(next);
    return true;
  },
};
