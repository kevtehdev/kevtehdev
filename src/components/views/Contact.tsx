import { site } from "@/content/site";
import { CopyEmail } from "../disk/CopyEmail";
import { Body, Kicker, Label, Title } from "../disk/Label";
import { type ViewProps, link } from "./parts";

export function Contact({ dict }: ViewProps) {
  return (
    <Label>
      <Kicker>{dict.contact.kicker}</Kicker>
      <Title>{dict.contact.title}</Title>
      <Body>{dict.contact.body}</Body>
      <p className="mt-[var(--line)] flex flex-wrap items-center gap-x-[3cqw] type-title">
        <a href={`mailto:${site.email}`} className={link}>
          {site.email}
        </a>
        <CopyEmail email={site.email} label={dict.contact.copy} done={dict.contact.copied} />
      </p>
      <ul className="flex flex-wrap gap-x-[3cqw] type-body">
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
