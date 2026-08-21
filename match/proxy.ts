import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isProtectedRoute =
    nextUrl.pathname.startsWith("/analyze") ||
    nextUrl.pathname.startsWith("/history");

  if (isProtectedRoute && !isLoggedIn) {
    const redirectUrl = new URL("/login", nextUrl.origin);

    redirectUrl.searchParams.set(
      "callbackUrl",
      nextUrl.pathname
    );

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};