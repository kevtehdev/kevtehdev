import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries/en";
import { type Locale, viewPath } from "@/lib/i18n";
import { formatUsage, progress } from "@/lib/progress";
import { SectorMeter } from "./SectorMeter";

/**
 * Disk usage, shown in the menu bar. Opens UPGRADE.TXT; hover or focus explains
 * what fills the disk.
 */
export function UsageLink({
  locale,
  dict,
  placement = "above",
}: {
  locale: Locale;
  dict: Dictionary;
  placement?: "above" | "below";
}) {
  const below = placement === "below";

  return (
    <Link
      href={viewPath(locale, "upgrade")}
      aria-describedby="usage-hint"
      className="group relative inline-block decoration-pencil/40 underline-offset-[0.2em] hover:text-ink hover:underline"
    >
      <SectorMeter sectors={progress.sectors} /> {formatUsage(locale, progress.used, progress.current)}
      <span
        id="usage-hint"
        role="tooltip"
        className={`pointer-events-none absolute z-50 w-64 ${below ? "top-full right-0 mt-3" : "bottom-full left-1/2 mb-3 -translate-x-1/2"} bg-ink px-4 py-3 text-left font-mono text-xs leading-relaxed tracking-normal text-label normal-case opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        {dict.upgrade.hint}
        <span
          aria-hidden
          className={`absolute border-x-[7px] border-x-transparent ${below ? "right-6 bottom-full border-b-[7px] border-b-ink" : "top-full left-1/2 -ml-[7px] border-t-[7px] border-t-ink"}`}
        />
      </span>
    </Link>
  );
}
