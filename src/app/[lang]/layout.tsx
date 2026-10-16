import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { CdCase } from "@/components/cd/CdCase";
import { Disk } from "@/components/disk/Disk";
import { UsageLink } from "@/components/disk/UsageLink";
import { UpgradeNotice } from "@/components/UpgradeNotice";
import { site } from "@/content/site";
import { getDictionary, hasLocale, locales, viewPath } from "@/lib/i18n";
import { formatCapacity, progress } from "@/lib/progress";
import { structuredData } from "@/lib/structuredData";
import { mono, sans, serif, wordmark } from "../fonts";
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
  themeColor: "#f4f4f4",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  // The floppy until 5 projects ship, then the CD-ROM. Later media reuse the
  // CD until they get a design of their own.
  const Shell = progress.current.id === "floppy" ? Disk : CdCase;

  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable} ${mono.variable} ${wordmark.variable}`}>
      <body className="desktop-dither bg-desk font-sans text-ink antialiased">
        {/* Menu bar, platinum desktop style: the site, its disk usage and the year. */}
        <header className="fixed inset-x-0 top-0 z-40 flex h-7 items-center justify-between border-b border-ink bg-menubar px-3 font-mono text-[11px] tracking-[0.06em] text-ink uppercase">
          <span className="font-medium">{site.domain}</span>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(dict)).replace(/</g, "\\u003c") }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
