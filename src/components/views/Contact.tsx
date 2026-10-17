import { site } from "@/content/site";
import { CopyEmail } from "../CopyEmail";
import { Body, Eyebrow, Page, Title, type ViewProps } from "./parts";

export function Contact({ dict }: ViewProps) {
  return (
    <Page>
      <Eyebrow>{dict.contact.kicker}</Eyebrow>
      <Title>{dict.contact.title}</Title>
      <Body>{dict.contact.body}</Body>
      <div className="flex flex-col gap-3 border-t border-rule pt-6">
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a href={`mailto:${site.email}`} className="font-display text-[clamp(1.5rem,3.6vw,2.25rem)] font-medium link">
            {site.email}
          </a>
          <CopyEmail email={site.email} label={dict.contact.copy} done={dict.contact.copied} />
        </p>
        <ul className="flex flex-wrap gap-x-5">
          {site.profiles.map((profile) => (
            <li key={profile.href}>
              <a href={profile.href} className="text-muted link hover:text-fg" rel="me noopener">
                {profile.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}
