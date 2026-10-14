"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries/en";
import { type Locale, locales } from "@/lib/i18n";

type LanguageSwitchProps = {
  locale: Locale;
  labels: Dictionary["language"];
};

/** Swaps the locale segment and keeps the view: /en/case ⇄ /sv/case. */
export function LanguageSwitch({ locale, labels }: LanguageSwitchProps) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <nav aria-label={labels.label} className="relative z-10">
      <ul className="flex gap-[1.2cqw]">
        {locales.map((target) => {
          const current = target === locale;

          return (
            <li key={target}>
              <Link
                href={`/${target}${rest}`}
                hrefLang={target}
                lang={target}
                title={labels[target]}
                aria-current={current ? "true" : undefined}
                className={[
                  "flex min-h-11 min-w-11 items-center justify-center border border-metal-edge px-[1.4cqw]",
                  "font-mono text-[max(0.75rem,2.4cqw)] tracking-[0.08em] uppercase",
                  current ? "bg-ink text-label" : "text-ink hover:bg-ink/10",
                ].join(" ")}
              >
                {target}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
