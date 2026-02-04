import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/login", "/register"];
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  // Check if path is public
  const isPublicPath = publicPaths.includes(pathname);
  const isAuthPath = authPaths.includes(pathname);

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not logged in and trying to access protected pages
  if (!token && !isPublicPath && !pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
