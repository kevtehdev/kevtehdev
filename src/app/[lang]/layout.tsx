import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { CdCase } from "@/components/cd/CdCase";
import { Disk } from "@/components/disk/Disk";
import { PromptButton } from "@/components/disk/Prompt";
import { UsageLink } from "@/components/disk/UsageLink";
import { UpgradeNotice } from "@/components/UpgradeNotice";
import { site } from "@/content/site";
import { getDictionary, hasLocale, locales, viewPath } from "@/lib/i18n";
import { formatCapacity, getProgress } from "@/lib/progress";
import { mono, sans, serif, terminal, wordmark } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${dict.meta.title}`,
      template: `%s — ${site.name}`,
    },
    description: dict.meta.description,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: lang === "sv" ? "sv_SE" : "en_GB",
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#1f2a3a",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const progress = getProgress();
  // The floppy until 5 projects ship, then the CD-ROM. Later media reuse the
  // CD until they get a design of their own.
  const Shell = progress.current.id === "floppy" ? Disk : CdCase;

  // Who and what the site is, for search engines.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        jobTitle: dict.meta.title,
        email: `mailto:${site.email}`,
        url: site.url,
        address: { "@type": "PostalAddress", addressLocality: site.location, addressCountry: "SE" },
        sameAs: site.profiles.map((profile) => profile.href),
        knowsAbout: ["Next.js", "React", "TypeScript", "Go", "PostgreSQL", "Payload CMS", "Docker", "Kubernetes"],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: site.domain,
        url: site.url,
        description: dict.meta.description,
        email: site.email,
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressLocality: site.location, addressCountry: "SE" },
        founder: { "@id": `${site.url}/#person` },
      },
    ],
  };

  return (
    <html
      lang={lang}
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${wordmark.variable} ${terminal.variable}`}
    >
      <body className="desktop-dither bg-desk font-sans text-ink antialiased">
        {/* Menu bar, platinum desktop style: the site, its disk usage and the year. */}
        <header className="fixed inset-x-0 top-0 z-40 flex h-7 items-center justify-between border-b border-ink bg-menubar px-3 font-mono text-[11px] tracking-[0.06em] text-ink uppercase">
          <span className="flex h-full items-center gap-3">
            <span className="font-medium">{site.domain}</span>
            <PromptButton label={dict.prompt.open} />
          </span>
          <span className="flex items-center gap-4">
            <UsageLink locale={lang} dict={dict} placement="below" />
            <span className="hidden sm:inline">2026</span>
          </span>
        </header>
        <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 pt-16 pb-12">
          <Shell locale={lang} dict={dict}>
            {children}
          </Shell>
          {progress.previous && (
            <UpgradeNotice
              medium={progress.current.id}
              bar={dict.upgrade.notice.bar}
              title={dict.upgrade.notice.title(formatCapacity(lang, progress.previous))}
              body={dict.upgrade.notice.body(progress.current.unlocksAt, dict.upgrade.media[progress.current.id])}
              later={dict.upgrade.notice.later}
              show={dict.upgrade.notice.show}
              href={viewPath(lang, "upgrade")}
            />
          )}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
