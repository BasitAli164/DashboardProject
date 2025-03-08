import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Example: Redirect to the home page
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
};