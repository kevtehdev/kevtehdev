"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * Tells the cell under the pointer where the pointer is, as --x and --y, so
 * its CSS can draw a soft light that follows it (see .spot in globals.css).
 * One listener for the whole grid; touch screens simply never see it.
 */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  function onMove(event: PointerEvent<HTMLElement>) {
    const cell = (event.target as HTMLElement).closest<HTMLElement>("[data-spot]");
    if (!cell) return;
    const rect = cell.getBoundingClientRect();
    cell.style.setProperty("--x", `${event.clientX - rect.left}px`);
    cell.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <div onPointerMove={onMove} className={className}>
      {children}
    </div>
  );
}
