import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userType = request.cookies.get("userType")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/dashboard/admin") &&
    userType !== "admin"
  ) {
    return NextResponse.redirect(new URL("/dashboard/general", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
