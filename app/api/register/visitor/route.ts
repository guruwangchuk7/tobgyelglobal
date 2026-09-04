import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/app/lib/supabaseAdmin";
import { isHoneypotTripped } from "@/app/lib/spam";
import { sendEmailNotification } from "@/app/lib/emailNotifier";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, country, profession, purpose, daysAttending } = body;

    if (isHoneypotTripped(body)) {
      return NextResponse.json({ success: true, message: "Received." });
    }

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

    let insertedData = payload;

    if (isSupabaseAdminConfigured()) {
      const { data, error } = await supabaseAdmin.from("visitors").insert([payload]).select();
      if (error) {
        console.error("[SUPABASE VISITOR ERROR]", error);
      } else if (data && data[0]) {
        insertedData = data[0];
      }
    }

    // Send email notification to Gmail / info@tobgyelglobalxpos.com
    await sendEmailNotification({
      subject: `[New Visitor Pass Issued] ${fullName}`,
      senderName: fullName,
      senderEmail: email,
      requestHeaders: request.headers,
      data: {
        "Form Type": "Trade Visitor Registration",
        "Full Name": fullName,
        "Email Address": email,
        "Phone Number": phone,
        "Country / Region": country,
        "Profession / Industry": profession || "Visitor",
        "Visit Purpose": purpose || "General Business",
        "Days Attending": Array.isArray(daysAttending) ? daysAttending.join(", ") : (daysAttending || "Day 1"),
        "Generated Visitor Pass Code": passCode,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Visitor pass generated and email sent.",
      data: insertedData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process visitor registration." },
      { status: 500 }
    );
  }
}

