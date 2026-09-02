import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/app/lib/supabaseAdmin";
import { isHoneypotTripped } from "@/app/lib/spam";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { organizationName, contactPerson, email, phone, tier, budget, message } = body;

    if (isHoneypotTripped(body)) {
      return NextResponse.json({ success: true, message: "Received." });
    }

    if (!organizationName || !contactPerson || !email || !phone) {
      return NextResponse.json(
        { error: "Organization name, contact person, email, and phone are required." },
        { status: 400 }
      );
    }

    const payload = {
      organization_name: organizationName,
      contact_person: contactPerson,
      email,
      phone,
      tier: tier || "Official Partner",
      budget: budget || "",
      message: message || "",
      status: "Pending",
      created_at: new Date().toISOString(),
    };

    if (isSupabaseAdminConfigured()) {
      const { data, error } = await supabaseAdmin.from("sponsors").insert([payload]).select();
      if (error) {
        console.error("[SUPABASE SPONSOR ERROR]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, data: data[0] });
    }

    return NextResponse.json({
      success: true,
      message: "Sponsor application recorded (Supabase env pending).",
      data: payload,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process sponsor application." },
      { status: 500 }
    );
  }
}
