import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/adminAuth";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/app/lib/supabaseAdmin";
import { stallFileStore } from "@/app/lib/stallServerStore";

export const dynamic = "force-dynamic";

const TABLE = "stall_bookings";

// GET /api/admin/stall-bookings — full records (admin only).
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (isSupabaseAdminConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from(TABLE)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json({ records: data || [] });
    } catch (err) {
      console.error("[ADMIN STALL BOOKINGS] Supabase unavailable, using local store:", (err as any)?.message || err);
    }
  }
  return NextResponse.json({ records: stallFileStore.listAll() });
}

// PATCH — update a booking's status.
export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await request.json();
  if (!id || !status) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (isSupabaseAdminConfigured()) {
    try {
      const { error } = await supabaseAdmin.from(TABLE).update({ status }).eq("id", id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("[ADMIN STALL BOOKINGS PATCH] Supabase unavailable, using local store:", (err as any)?.message || err);
    }
  }
  stallFileStore.updateStatus(id, status);
  return NextResponse.json({ success: true });
}

// DELETE — remove a booking (also frees the stall).
export async function DELETE(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (isSupabaseAdminConfigured()) {
    try {
      const { error } = await supabaseAdmin.from(TABLE).delete().eq("id", id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("[ADMIN STALL BOOKINGS DELETE] Supabase unavailable, using local store:", (err as any)?.message || err);
    }
  }
  stallFileStore.remove(id);
  return NextResponse.json({ success: true });
}
