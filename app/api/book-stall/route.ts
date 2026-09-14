import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/app/lib/supabaseAdmin";
import { isHoneypotTripped } from "@/app/lib/spam";
import { sendEmailNotification } from "@/app/lib/emailNotifier";
import { getStallById } from "@/app/lib/stalls";
import { stallFileStore } from "@/app/lib/stallServerStore";

export const dynamic = "force-dynamic";

// GET /api/book-stall
// Public availability: returns ONLY the taken stall ids + status (no PII).
export async function GET() {
  if (isSupabaseAdminConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from("stall_bookings")
        .select("stall_id, status")
        .neq("status", "Rejected");
      if (error) throw error;
      return NextResponse.json({ taken: data || [] });
    } catch (err) {
      console.error("[BOOK STALL GET] Supabase unavailable, using local store:", (err as any)?.message || err);
    }
  }
  return NextResponse.json({ taken: stallFileStore.listTaken() });
}

// POST /api/book-stall — create a stall booking.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { stallId, contactName, companyName, email, phone, notes } = body;

    if (isHoneypotTripped(body)) {
      return NextResponse.json({ success: true, message: "Received." });
    }

    if (!stallId || !contactName || !email || !phone) {
      return NextResponse.json(
        { error: "Stall, contact name, email, and phone are required." },
        { status: 400 }
      );
    }

    // Validate the stall id against the server-side catalog (never trust labels
    // sent by the client for the authoritative fields).
    const stall = getStallById(stallId);
    if (!stall) {
      return NextResponse.json({ error: "Unknown stall selected." }, { status: 400 });
    }

    const payload = {
      stall_id: stall.id,
      stall_label: stall.label,
      zone: stall.zoneId,
      size: stall.size,
      contact_name: contactName,
      company_name: companyName || "",
      email,
      phone,
      country: stall.country,
      notes: notes || "",
      status: "Pending",
      created_at: new Date().toISOString(),
    };

    let persisted = false;

    if (isSupabaseAdminConfigured()) {
      try {
        // Guard against double-booking.
        const { data: existing, error: checkError } = await supabaseAdmin
          .from("stall_bookings")
          .select("id")
          .eq("stall_id", stall.id)
          .neq("status", "Rejected")
          .limit(1);
        if (checkError) throw checkError;
        if (existing && existing.length > 0) {
          return NextResponse.json(
            { error: "Sorry, this stall has just been booked. Please choose another." },
            { status: 409 }
          );
        }

        const { error } = await supabaseAdmin.from("stall_bookings").insert([payload]).select();
        if (error) {
          if ((error as any).code === "23505") {
            return NextResponse.json(
              { error: "Sorry, this stall has just been booked. Please choose another." },
              { status: 409 }
            );
          }
          throw error;
        }
        persisted = true;
      } catch (err) {
        console.error("[BOOK STALL] Supabase unavailable, using local store:", (err as any)?.message || err);
      }
    }

    // Fallback to the local file store when Supabase is off/unreachable.
    if (!persisted) {
      if (stallFileStore.isTaken(stall.id)) {
        return NextResponse.json(
          { error: "Sorry, this stall has just been booked. Please choose another." },
          { status: 409 }
        );
      }
      stallFileStore.add(payload);
    }

    // Notify the organiser by email (best-effort, mirrors the register routes).
    await sendEmailNotification({
      subject: `[New Stall Booking] ${stall.label}`,
      senderName: contactName,
      senderEmail: email,
      requestHeaders: request.headers,
      data: {
        "Form Type": "Stall Booking",
        Stall: stall.label,
        "Stall Size": stall.size,
        Zone: stall.zoneId,
        "Contact Person": contactName,
        "Company / Business": companyName || "N/A",
        "Email Address": email,
        "Phone Number": phone,
        Country: stall.country,
        Notes: notes || "N/A",
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, message: "Stall booking submitted." });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process stall booking." },
      { status: 500 }
    );
  }
}
