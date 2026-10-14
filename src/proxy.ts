import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

/** Sends every URL without a locale prefix to the English version. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (locales.some((locale) => locale === first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals and files with an extension.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
