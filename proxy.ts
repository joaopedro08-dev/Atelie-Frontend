import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const blockedRoutes = ["/signup", "/user"];

  if (blockedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const response = NextResponse.next();
  
  response.headers.set("x-middleware-cache", "no-cache");

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};