import { site } from "@/content/site";
import { CopyEmail } from "../CopyEmail";
import { Body, Page, Row, Title, type ViewProps } from "./parts";

export function Contact({ dict }: ViewProps) {
  return (
    <Page>
      <Row n={1} heading={false} label={dict.contact.kicker}>
        <Title>{dict.contact.title}</Title>
        <Body>{dict.contact.body}</Body>
        <p className="mt-6 flex flex-wrap items-center gap-x-5">
          <a
            href={`mailto:${site.email}`}
            className="link text-[clamp(1.25rem,3vw,1.5rem)] font-medium tracking-[-0.01em]"
          >
            {site.email}
          </a>
          <CopyEmail email={site.email} label={dict.contact.copy} done={dict.contact.copied} />
        </p>
        <p className="mt-2 flex flex-wrap gap-x-4 text-sm">
          {site.profiles.map((profile) => (
            <a key={profile.href} href={profile.href} className="link" rel="me noopener">
              {profile.label} ↗
            </a>
          ))}
        </p>
      </Row>
    </Page>
  );
}
