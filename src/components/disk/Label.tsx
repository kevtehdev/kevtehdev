import type { ReactNode } from "react";

/*
 * Typography for the paper label. Every size snaps to the ruled line
 * (--line), the way handwriting sits on a real disk label.
 */

export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 animate-insert [scrollbar-width:thin] [scrollbar-color:var(--color-rule)_transparent] overflow-y-auto overscroll-contain ruled px-[max(1rem,5cqw)] py-[max(0.5rem,2.8cqw)]">
      {children}
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="type-small tracking-[0.08em] text-pencil uppercase">{children}</p>;
}

export function Title({ children, as: Tag = "h1" }: { children: ReactNode; as?: "h1" | "p" }) {
  // One blank ruled line between the title and whatever follows it.
  return <Tag className="mb-[var(--line)] type-title font-normal">{children}</Tag>;
}

export function Body({ children }: { children: ReactNode }) {
  return <p className="max-w-[60ch] type-body text-pretty">{children}</p>;
}
