import type { ReactNode } from "react";

/*
 * Typography for the paper label. Every size snaps to the ruled line
 * (--line), the way handwriting sits on a real disk label.
 */

export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 animate-insert overflow-y-auto overscroll-contain ruled px-[max(1rem,5cqw)] py-[max(0.5rem,2.8cqw)]">
      {children}
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[max(0.625rem,1.9cqw)] tracking-[0.08em] text-pencil uppercase">{children}</p>;
}

export function Title({ children, as: Tag = "h1" }: { children: ReactNode; as?: "h1" | "p" }) {
  return <Tag className="font-serif text-[max(0.9375rem,3.4cqw)] font-normal">{children}</Tag>;
}

export function Body({ children }: { children: ReactNode }) {
  return <p className="max-w-[60ch] font-mono text-[max(0.6875rem,2.2cqw)] text-pretty">{children}</p>;
}
