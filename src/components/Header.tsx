"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";
import { type Locale, locales, navViews, parentView, viewPath, views } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  language: Dictionary["language"];
};

/** The wordmark home, the menu, and the language switch, which keeps the current page. */
export function Header({ locale, nav, language }: HeaderProps) {
  const pathname = usePathname();
  const view = views.find((v) => pathname === viewPath(locale, v));
  const current = view && (parentView[view] ?? view);
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5">
      <Link href={viewPath(locale, "home")} className="flex min-h-11 items-center">
        {/* The same element as the intro's wordmark, so it lands here without a jump. */}
        <span id="site-mark" className="wordmark inline-block">
          {site.domain}
        </span>
      </Link>
      <div data-reveal className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
        <nav aria-label={nav.label}>
          <ul className="flex flex-wrap gap-x-5">
            {navViews.map((v) => (
              <li key={v}>
                <Link
                  href={viewPath(locale, v)}
                  prefetch
                  aria-current={v === current ? "page" : undefined}
                  className="flex min-h-11 items-center text-muted hover:text-fg aria-[current=page]:text-fg aria-[current=page]:underline aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-[0.4em]"
                >
                  {nav[v]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={language.label}>
          <ul className="flex gap-1 font-mono text-xs tracking-[0.08em] uppercase">
            {locales.map((target) => (
              <li key={target}>
                <Link
                  href={`/${target}${rest}`}
                  hrefLang={target}
                  lang={target}
                  title={language[target]}
                  aria-current={target === locale ? "true" : undefined}
                  className="flex min-h-11 min-w-9 items-center justify-center text-muted hover:text-fg aria-[current=true]:text-fg"
                >
                  {target}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
