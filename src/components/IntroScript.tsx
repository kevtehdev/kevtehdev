"use client";

import { useEffect, useState } from "react";

// True once the first page has hydrated. Lives outside React on purpose: it
// must survive the layout remounting, e.g. when the language changes.
let hydrated = false;

/**
 * Renders the intro script into the server's HTML, where the browser runs it
 * before first paint, and hydrates over it. When React mounts this again on
 * the client it renders nothing: React never runs a script it mounts itself,
 * and by then the intro has already played or been skipped.
 */
export function IntroScript({ code }: { code: string }) {
  const [render] = useState(() => !hydrated);

  useEffect(() => {
    hydrated = true;
  }, []);

  return render ? <script dangerouslySetInnerHTML={{ __html: code }} /> : null;
}
