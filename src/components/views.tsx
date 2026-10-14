import type { Metadata } from "next";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";
import { type Locale, type View, locales, viewPath } from "@/lib/i18n";
import { formatCapacity, formatUsage, getProgress, media } from "@/lib/progress";
import { Body, Kicker, Label, Title } from "./disk/Label";
import { Arrow, Note, Ring, Strike, Tally, Tick } from "./disk/Marker";
import { CdTeaser } from "./disk/CdTeaser";
import { MediumIcon } from "./disk/MediumIcon";
import { SectorMeter } from "./disk/SectorMeter";

type ViewProps = { locale: Locale; dict: Dictionary };

const link = "underline decoration-ink/30 underline-offset-[0.2em] hover:decoration-ink";

/** Home reads like a directory listing of the disk; each file opens a view. */
function Home({ locale, dict }: ViewProps) {
  const progress = getProgress();
  const files = [
    { view: "case", description: dict.case.title },
    { view: "now", description: dict.now.title },
    { view: "about", description: dict.about.title },
    { view: "contact", description: dict.contact.title },
    { view: "upgrade", description: dict.upgrade.full(Math.round((progress.filled / progress.total) * 100)) },
    { view: "roadmap", description: dict.roadmap.short },
  ] as const;
  // Desktop hover (and keyboard focus) swaps a row's text for a closer look.
  const rest = "group-hover:hidden group-focus-visible:hidden";
  const peek = "hidden group-hover:inline-flex group-focus-visible:inline-flex";

  return (
    <Label>
      <Note className="absolute top-[1.6cqw] right-[4cqw] -rotate-6">{dict.home.vol(progress.index + 1)}</Note>
      <Kicker>
        {dict.home.volume} {site.name} · {site.location}
      </Kicker>
      <Title>{dict.home.greeting}</Title>
      <Body>{dict.home.line}</Body>
      <ul className="mt-[var(--line)] font-mono text-[max(0.6875rem,2.2cqw)]">
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
      <p className="mt-[var(--line)] font-mono text-[max(0.625rem,1.9cqw)] tracking-[0.08em] text-pencil uppercase">
        {files.length} {dict.home.fileCount} · {dict.home.available} {site.availableFrom[locale]}
      </p>
      <p className="flex -rotate-2 items-center justify-end gap-[1.2cqw]">
        <Note>{dict.upgrade.shipped}</Note>
        <Tally
          done={progress.filled}
          total={progress.total}
          label={dict.upgrade.tallyLabel(progress.filled, progress.total)}
        />
      </p>
    </Label>
  );
}

function Case({ locale, dict }: ViewProps) {
  return (
    <Label>
      <Kicker>{dict.case.kicker}</Kicker>
      <Title>{dict.case.title}</Title>
      <Body>{dict.case.body}</Body>
      <dl className="flex flex-wrap gap-x-[4cqw]">
        {dict.case.figures.map((figure) => (
          <div key={figure.label} className="flex flex-row-reverse items-baseline justify-end gap-[1.5cqw]">
            <dt className="font-mono text-[max(0.625rem,1.9cqw)] tracking-[0.04em] text-pencil uppercase">
              {figure.label}
            </dt>
            <dd className="font-serif text-[max(0.9375rem,3.4cqw)] tabular-nums">{figure.value}</dd>
          </div>
        ))}
      </dl>
      <Kicker>
        {dict.case.figuresSource} ·{" "}
        <a href={site.latestCase.pagespeed} className={`${link} whitespace-nowrap`} rel="noopener">
          {dict.case.test} ↗
        </a>
      </Kicker>
      <p className="flex flex-wrap gap-x-[3cqw] font-mono text-[max(0.6875rem,2.2cqw)]">
        <a href={site.latestCase.url} className={link} rel="noopener">
          {dict.case.link} ↗
        </a>
        <Link href={viewPath(locale, "brief")} prefetch className={link}>
          {dict.case.brief} →
        </Link>
      </p>
    </Label>
  );
}

function Now({ locale, dict }: ViewProps) {
  return (
    <Label>
      <Kicker>
        {dict.now.correction ? (
          <>
            <Strike>{dict.now.status}</Strike>{" "}
            <Note ink="red" className="inline-block -rotate-3 tracking-normal normal-case">
              {dict.now.correction}
            </Note>
          </>
        ) : (
          dict.now.status
        )}{" "}
        · {dict.now.due} {site.availableFrom[locale]}
      </Kicker>
      <Title>{dict.now.title}</Title>
      <Body>{dict.now.body}</Body>
    </Label>
  );
}

function About({ locale, dict }: ViewProps) {
  return (
    <Label>
      <Kicker>{dict.about.kicker}</Kicker>
      <Title>{dict.about.title}</Title>
      <Body>{dict.about.body}</Body>
      <p className="mt-[var(--line)] font-mono text-[max(0.6875rem,2.2cqw)]">
        <Link href={viewPath(locale, "skills")} prefetch className={link}>
          {dict.about.skills}
        </Link>
      </p>
    </Label>
  );
}

/** What I offer, how a project runs, and the tools behind it. Opened from About. */
function Skills({ locale, dict }: ViewProps) {
  const mono = "font-mono text-[max(0.6875rem,2.2cqw)]";

  return (
    <Label>
      <Kicker>{dict.skills.kicker}</Kicker>
      <Title>{dict.skills.title}</Title>

      <section className="mt-[var(--line)]">
        <Kicker>{dict.skills.helpHeading}</Kicker>
        <ul className={mono}>
          {dict.skills.help.map((item) => (
            <li key={item} className="flex gap-[1.5cqw]">
              <span aria-hidden className="text-pencil">
                ▪
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-[var(--line)]">
        <Kicker>{dict.skills.processHeading}</Kicker>
        <ol className={mono}>
          {dict.skills.process.map((item, i) => (
            <li key={item.step} className="flex gap-[1.5cqw]">
              <span className="text-pencil">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="tracking-[0.06em] uppercase">{item.step}</span> · {item.text}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-[var(--line)]">
        <Kicker>{dict.skills.toolsHeading}</Kicker>
        <dl className={mono}>
          {dict.skills.tools.map((tool) => (
            <div key={tool.group} className="flex flex-wrap gap-x-[1.5cqw]">
              <dt className="text-pencil">{tool.group}</dt>
              <dd>{tool.list}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className={`mt-[var(--line)] ${mono}`}>
        <Link
          href={viewPath(locale, "contact")}
          prefetch
          className="bg-ink px-[1.5cqw] py-[0.3cqw] tracking-[0.08em] text-label uppercase hover:bg-ink-soft"
        >
          {dict.skills.cta}
        </Link>
      </p>
    </Label>
  );
}

function Contact({ dict }: ViewProps) {
  return (
    <Label>
      <Kicker>{dict.contact.kicker}</Kicker>
      <Title>{dict.contact.title}</Title>
      <Body>{dict.contact.body}</Body>
      <p className="font-serif text-[max(0.9375rem,3.4cqw)]">
        <Ring>
          <a href={`mailto:${site.email}`} className={link}>
            {site.email}
          </a>
        </Ring>
        <Note ink="red" className="ml-[3cqw] inline-flex -rotate-3 items-center gap-[0.6cqw] align-middle">
          <Arrow direction="left" />
          {dict.contact.sayHi}
        </Note>
      </p>
      <ul className="flex flex-wrap gap-x-[3cqw] font-mono text-[max(0.6875rem,2.2cqw)]">
        {site.profiles.map((profile) => (
          <li key={profile.href}>
            <a href={profile.href} className={link} rel="me noopener">
              {profile.label}
            </a>
          </li>
        ))}
      </ul>
    </Label>
  );
}

/** The upgrade path: how full the disk is, and what fills it. */
function Upgrade({ locale, dict }: ViewProps) {
  const progress = getProgress();
  const projects = site.projects.map((project, i) => ({ ...project, number: i + 1 }));
  const nextNumber = projects.length + 1;
  const number = (n: number) => String(n).padStart(2, "0");

  return (
    <Label>
      <Kicker>{dict.home.files.upgrade}</Kicker>
      <Title>{dict.upgrade.title}</Title>
      <Body>{dict.upgrade.body}</Body>
      <p className="mt-[var(--line)] flex justify-between font-mono text-[max(0.625rem,1.9cqw)] tracking-[0.06em] text-pencil uppercase">
        <span>{dict.upgrade.usage}</span>
        <span>
          {formatUsage(locale, progress.used, progress.current)} {dict.upgrade.used}
        </span>
      </p>
      <div className="flex h-[var(--line)] items-center">
        <SectorMeter sectors={progress.sectors} size="lg" />
      </div>
      {progress.next && (
        <p className="font-mono text-[max(0.625rem,1.9cqw)] tracking-[0.06em] text-pencil uppercase">
          {dict.upgrade.summary(
            progress.shipped,
            progress.writing,
            dict.upgrade.media[progress.next.id],
            progress.next.unlocksAt,
          )}
        </p>
      )}
      <ol className="mt-[var(--line)] font-mono text-[max(0.6875rem,2.2cqw)]">
        {projects.map((project) => (
          <li key={project.name} className="flex gap-[2cqw]">
            <span className="text-pencil">{number(project.number)}</span>
            <span className="flex min-w-0 items-center gap-[1cqw]">
              <span className="truncate">{project.name}</span>
              {project.status === "shipped" && <Tick className="shrink-0" />}
            </span>
            <span className="ml-auto shrink-0 text-[max(0.625rem,1.9cqw)] tracking-[0.06em] text-pencil uppercase">
              {dict.upgrade.status[project.status]}
            </span>
          </li>
        ))}
        <li className="flex gap-[2cqw] text-pencil">
          <span>{number(nextNumber)}</span>
          <span className="truncate">{dict.upgrade.yours}</span>
          <Note
            ink="red"
            className="hidden -rotate-2 items-center gap-[0.6cqw] text-[max(0.8125rem,2.4cqw)] sm:inline-flex"
          >
            <Arrow direction="left" />
            {dict.upgrade.yoursNote}
          </Note>
          <span className="ml-auto shrink-0 text-[max(0.625rem,1.9cqw)] tracking-[0.06em] uppercase">
            {dict.upgrade.status.free}
          </span>
        </li>
      </ol>
      <p className="mt-[var(--line)] font-mono text-[max(0.6875rem,2.2cqw)]">
        <Link
          href={viewPath(locale, "contact")}
          prefetch
          className="bg-ink px-[1.5cqw] py-[0.3cqw] tracking-[0.08em] text-label uppercase hover:bg-ink-soft"
        >
          {dict.upgrade.cta(nextNumber)}
        </Link>
      </p>
      {progress.next && (
        <Kicker>{dict.upgrade.unlock(progress.next.unlocksAt, dict.upgrade.media[progress.next.id])}</Kicker>
      )}
      {progress.next?.id === "cdrom" && <CdTeaser dict={dict} />}
      <p className="mt-[var(--line)] font-mono text-[max(0.6875rem,2.2cqw)]">
        <Link href={viewPath(locale, "roadmap")} prefetch className={link}>
          {dict.upgrade.seeRoadmap}
        </Link>
      </p>
    </Label>
  );
}

/** The whole upgrade path at a glance: every medium, and how far along the disk is. */
function Roadmap({ locale, dict }: ViewProps) {
  const progress = getProgress();
  const nextNumber = site.projects.length + 1;
  const frac = progress.filled / progress.total;
  // Columns are centred at 10%, 30% … 90%; the rail fills from the first one.
  const fill = ((progress.index + (progress.next ? frac : 0)) / (media.length - 1)) * 80;
  const columns = "grid grid-cols-5 gap-[1.5cqw] text-center";

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

      <p className="mt-[var(--line)] font-mono text-[max(0.6875rem,2.2cqw)]">
        {progress.next
          ? dict.roadmap.status(progress.shipped, progress.toGo, dict.upgrade.media[progress.next.id])
          : dict.roadmap.done(progress.shipped)}
      </p>
      <p className="font-mono text-[max(0.6875rem,2.2cqw)]">
        <Link
          href={viewPath(locale, "contact")}
          prefetch
          className="bg-ink px-[1.5cqw] py-[0.3cqw] tracking-[0.08em] text-label uppercase hover:bg-ink-soft"
        >
          {dict.upgrade.cta(nextNumber)}
        </Link>
      </p>
    </Label>
  );
}

/** The full story behind the latest case, opened from the Case view. */
function Brief({ locale, dict }: ViewProps) {
  return (
    <Label>
      <Kicker>{dict.brief.kicker}</Kicker>
      <Title>{dict.brief.title}</Title>
      {dict.brief.sections.map((section) => (
        <section key={section.heading} className="mt-[var(--line)]">
          <Kicker>{section.heading}</Kicker>
          <Body>{section.body}</Body>
        </section>
      ))}
      <section className="mt-[var(--line)]">
        <Kicker>{dict.brief.results}</Kicker>
        <dl className="flex flex-wrap gap-x-[4cqw]">
          {dict.case.figures.map((figure) => (
            <div key={figure.label} className="flex flex-row-reverse items-baseline justify-end gap-[1.5cqw]">
              <dt className="font-mono text-[max(0.625rem,1.9cqw)] tracking-[0.04em] text-pencil uppercase">
                {figure.label}
              </dt>
              <dd className="font-serif text-[max(0.9375rem,3.4cqw)] tabular-nums">{figure.value}</dd>
            </div>
          ))}
        </dl>
        <Kicker>
          {dict.case.figuresSource} ·{" "}
          <a href={site.latestCase.pagespeed} className={`${link} whitespace-nowrap`} rel="noopener">
            {dict.case.test} ↗
          </a>
        </Kicker>
        <Body>{dict.brief.rankings}</Body>
      </section>
      <section className="mt-[var(--line)]">
        <Kicker>{dict.brief.stack}</Kicker>
        <p className="font-mono text-[max(0.6875rem,2.2cqw)]">{dict.brief.tools}</p>
      </section>
      <p className="mt-[var(--line)] flex flex-wrap gap-x-[3cqw] font-mono text-[max(0.6875rem,2.2cqw)]">
        <Link href={viewPath(locale, "case")} prefetch className={link}>
          {dict.brief.back}
        </Link>
        <a href={site.latestCase.url} className={link} rel="noopener">
          {dict.case.link} ↗
        </a>
      </p>
    </Label>
  );
}

export const viewComponents: Record<View, (props: ViewProps) => React.JSX.Element> = {
  home: Home,
  case: Case,
  now: Now,
  about: About,
  contact: Contact,
  upgrade: Upgrade,
  roadmap: Roadmap,
  brief: Brief,
  skills: Skills,
};

/** Title, description and hreflang alternates for one view in one locale. */
export function viewMetadata(locale: Locale, view: View, dict: Dictionary): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, viewPath(l, view)]));

  return {
    ...(view === "home" ? {} : { title: dict.nav[view] }),
    alternates: {
      canonical: viewPath(locale, view),
      languages: { ...languages, "x-default": viewPath("en", view) },
    },
  };
}
