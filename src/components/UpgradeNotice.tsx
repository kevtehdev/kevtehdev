"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type UpgradeNoticeProps = {
  medium: string;
  bar: string;
  title: string;
  body: string;
  later: string;
  show: string;
  href: string;
};

const storageKey = "kevin-disk:seen-medium";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

/**
 * "Disk full" dialog, shown once per visitor after the site has upgraded to a
 * new medium. Remembers the medium it was shown for in localStorage.
 */
export function UpgradeNotice({ medium, bar, title, body, later, show, href }: UpgradeNoticeProps) {
  // The server renders it closed; the browser opens it unless this medium was seen.
  // Blocked storage counts as seen, so the notice never shows on every visit.
  const seen = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(storageKey) === medium;
      } catch {
        return true;
      }
    },
    () => true,
  );
  const [dismissed, setDismissed] = useState(false);
  const open = !seen && !dismissed;
  const primary = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) primary.current?.focus();
  }, [open]);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(storageKey, medium);
    } catch {
      // Storage blocked: closing for this visit is enough.
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4"
      onKeyDown={(e) => e.key === "Escape" && dismiss()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notice-title"
        className="w-full max-w-[340px] bg-metal shadow-[inset_0_0_0_1px_var(--color-metal-edge),4px_4px_0_var(--color-ink)]"
      >
        <p className="flex h-8 items-center bg-ink px-3 font-mono text-[0.6875rem] tracking-[0.1em] text-label uppercase">
          {bar}
        </p>
        <div className="flex flex-col gap-3.5 p-[18px]">
          <p id="notice-title" className="font-serif text-[1.625rem] leading-tight">
            {title}
          </p>
          <p className="font-mono text-xs leading-relaxed">{body}</p>
          <div aria-hidden className="h-3.5 bg-label p-[3px] shadow-[inset_0_0_0_1px_var(--color-metal-edge)]">
            <div className="flex h-full animate-copy gap-[3px]">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="flex-1 bg-ink" />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2.5">
            <button
              type="button"
              onClick={dismiss}
              className="min-h-11 px-4 font-mono text-xs tracking-[0.08em] uppercase shadow-[inset_0_0_0_1px_var(--color-ink)] hover:bg-ink/10"
            >
              {later}
            </button>
            <Link
              ref={primary}
              href={href}
              onClick={dismiss}
              className="inline-flex min-h-11 items-center bg-ink px-4 font-mono text-xs tracking-[0.08em] text-label uppercase hover:bg-ink-soft"
            >
              {show}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
