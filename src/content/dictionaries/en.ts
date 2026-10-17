export const en = {
  meta: {
    title: "Fullstack developer",
    description:
      "Kevin builds fast websites for small companies, and the admin tools behind them. Next.js, TypeScript and Payload CMS, from Linköping, Sweden.",
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
    title: "Fast websites, and the admin tools behind them.",
    lead: "For small companies that want to publish on their own and keep their Google rankings. Built in Linköping with Next.js, TypeScript and Payload CMS.",
    cta: "Have a project?",
    brief: "Read the Warde brief",
    available: "Available from",
    availableNow: "Available now",
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
    body: "I’m a fullstack developer from Linköping, and I care about a few things that nobody notices until they’re missing: pages that load instantly, admin panels that make sense, code someone else can read next year. I picked that up writing C and C++, where sloppy code doesn’t just slow down, it crashes. Now I bring that discipline to the web.",
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
    helpHeading: "What I can help with",
    help: [
      "New websites that load fast and are built to be found on Google",
      "An admin your team runs on its own: pages, articles, listings, newsletters",
      "Custom-made backend systems, built around how your business works",
      "Containers and Kubernetes, when a project needs servers of its own",
      "Moving off WordPress or a rented system without losing your rankings",
      "Making an existing site faster and accessible to everyone",
      "Forms, sign-ups and email that reach the inbox",
    ],
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
    cta: "Have a project? →",
  },
  brief: {
    kicker: "Case study · Warde Property · Nice · 2026",
    title: "From a rented admin to one they own.",
    sections: [
      {
        heading: "The problem",
        body: "Warde ran their listings in a rented estate-agency system and their website on WordPress, and neither would export their data. They wanted to own it, get a faster site and publish without a developer, without losing the Google rankings they had built up.",
      },
      {
        heading: "What I built",
        body: "A new Next.js site with an admin on Payload CMS and PostgreSQL. Agents add listings with photos, price and status (active, reserved, sold, archived), and archive instead of delete. Editors build articles and pages from blocks, preview drafts on the real site, schedule posts and send the newsletter. Roles are checked on the server, every change lands in an audit log, and redirects live in the admin.",
      },
      {
        heading: "Keeping the rankings",
        body: "Before changing anything I took a baseline from Search Console and crawled the old site. The new site keeps the URL structure, every address that changes gets a 301 that CI tests, and pages ship sitemaps and structured data. The old system had no export, so I read all 81 listings off the public site and imported them.",
      },
      {
        heading: "Built to last",
        body: "TypeScript in strict mode, end-to-end tests with Playwright and axe, and CI that runs a dependency audit and a secret scan on every change. Accessibility targets WCAG 2.1 AA. A CRM and sync with their lead system are prepared as extension points, not built, so the next phase starts on solid ground.",
      },
    ],
    results: "Results",
    rankings: "All 247 addresses from the old site lead to the new pages in one step.",
    stack: "Stack",
    tools: "Next.js 16 · Payload CMS 3 · PostgreSQL · Tailwind · Vercel · Resend · Sentry",
    back: "← Back to the case",
  },
};

export type Dictionary = typeof en;
