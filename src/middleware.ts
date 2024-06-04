import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = ["/portfolio", "/leaderboard", "/profile"];

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const url = nextUrl.clone();
  const sessionCookie = cookies.get("SESSION_ID");

  console.log({sessionCookie});
  if (!sessionCookie) {
    if (AUTH_PAGES.some((page) => nextUrl.pathname.startsWith(page))) {
      url.pathname = "/signin";
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } else {
    return NextResponse.next();
  }
}
