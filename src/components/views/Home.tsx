import Link from "next/link";
import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { media, progress } from "@/lib/progress";
import { Body, Kicker, Label, Title } from "../disk/Label";
import { MediumIcon } from "../disk/MediumIcon";
import { SectorMeter } from "../disk/SectorMeter";
import type { ViewProps } from "./parts";

// Desktop hover (and keyboard focus) swaps a row's text for a closer look.
const rest = "group-hover:hidden group-focus-visible:hidden";
const peek = "hidden group-hover:inline-flex group-focus-visible:inline-flex";

/** Home reads like a directory listing of the disk; each file opens a view. */
export function Home({ locale, dict }: ViewProps) {
  const files = [
    { view: "case", description: dict.case.title },
    { view: "now", description: dict.now.title },
    { view: "about", description: dict.about.title },
    { view: "contact", description: dict.contact.title },
    { view: "upgrade", description: dict.upgrade.full(Math.round((progress.filled / progress.total) * 100)) },
    { view: "roadmap", description: dict.roadmap.short },
  ] as const;

  return (
    <Label>
      <Kicker>
        {dict.home.vol(progress.index + 1)} · {site.name} · {site.location}
      </Kicker>
      <Title>{dict.home.greeting}</Title>
      <Body>{dict.home.line}</Body>
      <ul className="mt-[var(--line)] type-body">
        {files.map(({ view, description }) => (
          <li key={view}>
            <Link href={viewPath(locale, view)} prefetch className="group flex items-baseline gap-[2cqw]">
              <span className="w-[14ch] shrink-0">{dict.home.files[view]}</span>
              <span className="truncate underline decoration-ink/30 underline-offset-[0.2em] group-hover:decoration-ink">
                {view === "upgrade" && progress.next ? (
                  <>
                    <span className={rest}>{description}</span>
                    <span className={peek}>{dict.upgrade.toGo(progress.toGo)}</span>
                  </>
                ) : view === "roadmap" ? (
                  <>
                    <span className={rest}>{description}</span>
                    <MediaPeek />
                  </>
                ) : (
                  description
                )}
              </span>
              {view === "upgrade" && <SectorMeter sectors={progress.sectors} live />}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-[var(--line)] type-small tracking-[0.08em] text-pencil uppercase">
        {files.length} {dict.home.fileCount} ·{" "}
        {site.availableFrom ? `${dict.home.available} ${site.availableFrom[locale]}` : dict.home.availableNow}
      </p>
    </Label>
  );
}

/** The roadmap row's hover state: every medium in a row, slotting in one by one. */
function MediaPeek() {
  return (
    <span aria-hidden className={`${peek} items-center gap-[0.8cqw] align-middle`}>
      {media.map((medium, i) => (
        <span
          key={medium.id}
          className="flex animate-insert items-center gap-[0.8cqw] [animation-fill-mode:backwards]"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          {i > 0 && <span className="text-pencil">→</span>}
          <span className="grid size-[calc(var(--line)*0.7)] place-items-center">
            <MediumIcon medium={medium.id} locked={i > progress.index} />
          </span>
        </span>
      ))}
    </span>
  );
}
