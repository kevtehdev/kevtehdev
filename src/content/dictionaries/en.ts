export const en = {
  meta: {
    title: "Developer",
    description:
      "Kevin builds fast websites, online stores and the systems behind them, and sets up AI automation that stays safe. Next.js, TypeScript and Payload CMS, from Linköping, Sweden.",
  },
  skip: "Skip to content",
  nav: {
    label: "Main menu",
    home: "Home",
    case: "Case",
    now: "Now",
    about: "About",
    contact: "Contact",
    brief: "Brief",
    skills: "Skills",
  },
  language: {
    label: "Language",
    en: "English",
    sv: "Svenska",
  },
  home: {
    title: "Websites, online stores, and the systems that run your business.",
    lead: "A developer in Linköping, studying C and C++ at Chas Academy. I build for small and growing companies, from the first sketch to launch.",
    cta: "Have a project?",
    localTime: "Local time in Linköping",
  },
  services: {
    label: "Services",
    heading: "What I can help with",
    items: [
      {
        tag: "/web",
        title: "Websites",
        text: "Fast, accessible sites built to be found on Google, with forms and email that actually reach the inbox.",
      },
      {
        tag: "/commerce",
        title: "Online stores",
        text: "E-commerce that loads fast on a phone: product pages, checkout and payments, with stock and orders kept in sync.",
      },
      {
        tag: "/systems",
        title: "Admin and backend systems",
        text: "An admin your team runs on its own, and custom systems built around how your business works: listings, bookings, orders, newsletters.",
      },
      {
        tag: "/ai",
        title: "Safe AI automation",
        text: "Hand the repetitive work to AI, with a person approving what matters, your data kept private and every step logged.",
      },
      {
        tag: "/migrate",
        title: "Moving and speeding up",
        text: "Off WordPress or a rented system without losing your rankings, or make the site you already have faster and accessible to everyone.",
      },
      {
        tag: "/infra",
        title: "Servers and infrastructure",
        text: "Containers, Kubernetes and CI when a project needs servers of its own, with monitoring from the first day.",
      },
    ],
  },
  case: {
    kicker: "Latest case · Nice · 2026",
    title: "Warde Property",
    body: "A new website and an in-house admin for an estate agency on the Côte d’Azur. The agents run listings, articles and newsletters themselves, and the site kept the rankings of the old one.",
    figures: [
      { value: "97–99", label: "Performance, mobile" },
      { value: "100", label: "Accessibility" },
      { value: "100", label: "Best practices" },
      { value: "100", label: "SEO" },
    ],
    figuresSource: "Lighthouse, mobile · 6 live pages",
    test: "Test it yourself",
    link: "Visit the site",
    brief: "Read the brief",
  },
  now: {
    status: "Writing…",
    due: "due",
    // Shown instead of the status while it applies. Leave empty to show the status.
    correction: "almost done",
    title: "Örhall Property Group",
    body: "A new website for a property group, built to feel like part of the same family as Warde.",
  },
  about: {
    kicker: "About",
    title: "Hi, I’m Kevin.",
    body: [
      "I’m a developer in Linköping. I build websites, online stores and the systems behind them for small and growing companies, from the first sketch to launch and the weeks after.",
      "Alongside client work I study C and C++ at Chas Academy, in a two-year programme. Working that close to the machine shapes how I build for the web: I think about memory and speed, and I want code to fail loudly rather than quietly. In C, sloppy code doesn’t just run slow, it crashes.",
      "What I care about most is what nobody notices until it’s missing: pages that load instantly, admin panels that make sense, and code someone else can read next year.",
    ],
    facts: [
      { label: "Based in", value: "Linköping, Sweden" },
      { label: "Studying", value: "C and C++ at Chas Academy" },
      { label: "Builds with", value: "Next.js · TypeScript · Go · PostgreSQL" },
    ],
    skills: "What I work with, and how I work →",
  },
  contact: {
    kicker: "Write to me",
    title: "Have a project?",
    body: "Tell me what you need, and I’ll come back with a plan and a price.",
    copy: "Copy",
    copied: "Copied",
  },
  skills: {
    kicker: "Skills",
    title: "What I can help with, and how I work.",
    processHeading: "How I work",
    process: [
      { step: "Brief", text: "We write down what you need and how we’ll know it worked." },
      { step: "Plan", text: "You get a plan and a price before any code is written." },
      { step: "Build", text: "Small steps, with a demo after each part so you see it grow." },
      { step: "Launch", text: "Redirects checked, Google told, the first weeks followed up." },
    ],
    toolsHeading: "Tools I use",
    tools: [
      { group: "Frontend", list: "Next.js · React · TypeScript · Tailwind CSS" },
      { group: "Backend", list: "Go · Node.js · Payload CMS · custom APIs" },
      { group: "Data", list: "PostgreSQL · Neon" },
      { group: "Infrastructure", list: "Docker · Kubernetes · Vercel · self-hosted" },
      { group: "Quality & CI", list: "Playwright · axe · Lighthouse · GitHub Actions" },
      { group: "Operations", list: "Sentry · Resend" },
      { group: "Systems", list: "C · C++ · Rust · sockets · ESP32" },
    ],
    cta: "Have a project?",
  },
  brief: {
    kicker: "Case study · Warde Property · Nice · 2026",
    title: "From a rented admin to one they own.",
    sections: [
      {
        heading: "The problem",
        body: "Warde Property is a boutique estate agency in Nice. Its listings lived in a rented estate-agency system with no way to export them, and its website ran separately on WordPress. Joacim and his team wanted to own their data, a faster site, and to publish listings and articles themselves, without losing the Google rankings they had built up over the years.",
      },
      {
        heading: "What I built",
        body: "I designed and built a new site in Next.js with its own admin on Payload CMS and PostgreSQL. The agents add listings with photos, price and status (active, reserved, sold or archived), and a published listing is archived, never deleted. Editors write articles and pages from ready-made blocks, preview drafts on the real site, schedule posts and send the newsletter. Permissions are checked on the server, and every change is written to an audit log.",
      },
      {
        heading: "Keeping the rankings",
        body: "Before changing anything, I crawled the old site with my own script, 277 addresses, and used Search Console as the baseline. Of 222 listing pages, 81 still had a home behind them; with no export available, I read those from the public site and imported them. Every old address now leads to its new page in a single 301, and after launch I followed Search Console to close the last gaps.",
      },
      {
        heading: "Built to last",
        body: "Strict TypeScript, end-to-end tests with Playwright and axe, and CI that runs a dependency audit and a secret scan on every change. The public site is built to WCAG 2.1 AA. A CRM and a sync with Apimo, the agency's listing software, are prepared as extension points rather than built, so the next phase starts on solid ground.",
      },
    ],
    results: "Results",
    rankings: "Every one of the 247 addresses from the old site leads to its new page in one step.",
    stack: "Stack",
    tools: "Next.js 16 · Payload CMS 3 · PostgreSQL · Tailwind · Vercel · Resend · Sentry",
    back: "← Back to the case",
  },
};

export type Dictionary = typeof en;
