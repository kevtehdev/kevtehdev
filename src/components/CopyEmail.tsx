"use client";

import { useState } from "react";

/**
 * Copies the email address, for visitors without a mail app set up. Shows
 * `label` (by default the address itself) and says so once it's copied.
 */
export function CopyEmail({ email, label = email, done }: { email: string; label?: string; done: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked: the address is still there to select by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center font-mono text-[13px] text-muted transition-colors hover:text-fg"
    >
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
