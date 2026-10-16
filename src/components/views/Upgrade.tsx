import Link from "next/link";
import { site } from "@/content/site";
import { pad2 } from "@/lib/format";
import { viewPath } from "@/lib/i18n";
import { formatUsage, progress } from "@/lib/progress";
import { CdTeaser } from "../disk/CdTeaser";
import { Body, Kicker, Label, Title } from "../disk/Label";
import { SectorMeter } from "../disk/SectorMeter";
import { CtaLink, type ViewProps, link } from "./parts";

const meta = "type-small tracking-[0.06em] uppercase";

/** The upgrade path: how full the disk is, and what fills it. */
export function Upgrade({ locale, dict }: ViewProps) {
  const nextNumber = site.projects.length + 1;

  return (
    <Label>
      <Kicker>{dict.home.files.upgrade}</Kicker>
      <Title>{dict.upgrade.title}</Title>
      <Body>{dict.upgrade.body}</Body>
      <p className={`mt-[var(--line)] flex justify-between text-pencil ${meta}`}>
        <span>{dict.upgrade.usage}</span>
        <span>
          {formatUsage(locale, progress.used, progress.current)} {dict.upgrade.used}
        </span>
      </p>
      <div className="flex h-[var(--line)] items-center">
        <SectorMeter sectors={progress.sectors} size="lg" />
      </div>
      {progress.next && (
        <p className={`text-pencil ${meta}`}>
          {dict.upgrade.summary(
            progress.shipped,
            progress.writing,
            dict.upgrade.media[progress.next.id],
            progress.next.unlocksAt,
          )}
        </p>
      )}
      <ol className="mt-[var(--line)] type-body">
        {site.projects.map((project, i) => (
          <li key={project.name} className="flex gap-[2cqw]">
            <span className="text-pencil">{pad2(i + 1)}</span>
            <span className="truncate">{project.name}</span>
            <span className={`ml-auto shrink-0 text-pencil ${meta}`}>{dict.upgrade.status[project.status]}</span>
          </li>
        ))}
        <li>
          <Link
            href={viewPath(locale, "contact")}
            prefetch
            className="group flex gap-[2cqw] text-pencil hover:text-ink"
          >
            <span>{pad2(nextNumber)}</span>
            <span className="truncate underline decoration-pencil/30 underline-offset-[0.2em] group-hover:decoration-ink">
              {dict.upgrade.yours}
            </span>
            <span className={`ml-auto shrink-0 ${meta}`}>{dict.upgrade.status.free} →</span>
          </Link>
        </li>
      </ol>
      <p className="mt-[var(--line)] type-body">
        <CtaLink href={viewPath(locale, "contact")}>{dict.upgrade.cta(nextNumber)}</CtaLink>
      </p>
      {progress.next && (
        <Kicker>{dict.upgrade.unlock(progress.next.unlocksAt, dict.upgrade.media[progress.next.id])}</Kicker>
      )}
      {progress.next?.id === "cdrom" && <CdTeaser dict={dict} />}
      <p className="mt-[var(--line)] type-body">
        <Link href={viewPath(locale, "roadmap")} prefetch className={link}>
          {dict.upgrade.seeRoadmap}
        </Link>
      </p>
    </Label>
  );
}
