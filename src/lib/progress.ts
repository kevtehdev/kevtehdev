import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * The upgrade path. The site is drawn as the medium the shipped project count
 * has unlocked: a floppy today, a CD-ROM at 5 projects, and so on.
 */
export const media = [
  { id: "floppy", capacity: 1.44, unit: "MB", unlocksAt: 0 },
  { id: "cdrom", capacity: 700, unit: "MB", unlocksAt: 5 },
  { id: "hdd", capacity: 500, unit: "GB", unlocksAt: 15 },
  { id: "ssd", capacity: 2, unit: "TB", unlocksAt: 40 },
  { id: "server", capacity: 100, unit: "TB", unlocksAt: 100 },
] as const;

export type MediumInfo = (typeof media)[number];
export type Medium = MediumInfo["id"];

/** One sector per project between the current medium and the next. */
export type Sector = "shipped" | "writing" | "free";

// Run with NEXT_PUBLIC_PREVIEW_MEDIUM=cdrom to see a later medium before it's earned.
const previewIndex = media.findIndex((medium) => medium.id === process.env.NEXT_PUBLIC_PREVIEW_MEDIUM);

export function getProgress() {
  const shippedForReal = site.projects.filter((project) => project.status === "shipped").length;
  const shipped = previewIndex > 0 ? Math.max(shippedForReal, media[previewIndex].unlocksAt) : shippedForReal;
  const writing = site.projects.filter((project) => project.status === "writing").length;

  let index = 0;
  media.forEach((medium, i) => {
    if (shipped >= medium.unlocksAt) index = i;
  });
  const current = media[index];
  const next = index + 1 < media.length ? media[index + 1] : undefined;

  const total = next ? next.unlocksAt - current.unlocksAt : 1;
  const filled = Math.min(shipped - current.unlocksAt, total);
  const sectors: Sector[] = Array.from({ length: total }, (_, i) =>
    i < filled ? "shipped" : i < filled + writing ? "writing" : "free",
  );

  return {
    shipped,
    writing,
    index,
    current,
    previous: index > 0 ? media[index - 1] : undefined,
    next,
    sectors,
    filled,
    total,
    used: (current.capacity * filled) / total,
    toGo: next ? next.unlocksAt - shipped : 0,
  };
}

function format(locale: Locale, value: number, digits: number) {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
}

/** "1.44 MB" or "2 TB", with the locale's decimal separator. */
export function formatCapacity(locale: Locale, medium: MediumInfo) {
  return `${format(locale, medium.capacity, Number.isInteger(medium.capacity) ? 0 : 2)} ${medium.unit}`;
}

/** "0.29 / 1.44 MB". Small capacities get decimals, so a few projects still show. */
export function formatUsage(locale: Locale, used: number, medium: MediumInfo) {
  return `${format(locale, used, medium.capacity < 10 ? 2 : 0)} / ${formatCapacity(locale, medium)}`;
}
