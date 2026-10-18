// Personal details live here, so the copy in the dictionaries never has to
// change when an address or a link does.

export const site = {
  name: "Kevin Johnson",
  domain: "kevdev.codes",
  email: "hire@kevdev.codes",
  location: "Linköping",
  // Told to search engines in the structured data, not shown on the page.
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Go",
    "PostgreSQL",
    "Payload CMS",
    "E-commerce",
    "AI automation",
    "Docker",
    "Kubernetes",
  ],
  // When new projects can start. Null means "Available now"; set a month to show "Available from …".
  availableFrom: null as { en: string; sv: string } | null,
  // Due date of the project on the Now page.
  nowDue: {
    en: "October",
    sv: "oktober",
  },
  // Listed on Contact and in the footer, in this order.
  profiles: [{ label: "GitHub", href: "https://github.com/kevtehdev" }],
  latestCase: {
    url: "https://www.wardeproperty.com",
    // Google's PageSpeed Insights runs the same Lighthouse test on the live site.
    pagespeed: "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwww.wardeproperty.com%2F",
  },
  // The code, linked from the deploy hash in the footer.
  repo: "https://github.com/kevtehdev/kevtehdev",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kevdev.codes",
} as const;
