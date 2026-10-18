import Link from "next/link";
import { type CSSProperties, Fragment, type ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries/en";
import { pad2 } from "@/lib/format";
import type { Locale } from "@/lib/i18n";

export type ViewProps = { locale: Locale; dict: Dictionary };

/** Every view is one column under the header, with its parts revealed together after the intro. */
export function Page({ children }: { children: ReactNode }) {
  return (
    <div data-reveal className="flex flex-col gap-7 pt-10 pb-16 sm:pt-[clamp(2rem,8vh,6.5rem)]">
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/**
 * The page's one big statement. Home sets it a size larger, and its words rise
 * into place one after another (see .word in globals.css). The full sentence
 * stays one accessible name; the per-word spans are only for the eye.
 */
export function Title({ children, size = "page" }: { children: string; size?: "home" | "page" }) {
  const words = children.split(" ");
  return (
    <h1
      aria-label={size === "home" ? children : undefined}
      className={[
        "max-w-[20ch] font-display font-semibold tracking-[-0.025em] text-balance",
        size === "home"
          ? "text-[clamp(2rem,5.4vw,3.625rem)] leading-[1.05]"
          : "text-[clamp(1.875rem,4.2vw,2.75rem)] leading-[1.08]",
      ].join(" ")}
    >
      {size === "home"
        ? words.map((word, i) => (
            <Fragment key={i}>
              {i > 0 && " "}
              <span aria-hidden className="word">
                <span style={{ "--i": i } as CSSProperties}>{word}</span>
              </span>
            </Fragment>
          ))
        : children}
    </h1>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-pretty text-muted">{children}</p>;
}

export function Body({ children }: { children: ReactNode }) {
  return <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-pretty">{children}</p>;
}

/** A titled part of a longer page, like the sections of the brief. */
export function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-rule pt-6">
      <h2 className="font-display text-[1.375rem] leading-tight font-medium tracking-[-0.01em]">{heading}</h2>
      {children}
    </section>
  );
}

/**
 * A section's name as a small label on a hairline, with how many things it
 * holds (or a short note) at the far end: SERVICES ──────── 06.
 */
export function SectionLabel({ children, count, aside }: { children: string; count?: number; aside?: string }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="shrink-0 eyebrow">{children}</h2>
      <span aria-hidden className="h-px flex-1 bg-rule" />
      {count !== undefined && <span className="eyebrow tabular-nums">{pad2(count)}</span>}
      {aside && <span className="eyebrow">{aside}</span>}
    </div>
  );
}

export function Actions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3 pt-2">{children}</div>;
}

const button = "inline-flex min-h-11 items-center rounded-full border border-fg px-[1.125rem] text-[0.9375rem]";

/** The solid button a page ends on, e.g. "Have a project?", with an arrow that nudges forward on hover. */
export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} prefetch className={`group gap-2 ${button} bg-fg text-bg transition-opacity hover:opacity-90`}>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  const className = `${button} hover:bg-fg/5`;
  return href.startsWith("http") ? (
    <a href={href} className={className} rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href} prefetch className={className}>
      {children}
    </Link>
  );
}
