"use client";

import { type CSSProperties, type PointerEvent, useRef } from "react";

const rest = 300;
const peak = 720;
const reach = 220;

/**
 * The domain set across the full width of Home. Its letters rise into place
 * as the intro hands over (see .giant in globals.css), and under a mouse the
 * letters nearest the pointer gain weight through the font's variable axis.
 * Decorative: the header and the page title already say who this is.
 */
export function GiantWordmark({ text }: { text: string }) {
  const letters = useRef<HTMLSpanElement[]>([]);

  function onMove(event: PointerEvent<HTMLParagraphElement>) {
    if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (const letter of letters.current) {
      const box = letter.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (box.left + box.width / 2));
      const weight = rest + (peak - rest) * Math.max(0, 1 - distance / reach);
      letter.style.fontVariationSettings = `"wght" ${Math.round(weight)}`;
    }
  }

  function onLeave() {
    for (const letter of letters.current) letter.style.fontVariationSettings = "";
  }

  return (
    <div className="@container">
      <p aria-hidden onPointerMove={onMove} onPointerLeave={onLeave} className="giant select-none">
        {[...text].map((char, i) => (
          <span key={i}>
            <span
              ref={(el) => {
                if (el) letters.current[i] = el;
              }}
              style={{ "--i": i } as CSSProperties}
            >
              {char}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}
