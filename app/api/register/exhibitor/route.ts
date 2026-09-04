import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/app/lib/supabaseAdmin";
import { isHoneypotTripped } from "@/app/lib/spam";
import { sendEmailNotification } from "@/app/lib/emailNotifier";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, contactPerson, email, phone, sector, boothSize, description } = body;

    if (isHoneypotTripped(body)) {
      return NextResponse.json({ success: true, message: "Received." });
    }

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

    let insertedData = payload;

    if (isSupabaseAdminConfigured()) {
      const { data, error } = await supabaseAdmin.from("exhibitors").insert([payload]).select();
      if (error) {
        console.error("[SUPABASE EXHIBITOR ERROR]", error);
      } else if (data && data[0]) {
        insertedData = data[0];
      }
    }

    // Send email notification to Gmail / info@tobgyelglobalxpos.com
    await sendEmailNotification({
      subject: `[New Exhibitor Application] ${companyName}`,
      senderName: contactPerson,
      senderEmail: email,
      requestHeaders: request.headers,
      data: {
        "Form Type": "Exhibitor Registration",
        "Company Name": companyName,
        "Contact Person": contactPerson,
        "Email Address": email,
        "Phone Number": phone,
        "Industry Sector": sector || "General",
        "Booth Size": boothSize || "Standard (3m x 3m)",
        "Company Description / Products": description || "N/A",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Exhibitor application submitted and email sent.",
      data: insertedData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process exhibitor application." },
      { status: 500 }
    );
  }
}

