import { type NextRequest, NextResponse } from "next/server";
import { NOT_FOUND_VIEW, defaultLocale, locales, views } from "@/lib/i18n";

const known = new Set<string>(views);
// Next.js metadata routes that live beside the views, e.g. /en/opengraph-image.
const metadataRoutes = new Set(["opengraph-image", "twitter-image", "icon", "apple-icon"]);

/**
 * Sends every URL without a locale prefix to the English version, and shows
 * the prerendered 404 for an unknown view, so it gets a real 404 status even on
 * the first visit (see [view]/page.tsx).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first, view, ...rest] = pathname.split("/");

  if (!locales.some((locale) => locale === first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  if (view === NOT_FOUND_VIEW || metadataRoutes.has(view)) return;
  if ((view && (!known.has(view) || view === "home")) || rest.length > 0) {
    const url = request.nextUrl.clone();
    url.pathname = `/${first}/${NOT_FOUND_VIEW}`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  // Everything except Next internals and files with an extension.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
