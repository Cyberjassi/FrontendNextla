import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {
  const authtoken = request.cookies.get('token');
  const userType: any = request.cookies.get('userType');

  const loggedInUserNotAccessPaths = ['/login', '/registration'];

  if (loggedInUserNotAccessPaths.includes(request.nextUrl.pathname)) {
    if (authtoken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!authtoken) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      if (userType.value === "teacher" && request.nextUrl.pathname.startsWith('/student')) {
        return NextResponse.redirect(new URL("/", request.url));
      } else if (userType.value === "student" && request.nextUrl.pathname.startsWith('/teacher')) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }
}

export const config = {
  matcher: [
    "/registration",
    "/login",
    "/teacher/:path*",
    "/student/:path*"
  ]
};
