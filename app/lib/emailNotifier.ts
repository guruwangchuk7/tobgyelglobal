export async function sendEmailNotification({
  subject,
  senderName,
  senderEmail,
  data,
  requestHeaders,
}: {
  subject: string;
  senderName: string;
  senderEmail: string;
  data: Record<string, any>;
  requestHeaders?: Headers;
}) {
  const targetEmail =
    process.env.OWNER_EMAIL ||
    process.env.CONTACT_RECIPIENT_EMAIL ||
    "info@tobgyelglobalxpos.com";

  const refererHeader = requestHeaders?.get("referer") || "https://www.tobgyelglobalxpos.com";
  const originHeader = requestHeaders?.get("origin") || "https://www.tobgyelglobalxpos.com";

  try {
    const payload = {
      name: senderName,
      email: senderEmail,
      _replyto: senderEmail,
      _subject: subject,
      _template: "table",
      _captcha: "false",
      ...data,
    };

    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: refererHeader,
        Origin: originHeader,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));
    console.log(`[FORMSUBMIT DISPATCH TO ${targetEmail}]`, result);

    if (
      (result?.success === "false" || result?.success === false) &&
      process.env.WEB3FORMS_ACCESS_KEY
    ) {
      console.log("[SWITCHING TO WEB3FORMS DISPATCH...]");
      const messageBody = Object.entries(data)
        .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
        .join("\n");

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name: senderName,
          email: senderEmail,
          subject: subject,
          message: `From: ${senderName} (${senderEmail})\n\n${messageBody}`,
          to: targetEmail,
        }),
      });
    }
    return true;
  } catch (err) {
    console.error("[EMAIL NOTIFIER ERROR]", err);
    return false;
  }
}
