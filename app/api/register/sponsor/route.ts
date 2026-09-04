import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/app/lib/supabaseAdmin";
import { isHoneypotTripped } from "@/app/lib/spam";
import { sendEmailNotification } from "@/app/lib/emailNotifier";

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

    let insertedData = payload;

    if (isSupabaseAdminConfigured()) {
      const { data, error } = await supabaseAdmin.from("sponsors").insert([payload]).select();
      if (error) {
        console.error("[SUPABASE SPONSOR ERROR]", error);
      } else if (data && data[0]) {
        insertedData = data[0];
      }
    }

    // Send email notification to Gmail / info@tobgyelglobalxpos.com
    await sendEmailNotification({
      subject: `[New Sponsorship Request] ${organizationName}`,
      senderName: contactPerson,
      senderEmail: email,
      requestHeaders: request.headers,
      data: {
        "Form Type": "Sponsor Registration",
        "Organization Name": organizationName,
        "Contact Person": contactPerson,
        "Email Address": email,
        "Phone Number": phone,
        "Sponsorship Tier": tier || "Official Partner",
        "Estimated Budget": budget || "N/A",
        "Goals / Comments": message || "N/A",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Sponsorship request submitted and email sent.",
      data: insertedData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process sponsor application." },
      { status: 500 }
    );
  }
}

