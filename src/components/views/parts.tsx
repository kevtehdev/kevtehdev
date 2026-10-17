import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries/en";
import type { Locale } from "@/lib/i18n";

export type ViewProps = { locale: Locale; dict: Dictionary };

/** Every view is one column under the header, with its parts revealed together after the intro. */
export function Page({ children }: { children: ReactNode }) {
  return (
    <div data-reveal className="flex flex-col gap-7 pt-[clamp(2rem,8vh,6.5rem)] pb-16">
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/** The page's one big statement. Home sets it a size larger. */
export function Title({ children, size = "page" }: { children: ReactNode; size?: "home" | "page" }) {
  return (
    <h1
      className={[
        "max-w-[20ch] font-display font-semibold tracking-[-0.025em] text-balance",
        size === "home"
          ? "text-[clamp(2rem,5.4vw,3.625rem)] leading-[1.05]"
          : "text-[clamp(1.875rem,4.2vw,2.75rem)] leading-[1.08]",
      ].join(" ")}
    >
      {children}
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

export function Actions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3 pt-2">{children}</div>;
}

const button = "inline-flex min-h-11 items-center rounded-full border border-fg px-[1.125rem] text-[0.9375rem]";

/** The solid button a page ends on, e.g. "Have a project?". */
export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} prefetch className={`${button} bg-fg text-bg hover:opacity-85`}>
      {children}
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
