import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/adminAuth";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/app/lib/supabaseAdmin";

const TABLES: Record<string, string> = {
  exhibitor: "exhibitors",
  sponsor: "sponsors",
  visitor: "visitors",
};

function tableFor(type: string | null): string | null {
  if (type && TABLES[type]) return TABLES[type];
  return null;
}

// GET /api/admin/registrations?type=exhibitor|sponsor|visitor
export async function GET(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const table = tableFor(new URL(request.url).searchParams.get("type"));
  if (!table) {
    return NextResponse.json({ error: "Invalid registration type." }, { status: 400 });
  }
  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ records: [] });
  }
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error(`[ADMIN REGISTRATIONS ${table}]`, error);
    return NextResponse.json({ records: [] });
  }
  return NextResponse.json({ records: data || [] });
}

// PATCH — update a submission's status
export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { type, id, status } = await request.json();
  const table = tableFor(type);
  if (!table || !id || !status) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from(table).update({ status }).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

// DELETE — remove a submission
export async function DELETE(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { type, id } = await request.json();
  const table = tableFor(type);
  if (!table || !id) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
