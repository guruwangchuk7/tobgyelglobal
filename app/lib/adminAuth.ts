import { cookies } from "next/headers";
import { ADMIN_COOKIE, isValidSessionValue } from "./adminSession";

// Re-export the edge-safe primitives so existing route handlers can keep
// importing them from "@/app/lib/adminAuth".
export {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createSessionValue,
  isValidSessionValue,
} from "./adminSession";

// Node-only helper (uses next/headers). Do NOT import into middleware.
export async function requireAdmin(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionValue(store.get(ADMIN_COOKIE)?.value);
}
