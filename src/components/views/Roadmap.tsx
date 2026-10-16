import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { formatCapacity, media, progress } from "@/lib/progress";
import { Kicker, Label, Title } from "../disk/Label";
import { MediumIcon } from "../disk/MediumIcon";
import { CtaLink, type ViewProps } from "./parts";

const columns = "grid grid-cols-5 gap-[1.5cqw] text-center";

/** The whole upgrade path at a glance: every medium, and how far along the disk is. */
export function Roadmap({ locale, dict }: ViewProps) {
  const nextNumber = site.projects.length + 1;
  const frac = progress.filled / progress.total;
  // Columns are centred at 10%, 30% … 90%; the rail fills from the first one.
  const fill = ((progress.index + (progress.next ? frac : 0)) / (media.length - 1)) * 80;

  return (
    <Label>
      <Kicker>{dict.home.files.roadmap}</Kicker>
      <Title>{dict.roadmap.title}</Title>

      <div aria-hidden className={`mt-[var(--line)] h-[calc(var(--line)*2)] items-end ${columns}`}>
        {media.map((medium, i) => (
          <span key={medium.id} className="mx-auto grid size-[calc(var(--line)*1.8)] place-items-center">
            <MediumIcon medium={medium.id} locked={i > progress.index} />
          </span>
        ))}
      </div>

      <div aria-hidden className="relative h-[var(--line)]">
        <span className="absolute inset-x-[10%] top-1/2 h-[3px] -translate-y-1/2 bg-rule" />
        <span className="absolute top-1/2 left-[10%] h-[3px] -translate-y-1/2 bg-ink" style={{ width: `${fill}%` }} />
        {media.map((medium, i) => (
          <span
            key={medium.id}
            className={[
              "absolute top-1/2 size-[calc(var(--line)*0.5)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
              i <= progress.index ? "border-ink bg-ink" : "border-pencil/60 bg-label",
            ].join(" ")}
            style={{ left: `${10 + i * 20}%` }}
          />
        ))}
      </div>

      <ol className={columns}>
        {media.map((medium, i) => {
          const locked = i > progress.index;
          const status =
            i < progress.index
              ? dict.upgrade.filled
              : i === progress.index
                ? dict.roadmap.here(Math.round(frac * 100))
                : dict.roadmap.at(medium.unlocksAt);

          return (
            <li
              key={medium.id}
              className={["flex min-w-0 flex-col items-center", locked ? "text-pencil" : ""].join(" ")}
            >
              <span className="font-serif text-[max(0.8125rem,2.6cqw)] first-letter:uppercase">
                {dict.upgrade.media[medium.id]}
              </span>
              <span className="font-mono text-[max(0.625rem,1.8cqw)] text-pencil">
                {formatCapacity(locale, medium)}
              </span>
              <span
                className={[
                  "mt-[0.5cqw] px-[0.8cqw] font-mono text-[max(0.5625rem,1.5cqw)] leading-[1.35] tracking-[0.06em] uppercase",
                  i === progress.index
                    ? "bg-ink text-label"
                    : i < progress.index
                      ? "border border-ink"
                      : "border border-dashed border-pencil/60",
                ].join(" ")}
              >
                {status}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="mt-[var(--line)] type-body">
        {progress.next
          ? dict.roadmap.status(progress.shipped, progress.toGo, dict.upgrade.media[progress.next.id])
          : dict.roadmap.done(progress.shipped)}
      </p>
      <p className="type-body">
        <CtaLink href={viewPath(locale, "contact")}>{dict.upgrade.cta(nextNumber)}</CtaLink>
      </p>
    </Label>
  );
}
