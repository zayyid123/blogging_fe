import { NextResponse } from "next/server";

export function middleware(request: any) {
  const { pathname } = request.nextUrl;

  // Ignore middleware for all routes starting with /api
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // check authentication
  const isAuthenticated = request.cookies.get("accessToken");

  if (!isAuthenticated) {
    // redirect login when not authenticate
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  const response = NextResponse.next();

  return response;
}

// Tentukan paths mana saja yang ingin diproses oleh middleware
export const config = {
  matcher: [
    '/',
    '/blog/:path*',
  ],
};
