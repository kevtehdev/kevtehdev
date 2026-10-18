"use client";

import { type ReactNode, useRef, useState } from "react";

type BriefToggleProps = {
  read: string;
  hide: string;
  close: string;
  /** Shown beside the toggle, e.g. a link to the live site. */
  aside?: ReactNode;
  children: ReactNode;
};

/**
 * Opens the full brief in place under the project. Closing it from the bottom
 * brings the reader back up to the project they were reading about.
 */
export function BriefToggle({ read, hide, close, aside, children }: BriefToggleProps) {
  const [open, setOpen] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  function shut() {
    setOpen(false);
    top.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div ref={top}>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="brief"
          onClick={() => setOpen(!open)}
          className="link"
        >
          {open ? hide : read}{" "}
          <span
            aria-hidden
            className={["inline-block transition-transform duration-300", open ? "rotate-90" : ""].join(" ")}
          >
            →
          </span>
        </button>
        {aside}
      </div>
      <div id="brief" className="fold" data-open={open} inert={!open}>
        <div>
          <div className="mt-6 max-w-[56ch] border-t border-rule pt-6">
            {children}
            <button type="button" onClick={shut} className="mt-5 font-mono text-[13px] text-muted hover:text-fg">
              {close} ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
