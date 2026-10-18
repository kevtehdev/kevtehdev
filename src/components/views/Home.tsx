import { Fragment } from "react";
import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { GiantWordmark } from "../GiantWordmark";
import { LocalTime } from "../LocalTime";
import { Actions, Lead, Page, PrimaryLink, SectionLabel, Title, type ViewProps } from "./parts";

/**
 * A small statement and a status table, the domain set across the page, then
 * a log of what I've shipped next to what I build.
 */
export function Home({ locale, dict }: ViewProps) {
  const lighthouse = dict.case.figures.map((figure) => Number.parseInt(figure.value, 10)).join(" · ");
  const status = [
    {
      label: dict.home.status.label,
      value: site.availableFrom ? `${dict.home.available} ${site.availableFrom[locale]}` : dict.home.availableNow,
    },
    { label: dict.home.status.localTime, value: <LocalTime locale={locale} label={dict.home.localTime} /> },
    { label: dict.home.status.latest, value: dict.case.title },
    { label: dict.home.status.lighthouse, value: lighthouse },
  ];

  return (
    <Page>
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-12">
        <div className="flex flex-col gap-5 md:col-span-6 lg:col-span-5">
          <Title size="home">{dict.home.title}</Title>
          <Lead>{dict.home.lead}</Lead>
          <Actions>
            <PrimaryLink href={viewPath(locale, "contact")}>{dict.home.cta}</PrimaryLink>
          </Actions>
        </div>
        <dl className="grid grid-cols-[auto_minmax(0,1fr)] content-start font-mono text-xs md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
          {status.map((row) => (
            <Fragment key={row.label}>
              <dt className="border-b border-rule py-1.5 text-muted">{row.label}</dt>
              <dd className="border-b border-rule py-1.5 text-right font-medium tabular-nums">{row.value}</dd>
            </Fragment>
          ))}
        </dl>
      </div>

      <div className="pt-8">
        <GiantWordmark text={site.domain} />
      </div>

      <div className="grid gap-x-14 gap-y-14 pt-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <section className="flex flex-col gap-5">
          <SectionLabel aside={dict.home.logOrder}>{dict.home.logLabel}</SectionLabel>
          <ol className="relative flex flex-col before:absolute before:top-3 before:bottom-3 before:left-[4px] before:w-px before:bg-rule">
            {dict.home.log.map((entry, i) => (
              <li key={entry.text} className="relative grid grid-cols-[5rem_minmax(0,1fr)] gap-3 py-2 pl-6 text-sm">
                <span
                  aria-hidden
                  className={[
                    "absolute top-[0.9rem] left-0 size-[9px] rounded-full border",
                    i === 0 ? "border-fg bg-fg" : "border-muted bg-bg",
                  ].join(" ")}
                />
                <span className="font-mono text-xs leading-5 text-muted">{entry.date || dict.home.now}</span>
                {entry.href ? (
                  <a href={entry.href} className="link" rel="noopener">
                    {entry.text} ↗
                  </a>
                ) : (
                  <span>{entry.text}</span>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-5">
          <SectionLabel count={dict.services.items.length}>{dict.services.heading}</SectionLabel>
          <ul className="flex flex-col">
            {dict.services.items.map((item) => (
              <li key={item.title} className="flex flex-col gap-0.5 border-b border-rule py-3">
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
                <p className="text-sm text-pretty text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Page>
  );
}
