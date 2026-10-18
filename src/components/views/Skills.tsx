import { Fragment } from "react";
import { pad2 } from "@/lib/format";
import { viewPath } from "@/lib/i18n";
import { Services } from "../Services";
import { Actions, Facts, Page, PrimaryLink, Row, Title, type ViewProps } from "./parts";

/** What I offer, how a project runs, and the tools behind it. Opened from About. */
export function Skills({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Row n={1} heading={false} label={dict.skills.kicker}>
        <Title>{dict.skills.title}</Title>
      </Row>

      <Row n={2} label={dict.services.heading}>
        <Services services={dict.services} />
      </Row>

      <Row n={3} label={dict.skills.processHeading}>
        <ol className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {dict.skills.process.map((item, i) => (
            <li key={item.step}>
              <p className="label">
                {pad2(i + 1)} · {item.step}
              </p>
              <p className="max-w-[40ch] text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </Row>

      <Row n={4} label={dict.skills.toolsHeading}>
        <Facts
          items={dict.skills.tools.map((tool) => ({
            label: tool.group,
            // Wrap between tools, never inside a name like "GitHub Actions".
            value: tool.list.split(" · ").map((name, i) => (
              <Fragment key={name}>
                {i > 0 && <span className="text-faint"> · </span>}
                <span className="whitespace-nowrap">{name}</span>
              </Fragment>
            )),
          }))}
        />
        <Actions>
          <PrimaryLink href={viewPath(locale, "contact")}>{dict.skills.cta}</PrimaryLink>
        </Actions>
      </Row>
    </Page>
  );
}
