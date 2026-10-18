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
    // Phones: name and language on one row, the menu spread across a second row
    // under a hairline. Wider screens: one row, menu and language to the right.
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 pt-2 sm:flex sm:gap-x-8 sm:py-5">
      <Link href={viewPath(locale, "home")} className="flex min-h-11 items-center">
        {view === "home" ? (
          // Home sets the domain huge on the page, so the header carries the name.
          <span className="font-mono text-xs font-medium tracking-[0.08em] uppercase">{site.name}</span>
        ) : (
          // The same element as the intro's wordmark, so it lands here without a jump.
          <span id="site-mark" className="inline-block wordmark">
            {site.domain}
          </span>
        )}
      </Link>
      <nav
        data-reveal
        aria-label={nav.label}
        className="col-span-2 row-start-2 border-t border-rule text-sm sm:ml-auto sm:border-0"
      >
        <ul className="flex justify-between sm:justify-start sm:gap-x-5">
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
      <nav data-reveal aria-label={language.label} className="col-start-2 row-start-1 -mr-2.5 sm:mr-0">
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
    </header>
  );
}
