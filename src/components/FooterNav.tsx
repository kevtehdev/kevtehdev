"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries/en";
import { type Locale, navViews, parentView, viewPath, views } from "@/lib/i18n";

/** Links to each page, so every view stays one click away from anywhere. */
export function FooterNav({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname();
  const view = views.find((v) => pathname === viewPath(locale, v));
  const current = view && (parentView[view] ?? view);

  return (
    <nav aria-label={nav.label}>
      <ul className="flex flex-wrap gap-x-4">
        {navViews.map((v) => (
          <li key={v}>
            <Link
              href={viewPath(locale, v)}
              prefetch
              aria-current={v === current ? "page" : undefined}
              className="flex min-h-11 items-center hover:text-fg aria-[current=page]:text-fg"
            >
              {nav[v]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
