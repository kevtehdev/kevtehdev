import { Fragment } from "react";
import { pad2 } from "@/lib/format";
import { viewPath } from "@/lib/i18n";
import { Kicker, Label, Title } from "../disk/Label";
import { CtaLink, type ViewProps } from "./parts";

/** What I offer, how a project runs, and the tools behind it. Opened from About. */
export function Skills({ locale, dict }: ViewProps) {
  return (
    <Label>
      <Kicker>{dict.skills.kicker}</Kicker>
      <Title>{dict.skills.title}</Title>

      <section className="mt-[var(--line)]">
        <Kicker>{dict.skills.helpHeading}</Kicker>
        <ul className="type-body">
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
        <ol className="type-body">
          {dict.skills.process.map((item, i) => (
            <li key={item.step} className="flex gap-[1.5cqw]">
              <span className="text-pencil">{pad2(i + 1)}</span>
              <span>
                <span className="tracking-[0.06em] uppercase">{item.step}</span> · {item.text}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-[var(--line)]">
        <Kicker>{dict.skills.toolsHeading}</Kicker>
        <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-[3cqw] type-body">
          {dict.skills.tools.map((tool) => (
            <div key={tool.group} className="contents">
              <dt className="type-small tracking-[0.08em] text-pencil uppercase">{tool.group}</dt>
              <dd>
                {/* Wrap between tools, never inside a name like "GitHub Actions". */}
                {tool.list.split(" · ").map((name, i) => (
                  <Fragment key={name}>
                    {i > 0 && " · "}
                    <span className="whitespace-nowrap">{name}</span>
                  </Fragment>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-[var(--line)] type-body">
        <CtaLink href={viewPath(locale, "contact")}>{dict.skills.cta}</CtaLink>
      </p>
    </Label>
  );
}
