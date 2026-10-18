import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries/en";
import type { Locale } from "@/lib/i18n";

export type ViewProps = { locale: Locale; dict: Dictionary };

/** A page is a stack of rows; see Row. */
export function Page({ children }: { children: ReactNode }) {
  return <div className="pb-16">{children}</div>;
}

/**
 * One section of a page: a small mono label on the left, the content on the
 * right, a hairline between rows. On phones the label sits above. Rows settle
 * in turn after the intro; `n` is this row's place in that order. The label is
 * the row's heading, except in the row that holds the page's h1.
 */
export function Row({
  label,
  n = 0,
  id,
  heading = true,
  children,
}: {
  label: ReactNode;
  n?: number;
  id?: string;
  heading?: boolean;
  children: ReactNode;
}) {
  const Label = heading ? "h2" : "p";
  return (
    <section
      id={id}
      data-reveal
      style={{ "--n": n } as CSSProperties}
      className="grid scroll-mt-6 gap-x-6 gap-y-2 border-t border-rule py-7 first:border-t-0 first:pt-9 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:py-8"
    >
      <Label className="label font-normal">{label}</Label>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

/** The page's one statement. */
export function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-4 max-w-[24ch] text-[clamp(1.5rem,4vw,1.875rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-balance">
      {children}
    </h1>
  );
}

/** Running text, one comfortable measure. */
export function Body({ children }: { children: ReactNode }) {
  return <p className="mb-3 max-w-[54ch] text-muted">{children}</p>;
}

/** A heading inside a longer row, like the parts of the brief. */
export function Subhead({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 mb-1.5 font-medium first:mt-0">{children}</h3>;
}

/** Label and value pairs, e.g. "Based in · Linköping". Stacks on phones. */
export function Facts({ items }: { items: readonly { label: string; value: ReactNode }[] }) {
  return (
    <dl className="mt-4 grid gap-x-5 gap-y-1 text-sm sm:grid-cols-[auto_minmax(0,1fr)] sm:items-baseline [&>div:not(:first-child)>dt]:pt-2 sm:[&>div>dt]:pt-0">
      {items.map((item) => (
        <div key={item.label} className="contents">
          <dt className="label">{item.label}</dt>
          <dd className="leading-[1.75]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Actions({ children }: { children: ReactNode }) {
  return <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">{children}</div>;
}

/** The one solid button on a page, with an arrow that nudges forward on hover. */
export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-[38px] items-center gap-2 rounded-[7px] bg-fg px-[15px] text-sm font-medium text-bg"
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-[3px]">
        →
      </span>
    </Link>
  );
}

/** A quiet text link with a hairline underneath. External addresses open as plain links. */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return href.startsWith("http") ? (
    <a href={href} className="link" rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href} prefetch className="link">
      {children}
    </Link>
  );
}
