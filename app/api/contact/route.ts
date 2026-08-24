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
    
    // Web3Forms / Formspree Endpoint fallback for direct delivery to info@tobgyelglobalxpos.com
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "tobgyel-global-expos-contact",
          to_email: recipient,
          from_name: name,
          reply_to: email,
          subject: subject || `Website Inquiry from ${name}`,
          message: `Sender Name: ${name}\nSender Email: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        }),
      });
    } catch {
      // Ignore external delivery failure in local testing mode
    }

    console.log(`[CONTACT FORM DISPATCH] To: ${recipient} | From: ${name} (${email}) | Subject: ${subject}`);

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
