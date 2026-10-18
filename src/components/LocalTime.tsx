"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";

// Ticks every 15 s; the minute is all that is shown.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

/**
 * The time in Linköping right now, e.g. "14:32", so a visitor abroad knows
 * whether an email will be read today. Empty on the server, which can't know
 * when the page is viewed, and filled in once the page is live.
 */
export function LocalTime({ locale, label }: { locale: Locale; label: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: "Europe/Stockholm",
      }).format(new Date()),
    () => "",
  );

  return (
    <time title={label} className="tabular-nums">
      {time}
    </time>
  );
}
