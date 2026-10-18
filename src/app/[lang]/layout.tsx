import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { site } from "@/content/site";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { structuredData } from "@/lib/structuredData";
import { display, mono, sans } from "../fonts";
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
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#101216" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const deploy = process.env.VERCEL_GIT_COMMIT_SHA;

  return (
    // The intro script sets data-intro on <html> before React hydrates.
    <html lang={lang} className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="relative bg-bg font-sans text-fg antialiased">
        <Intro />
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm text-bg focus:translate-y-0"
        >
          {dict.skip}
        </a>
        <div className="relative px-[max(1rem,env(safe-area-inset-left))] sm:px-8">
          <div className="mx-auto flex min-h-dvh max-w-[65rem] flex-col">
            <Header locale={lang} nav={dict.nav} language={dict.language} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <footer
              data-reveal
              className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-rule py-6 eyebrow"
            >
              <span className="flex flex-wrap gap-x-5 gap-y-2">
                <a href={`mailto:${site.email}`} className="hover:text-fg">
                  {site.email}
                </a>
                {site.profiles.map((profile) => (
                  <a key={profile.href} href={profile.href} className="hover:text-fg" rel="me noopener">
                    {profile.label} ↗
                  </a>
                ))}
              </span>
              <span className="flex flex-wrap gap-x-2">
                {site.location}
                {deploy && (
                  <>
                    <span aria-hidden>·</span>
                    {/* The exact commit this page was built from. Set by Vercel at build time. */}
                    <a href={`${site.repo}/commit/${deploy}`} className="hover:text-fg" rel="noopener">
                      deploy <span className="normal-case">{deploy.slice(0, 7)}</span>
                    </a>
                  </>
                )}
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
