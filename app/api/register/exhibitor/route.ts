import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/app/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, contactPerson, email, phone, sector, boothSize, description } = body;

    if (!companyName || !contactPerson || !email || !phone) {
      return NextResponse.json(
        { error: "Company name, contact person, email, and phone are required." },
        { status: 400 }
      );
    }

    const payload = {
      company_name: companyName,
      contact_person: contactPerson,
      email,
      phone,
      sector: sector || "General",
      booth_size: boothSize || "Standard (3m x 3m)",
      description: description || "",
      status: "Pending",
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from("exhibitors").insert([payload]).select();
      if (error) {
        console.error("[SUPABASE EXHIBITOR ERROR]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, data: data[0] });
    }

    // Fallback response when Supabase credentials are not set up yet
    return NextResponse.json({
      success: true,
      message: "Exhibitor application recorded (Supabase env pending).",
      data: payload,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process exhibitor application." },
      { status: 500 }
    );
  }
}
