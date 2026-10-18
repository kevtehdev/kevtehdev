"use client";

import { useState } from "react";

/** The address itself as a button: one click copies it, for visitors without a mail app set up. */
export function EmailButton({ email, copyLabel, done }: { email: string; copyLabel: string; done: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the address is still there to select by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={copyLabel}
      className="group inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-mono text-sm text-muted transition-colors hover:text-fg"
    >
      <span aria-live="polite">{copied ? `${done} ✓` : email}</span>
      {!copied && (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
        </svg>
      )}
    </button>
  );
}
