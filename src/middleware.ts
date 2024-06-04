import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "./modules/apis";

const AUTH_PAGES = ["/portfolio", "/leaderboard", "/profile"];

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const url = nextUrl.clone();
  const sessionCookie = cookies.get("JSESSIONID");
  
  let isAuthenticated = false;
  if(sessionCookie) {
    const { validUser } = await checkAuth(
      `${sessionCookie?.name}=${sessionCookie?.value}`
    );

    isAuthenticated = validUser;
  }

  if (AUTH_PAGES.some((page) => nextUrl.pathname.startsWith(page))) {
    if (!isAuthenticated) {
      url.pathname = "/signin";
      return NextResponse.redirect(new URL("/signin", request.url));
    } else {
      return NextResponse.next();
    }
  }
}
