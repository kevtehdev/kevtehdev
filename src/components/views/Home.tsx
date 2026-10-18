import { viewPath } from "@/lib/i18n";
import { Actions, Lead, Page, PrimaryLink, SectionLabel, Title, type ViewProps } from "./parts";

/** A short statement, then a log of what I've shipped next to what I build. */
export function Home({ locale, dict }: ViewProps) {
  return (
    <Page>
      <div className="flex flex-col gap-6">
        <Title size="home">{dict.home.title}</Title>
        <Lead>{dict.home.lead}</Lead>
        <Actions>
          <PrimaryLink href={viewPath(locale, "contact")}>{dict.home.cta}</PrimaryLink>
        </Actions>
      </div>

      <div className="grid gap-x-14 gap-y-14 pt-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
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
                {/* An entry without a date is the one in progress right now. */}
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
