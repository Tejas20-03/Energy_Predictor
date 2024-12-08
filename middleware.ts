import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userType = request.cookies.get("userType")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const path = request.nextUrl.pathname;

  if (path.startsWith("/dashboard/admin") && userType !== "admin") {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  if (path.startsWith("/dashboard/general") && userType !== "general") {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
