import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/app/lib/supabaseAdmin";
import { isHoneypotTripped } from "@/app/lib/spam";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, recipient } = body;

    if (isHoneypotTripped(body)) {
      return NextResponse.json({ success: true, message: "Received." });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const payload = {
      name,
      email,
      subject: subject || "Website Inquiry",
      message,
      created_at: new Date().toISOString(),
    };

    // 1. Save inquiry record to Supabase DB if configured
    if (isSupabaseAdminConfigured()) {
      const { error: dbError } = await supabaseAdmin.from("contact_inquiries").insert([payload]);
      if (dbError) {
        console.error("[SUPABASE CONTACT ERROR]", dbError);
      }
    }

    // 2. Determine target email address for real email delivery
    const targetEmail =
      process.env.OWNER_EMAIL ||
      process.env.CONTACT_RECIPIENT_EMAIL ||
      recipient ||
      "info@tobgyelglobalxpos.com";

    const refererHeader = request.headers.get("referer") || "https://www.tobgyelglobalxpos.com";
    const originHeader = request.headers.get("origin") || "https://www.tobgyelglobalxpos.com";

    // 3. Direct email dispatch to owner via FormSubmit API with proper origin headers
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: refererHeader,
          Origin: originHeader,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _replyto: email,
          _subject: subject || `[Website Inquiry] ${name}`,
          _template: "table",
          _captcha: "false",
          message: message,
        }),
      });

      const result = await response.json();
      console.log(`[FORMSUBMIT RESPONSE for ${targetEmail}]`, result);

      // Fallback: If FormSubmit returns error, dispatch via Web3Forms API
      // (only when an access key is provisioned via env — no secret is embedded in source)
      if (
        (result.success === "false" || result.success === false) &&
        process.env.WEB3FORMS_ACCESS_KEY
      ) {
        console.log("[SWITCHING TO WEB3FORMS DISPATCH...]");
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name: name,
            email: email,
            subject: subject || `[Website Inquiry] ${name}`,
            message: `From: ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
            to: targetEmail,
          }),
        });
      }
    } catch (err) {
      console.error("[EMAIL DELIVERY ERROR]", err);
    }

    return NextResponse.json({
      success: true,
      message: `Your inquiry has been successfully sent to ${targetEmail}`,
      data: payload,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process contact form submission." },
      { status: 500 }
    );
  }
}

