import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { Kicker } from "../disk/Label";

export type ViewProps = { locale: Locale; dict: Dictionary };

/** A quiet underlined link in running text. */
export const link = "underline decoration-ink/30 underline-offset-[0.2em] hover:decoration-ink";

/** The one solid ink button a view ends on. */
export function CtaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      prefetch
      className="bg-ink px-[1.5cqw] py-[0.3cqw] tracking-[0.08em] text-label uppercase hover:bg-ink-soft"
    >
      {children}
    </Link>
  );
}

/** The latest case's Lighthouse scores, with a link to run the test yourself. */
export function Figures({ dict, className = "" }: { dict: Dictionary; className?: string }) {
  return (
    <>
      <dl className={`flex flex-wrap gap-x-[4cqw] ${className}`}>
        {dict.case.figures.map((figure) => (
          <div key={figure.label} className="flex flex-row-reverse items-baseline justify-end gap-[1.5cqw]">
            <dt className="type-small tracking-[0.04em] text-pencil uppercase">{figure.label}</dt>
            <dd className="type-title tabular-nums">{figure.value}</dd>
          </div>
        ))}
      </dl>
      <Kicker>
        {dict.case.figuresSource} ·{" "}
        <a
          href={site.latestCase.pagespeed}
          className="whitespace-nowrap text-pass underline decoration-pass/40 underline-offset-[0.2em] hover:decoration-pass"
          rel="noopener"
        >
          {dict.case.test} ↗
        </a>
      </Kicker>
    </>
  );
}
