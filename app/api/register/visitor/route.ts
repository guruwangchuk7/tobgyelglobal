import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/app/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, country, profession, purpose, daysAttending } = body;

    if (!fullName || !email || !phone || !country) {
      return NextResponse.json(
        { error: "Full name, email, phone, and country are required." },
        { status: 400 }
      );
    }

    const passCode = `TGE-PASS-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      full_name: fullName,
      email,
      phone,
      country,
      profession: profession || "Visitor",
      purpose: purpose || "General Business",
      days_attending: Array.isArray(daysAttending) ? daysAttending : [daysAttending || "Day 1"],
      pass_code: passCode,
      status: "Approved",
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from("visitors").insert([payload]).select();
      if (error) {
        console.error("[SUPABASE VISITOR ERROR]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, data: data[0] });
    }

    return NextResponse.json({
      success: true,
      message: "Visitor pass generated (Supabase env pending).",
      data: payload,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process visitor registration." },
      { status: 500 }
    );
  }
}
