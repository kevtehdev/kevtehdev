"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries/en";
import { type Locale, viewPath, views } from "@/lib/i18n";

type TrackListProps = {
  locale: Locale;
  label: string;
  titles: Dictionary["nav"];
};

/** Views opened from inside another view rather than as tracks of their own. */
const hidden = new Set<string>(["brief", "skills"]);
const tracks = views.filter((view) => !hidden.has(view));

/** The view switcher on the CD edition: the back of the booklet, one track per view. */
export function TrackList({ locale, label, titles }: TrackListProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="mt-4 bg-label px-4 py-3 sm:px-6">
      <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-pencil uppercase">{label}</p>
      <ol className="mt-2 grid grid-cols-2 sm:grid-cols-3">
        {tracks.map((view, index) => {
          const href = viewPath(locale, view);
          const current = pathname === href;

          return (
            <li key={view} className="min-w-0">
              <Link
                href={href}
                prefetch
                aria-current={current ? "page" : undefined}
                className={[
                  "flex min-h-11 items-center gap-3 px-2 font-mono text-sm tracking-[0.04em]",
                  current ? "bg-ink text-label" : "hover:bg-ink/5",
                ].join(" ")}
              >
                <span className={current ? "text-disk-text" : "text-pencil"}>{String(index + 1).padStart(2, "0")}</span>
                <span className="truncate">{titles[view]}</span>
                {current && (
                  <span
                    aria-hidden
                    className="ml-auto border-y-[6px] border-l-[9px] border-y-transparent border-l-label"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
