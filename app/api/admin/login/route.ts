import { NextResponse } from "next/server";
import { createSessionValue, ADMIN_COOKIE, ADMIN_SESSION_MAX_AGE } from "@/app/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "admin123";

    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const value = await createSessionValue();
    const res = NextResponse.json({ success: true });
    res.cookies.set(ADMIN_COOKIE, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Login request failed." }, { status: 400 });
  }
}
