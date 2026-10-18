"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";
import { type Locale, locales, viewPath } from "@/lib/i18n";
import { LocalTime } from "./LocalTime";

type HeaderProps = {
  locale: Locale;
  language: Dictionary["language"];
  /** Tooltip for the clock, e.g. "Local time in Linköping". */
  timeLabel: string;
};

/** The wordmark home, my local time, and the language switch, which keeps the current page. */
export function Header({ locale, language, timeLabel }: HeaderProps) {
  const rest = usePathname().replace(/^\/[^/]+/, "");

  return (
    <header className="flex items-center justify-between gap-4 py-5 sm:py-6">
      <Link href={viewPath(locale, "home")} className="flex min-h-11 items-center">
        {/* The same element as the intro's wordmark, so it lands here without a jump. */}
        <span id="site-mark" className="inline-block wordmark">
          {site.domain}
        </span>
      </Link>
      <div data-reveal className="-mr-2.5 flex items-center gap-3 font-mono text-xs">
        <span className="min-w-[5ch] text-right text-muted">
          <LocalTime locale={locale} label={timeLabel} />
        </span>
        <span aria-hidden className="h-3 w-px bg-rule" />
        <nav aria-label={language.label}>
          <ul className="flex">
            {locales.map((target) => (
              <li key={target}>
                <Link
                  href={`/${target}${rest}`}
                  hrefLang={target}
                  lang={target}
                  title={language[target]}
                  aria-current={target === locale ? "true" : undefined}
                  className="flex min-h-11 min-w-9 items-center justify-center text-faint uppercase hover:text-fg aria-[current=true]:text-fg"
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
