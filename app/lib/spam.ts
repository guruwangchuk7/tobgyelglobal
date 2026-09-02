// Honeypot spam check. The public forms render a hidden "website" field that
// real users never see or fill. If a submission arrives with it populated, the
// request is almost certainly an automated bot — we accept it with a success
// response (so the bot doesn't retry/adapt) but never persist it.
export function isHoneypotTripped(body: Record<string, unknown> | null | undefined): boolean {
  if (!body) return false;
  const value = body["website"];
  return typeof value === "string" && value.trim().length > 0;
}
