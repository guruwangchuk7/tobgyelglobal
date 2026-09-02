import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidSessionValue } from "@/app/lib/adminSession";

// Next 16 "proxy" convention (formerly middleware). Runs before the route
// handler. Defense in depth: gate the admin data APIs at the edge, so an
// unauthenticated request never reaches the PII/CMS handlers.
//
// Auth endpoints must stay reachable so a visitor can log in, check their
// session, and log out.
const PUBLIC_ADMIN_API = new Set([
  "/api/admin/login",
  "/api/admin/logout",
  "/api/admin/session",
]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin") && !PUBLIC_ADMIN_API.has(pathname)) {
    const valid = await isValidSessionValue(request.cookies.get(ADMIN_COOKIE)?.value);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
