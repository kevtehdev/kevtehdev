"use client";

import { useState } from "react";

/** Copies the email address, for visitors without a mail app set up. */
export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
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
    <button type="button" onClick={copy} className="inline-flex min-h-11 items-center eyebrow hover:text-fg">
      <span aria-live="polite">{copied ? `${done} ✓` : label}</span>
    </button>
  );
}
