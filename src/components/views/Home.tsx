import { site } from "@/content/site";
import { BriefContent } from "../BriefContent";
import { BriefToggle } from "../BriefToggle";
import { CopyEmail } from "../CopyEmail";
import { performanceLine } from "../Scores";
import { Services } from "../Services";
import { Actions, Body, Facts, Page, PrimaryLink, Row, TextLink, Title, type ViewProps } from "./parts";

/**
 * The whole site on one page, as rows: who I am, what I've shipped, the work
 * (with its brief opening in place), what I do, about, and how to reach me.
 */
export function Home({ dict }: ViewProps) {
  return (
    <Page>
      <Row
        n={1}
        heading={false}
        label={
          <>
            {site.name}
            <span className="block text-muted max-sm:inline max-sm:before:content-['_·_']">{dict.home.label}</span>
          </>
        }
      >
        <Title>{dict.home.title}</Title>
        {dict.home.lead.map((paragraph) => (
          <Body key={paragraph}>{paragraph}</Body>
        ))}
        <Actions>
          <PrimaryLink href="#contact">{dict.home.cta}</PrimaryLink>
          <CopyEmail email={site.email} done={dict.contact.copied} />
        </Actions>
      </Row>

      <Row n={2} label={dict.home.logLabel}>
        <ol>
          {dict.home.log.map((entry) => (
            <li key={entry.text} className="grid grid-cols-[5.25rem_minmax(0,1fr)] items-baseline gap-3.5 py-1.5">
              {entry.date ? (
                <span className="font-mono text-xs text-faint">{entry.date}</span>
              ) : (
                // An entry without a date is the one in progress right now.
                <span className="inline-flex items-center gap-[7px] font-mono text-xs before:size-[5px] before:rounded-full before:bg-fg">
                  {dict.home.now}
                </span>
              )}
              <span>{entry.href ? <TextLink href={entry.href}>{entry.text}</TextLink> : entry.text}</span>
            </li>
          ))}
        </ol>
      </Row>

      <Row n={3} label={dict.home.workLabel}>
        <article>
          <h3 className="text-[1.0625rem] font-medium">{dict.case.title}</h3>
          <p className="mt-0.5 mb-3 text-muted">{dict.home.work.what}</p>
          <p className="flex flex-wrap gap-x-[18px] gap-y-1 font-mono text-xs text-faint">
            <span>{dict.home.work.year}</span>
            <span>{dict.home.work.stack}</span>
            <span>
              Lighthouse <span className="text-fg">{performanceLine(dict)}</span>
            </span>
          </p>
          <BriefToggle
            read={dict.home.work.readBrief}
            hide={dict.home.work.hideBrief}
            close={dict.home.work.closeBrief}
            aside={<TextLink href={site.latestCase.url}>{dict.case.link} ↗</TextLink>}
          >
            <BriefContent dict={dict} />
          </BriefToggle>
        </article>
      </Row>

      <Row n={4} label={dict.home.servicesLabel}>
        <Services services={dict.services} />
      </Row>

      <Row n={5} label={dict.home.aboutLabel}>
        <Body>{dict.about.body[2]}</Body>
        <Facts items={dict.about.facts} />
      </Row>

      <Row n={6} id="contact" label={dict.home.contactLabel}>
        <p className="mb-1.5">{dict.contact.body}</p>
        <p className="flex flex-wrap gap-x-3">
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          {site.profiles.map((profile) => (
            <a key={profile.href} href={profile.href} className="link" rel="me noopener">
              {profile.label}
            </a>
          ))}
        </p>
      </Row>
    </Page>
  );
}
