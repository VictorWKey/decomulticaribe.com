import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, isLocale } from "./lib/site-content";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  if (firstSegment && !isLocale(firstSegment)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|assets|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};