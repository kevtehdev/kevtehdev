"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries/en";
import { pad2 } from "@/lib/format";
import { type Locale, navViews, parentView, viewPath, views } from "@/lib/i18n";

type DiskNavProps = {
  locale: Locale;
  labels: Dictionary["nav"];
};

/**
 * View switcher, drawn as one disk track split into numbered sectors with a
 * read head over the current one. Every view is a real URL, so a link to
 * /en/case opens the disk on the case. Below the disk on phones, along its
 * bottom edge above.
 */
export function DiskNav({ locale, labels }: DiskNavProps) {
  const pathname = usePathname();
  // Files opened from inside a view keep the read head on that view.
  const view = views.find((v) => pathname === viewPath(locale, v));
  const parent = view && parentView[view];
  const path = parent ? viewPath(locale, parent) : pathname;
  const currentIndex = navViews.findIndex((view) => path === viewPath(locale, view));

  return (
    <nav
      aria-label={labels.label}
      className="relative mt-6 sm:absolute sm:inset-x-[7%] sm:bottom-[3.6%] sm:mt-0 sm:h-[8.4%]"
    >
      {currentIndex >= 0 && (
        <div
          aria-hidden
          className="absolute bottom-full mb-[max(0.25rem,0.6cqw)] flex w-1/5 justify-center motion-safe:transition-[left] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ left: `${currentIndex * 20}%` }}
        >
          <span className="border-x-[max(0.375rem,1cqw)] border-t-[max(0.5rem,1.3cqw)] border-x-transparent border-t-desk-text sm:border-t-label" />
        </div>
      )}
      <ul className="grid h-full grid-cols-5 border border-desk-text/35 sm:border-disk-edge">
        {navViews.map((view, index) => {
          const href = viewPath(locale, view);
          const current = index === currentIndex;

          return (
            <li key={view} className="min-w-0 border-dashed border-desk-text/35 not-first:border-l sm:border-disk-edge">
              <Link
                href={href}
                prefetch
                aria-current={current ? "page" : undefined}
                className={[
                  "relative flex h-full min-h-11 items-center justify-center truncate px-1",
                  "type-body tracking-[0.08em] uppercase",
                  "transition-colors duration-150 sm:focus-visible:outline-label",
                  current
                    ? "bg-desk-text text-desk sm:bg-label sm:text-ink"
                    : "text-desk-text hover:hatch sm:text-disk-text sm:hover:text-label",
                ].join(" ")}
              >
                <span
                  aria-hidden
                  className={[
                    "absolute top-[max(0.125rem,0.5cqw)] left-[max(0.25rem,1cqw)] text-[max(0.5rem,1.5cqw)] tracking-[0.04em]",
                    current ? "text-desk/70 sm:text-pencil" : "text-desk-text/80 sm:text-disk-text/80",
                  ].join(" ")}
                >
                  {pad2(index)}
                </span>
                {labels[view]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
