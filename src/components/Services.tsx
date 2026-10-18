"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries/en";

/** What I offer, one line each; a line opens in place to say a little more. */
export function Services({ services }: { services: Dictionary["services"] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul>
      {services.items.map((item, i) => {
        const expanded = open === i;
        return (
          <li key={item.title}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`service-${i}`}
              onClick={() => setOpen(expanded ? null : i)}
              className="group flex w-full items-baseline justify-between gap-4 py-[7px] text-left"
            >
              <span>{item.title}</span>
              <span
                aria-hidden
                className={[
                  "font-mono text-[13px] transition-[transform,color] duration-300 group-hover:text-fg",
                  expanded ? "rotate-45 text-fg" : "text-faint",
                ].join(" ")}
              >
                +
              </span>
            </button>
            <div id={`service-${i}`} className="fold" data-open={expanded} inert={!expanded}>
              <div>
                <p className="max-w-[52ch] pb-2.5 text-sm text-muted">{item.text}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
