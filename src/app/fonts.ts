import localFont from "next/font/local";

// Self-hosted (SIL OFL), so no request ever leaves for a font CDN.

// Everything you read.
export const sans = localFont({
  src: [{ path: "../fonts/geist-latin-wght-normal.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-geist",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

// The wordmark, labels, dates and numbers: a coding font, since this is a developer's site.
export const mono = localFont({
  src: [{ path: "../fonts/jetbrains-mono-latin-wght-normal.woff2", weight: "100 800", style: "normal" }],
  variable: "--font-jetbrains",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
