import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const auth = request.cookies.get("Authorization");

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (auth) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    if (auth) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/wishlist",
  ],
};
