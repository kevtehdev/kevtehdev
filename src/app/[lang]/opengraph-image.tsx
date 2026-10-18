import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

// The link preview for LinkedIn, Slack and the like: the headline and the latest case's scores.

export const alt = `${site.domain} · ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const colors = { bg: "#fafafa", fg: "#111214", muted: "#63676e", rule: "#e5e6e8" };
// Lighthouse's own colours for a passing score.
const pass = { arc: "#0cce6b", fill: "rgba(12, 206, 107, 0.1)", text: "#008800" };
const circumference = 2 * Math.PI * 20;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : "en");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        background: colors.bg,
        color: colors.fg,
      }}
    >
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, fontWeight: 600 }}>
        {site.domain.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: colors.muted }}>
          {`${site.name} · ${dict.meta.title}`.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, fontWeight: 700, maxWidth: 900 }}>
          {dict.home.title}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `2px solid ${colors.rule}`,
          paddingTop: 32,
        }}
      >
        {dict.case.figures.map((figure) => {
          const score = Number.parseInt(figure.value, 10);
          return (
            <div
              key={figure.label}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: 190 }}
            >
              <div style={{ display: "flex", position: "relative", width: 84, height: 84 }}>
                <svg width="84" height="84" viewBox="0 0 44 44" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="22" cy="22" r="20" fill={pass.fill} stroke={pass.fill} strokeWidth="3" />
                  <circle
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    stroke={pass.arc}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={`${circumference * (1 - score / 100)}`}
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 84,
                    height: 84,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: figure.value.length > 3 ? 20 : 28,
                    fontWeight: 700,
                    color: pass.text,
                  }}
                >
                  {figure.value}
                </div>
              </div>
              <div
                style={{ display: "flex", fontSize: 16, letterSpacing: 1, color: colors.muted, textAlign: "center" }}
              >
                {figure.label.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </div>,
    size,
  );
}
