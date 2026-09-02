import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function GET() {
  const authenticated = await requireAdmin();
  return NextResponse.json({ authenticated });
}
