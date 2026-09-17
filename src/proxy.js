import { NextResponse } from "next/server";

export async function proxy(req) {
  // Better Auth এর ডিফল্ট সেশন কুকি চেক
  const sessionCookie = 
    req.cookies.get("better-auth.session_token") || 
    req.cookies.get("__Secure-better-auth.session_token");

  const { pathname } = req.nextUrl;

  // Protected Admin Routes Check
  if (pathname.startsWith("/admin")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protected Customer Account Routes Check
  if (pathname.startsWith("/account")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};