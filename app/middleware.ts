import { auth } from "@/lib/auth";
import { getSessionCookie } from "better-auth/cookies";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
  runtime: "nodejs",
};

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    // Optionally pass config if cookie name or prefix is customized in auth config.
    cookieName: "session_token",
    cookiePrefix: "better-auth",
  });
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (
    (!session || !sessionCookie) &&
    request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  if (
    session &&
    sessionCookie &&
    request.nextUrl.pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
