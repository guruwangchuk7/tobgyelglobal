import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const recipient = "info@tobgyelglobalxpos.com";
    
    // Direct submission via FormSubmit service targeting info@tobgyelglobalxpos.com
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: subject || `Website Inquiry from ${name}`,
          _template: "table",
          _captcha: "false",
          message: message,
        }),
      });

      const result = await response.json();
      console.log(`[FORMSUBMIT RESPONSE]`, result);
    } catch (err) {
      console.error("[FORMSUBMIT ERROR]", err);
    }

    return NextResponse.json({
      success: true,
      message: `Your inquiry has been successfully sent to ${recipient}`,
      data: { name, email, recipient, timestamp: new Date().toISOString() },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process contact form submission." },
      { status: 500 }
    );
  }
}
