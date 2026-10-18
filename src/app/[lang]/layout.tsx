import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { FooterNav } from "@/components/FooterNav";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { site } from "@/content/site";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { structuredData } from "@/lib/structuredData";
import { mono, sans } from "../fonts";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0e" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    // The intro script sets data-intro on <html> before React hydrates.
    <html lang={lang} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="bg-bg font-sans text-[15px] leading-[1.65] text-fg antialiased">
        <Intro />
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-[7px] bg-fg px-4 py-2 text-sm text-bg focus:translate-y-0"
        >
          {dict.skip}
        </a>
        {/* One narrow reading column: an 8.5rem label column and a 40rem measure. */}
        <div className="px-[max(1.25rem,env(safe-area-inset-left))]">
          <div className="mx-auto flex min-h-dvh max-w-[48.5rem] flex-col">
            <Header locale={lang} language={dict.language} timeLabel={dict.home.localTime} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <footer
              data-reveal
              style={{ "--n": 8 } as CSSProperties}
              className="flex flex-wrap items-center justify-between gap-x-6 border-t border-rule py-4 label"
            >
              <FooterNav locale={lang} nav={dict.nav} />
              <span>
                {site.name} · {site.location}
              </span>
            </footer>
          </div>
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
