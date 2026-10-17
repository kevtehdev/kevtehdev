import { Fragment } from "react";
import { pad2 } from "@/lib/format";
import { viewPath } from "@/lib/i18n";
import { Actions, Eyebrow, Page, PrimaryLink, Section, Title, type ViewProps } from "./parts";

/** What I offer, how a project runs, and the tools behind it. Opened from About. */
export function Skills({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Eyebrow>{dict.skills.kicker}</Eyebrow>
      <Title>{dict.skills.title}</Title>

      <Section heading={dict.skills.helpHeading}>
        <ul className="flex max-w-[62ch] flex-col gap-1.5 text-[1.0625rem] leading-relaxed">
          {dict.skills.help.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="text-pass">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading={dict.skills.processHeading}>
        <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {dict.skills.process.map((item, i) => (
            <li key={item.step} className="flex flex-col gap-1">
              <span className="eyebrow">
                {pad2(i + 1)} · {item.step}
              </span>
              <span className="max-w-[40ch] leading-relaxed">{item.text}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section heading={dict.skills.toolsHeading}>
        <dl className="grid grid-cols-[minmax(0,auto)_minmax(0,1fr)] items-baseline gap-x-6 gap-y-2">
          {dict.skills.tools.map((tool) => (
            <div key={tool.group} className="contents">
              <dt className="eyebrow">{tool.group}</dt>
              <dd>
                {/* Wrap between tools, never inside a name like "GitHub Actions". */}
                {tool.list.split(" · ").map((name, i) => (
                  <Fragment key={name}>
                    {i > 0 && <span className="text-muted"> · </span>}
                    <span className="whitespace-nowrap">{name}</span>
                  </Fragment>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Actions>
        <PrimaryLink href={viewPath(locale, "contact")}>{dict.skills.cta}</PrimaryLink>
      </Actions>
    </Page>
  );
}
