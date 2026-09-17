import { NextResponse } from "next/server";

export async function proxy(req) {
  const sessionCookie =
    req.cookies.get("better-auth.session_token") ||
    req.cookies.get("__Secure-better-auth.session_token");
  const adminCookie = req.cookies.get("admin_logged_in")?.value === "true";

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/account")) {
    if (!sessionCookie && !adminCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};