import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";
import { pad2 } from "@/lib/format";
import { views } from "@/lib/i18n";

/**
 * A sneak peek of the CD-ROM edition, drawn small on the floppy's label: the
 * disc in its tray next to the booklet's track list. The disc spins while
 * hovered.
 */
export function CdTeaser({ dict }: { dict: Dictionary }) {
  return (
    <figure className="group mt-[var(--line)]">
      <figcaption className="type-small tracking-[0.08em] text-pencil uppercase">{dict.upgrade.peek}</figcaption>
      <div
        aria-hidden
        className="grid grid-cols-[calc(var(--line)*6)_1fr] rounded-[3px] bg-case p-[0.8cqw] shadow-[inset_0_0_0_1px_var(--color-case-edge)]"
      >
        <div className="relative aspect-square">
          <div className="absolute inset-[6%] rounded-full border border-metal-edge disc-sheen motion-safe:group-hover:animate-[spin_3s_linear_infinite]">
            <p className="absolute inset-x-0 top-[17%] text-center font-wordmark text-[max(0.625rem,1.9cqw)] leading-none tracking-[0.14em]">
              {site.wordmark}
            </p>
            <div className="absolute inset-[36%] rounded-full border border-metal-edge bg-metal/85" />
            <div className="absolute inset-[45.5%] rounded-full border border-metal-edge bg-case" />
          </div>
        </div>
        <div className="bg-label px-[2cqw] py-[1cqw]">
          <p className="font-mono text-[max(0.5625rem,1.5cqw)] leading-[calc(var(--line)*0.75)] tracking-[0.1em] text-pencil uppercase">
            {dict.upgrade.tracks}
          </p>
          <ol className="font-mono text-[max(0.625rem,1.7cqw)] leading-[calc(var(--line)*0.75)]">
            {views.map((view, i) => (
              <li
                key={view}
                className={["flex gap-[1.5cqw] px-[0.8cqw]", i === 0 ? "bg-ink text-label" : ""].join(" ")}
              >
                <span className={i === 0 ? "text-disk-text" : "text-pencil"}>{pad2(i + 1)}</span>
                <span className="truncate">{dict.nav[view]}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </figure>
  );
}
