// Edge-safe admin session primitives (no Node Buffer, no next/headers).
// Safe to import from middleware (Edge runtime) AND route handlers (Node runtime).

export const ADMIN_COOKIE = "tge_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

const PAYLOAD = "admin-v1";
const SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "tge-insecure-dev-secret-change-me";

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toHex(signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createSessionValue(): Promise<string> {
  const signature = await sign(PAYLOAD);
  return `${PAYLOAD}.${signature}`;
}

export async function isValidSessionValue(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const separator = value.indexOf(".");
  if (separator < 0) return false;
  const payload = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  if (payload !== PAYLOAD) return false;
  const expected = await sign(payload);
  return timingSafeEqual(signature, expected);
}
