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
    label: "Linköping",
    title: "I build websites, online stores and the software behind them.",
    lead: [
      "Mostly for small companies that want to run things themselves: publish their own listings and articles, take orders, keep the Google rankings they’ve worked for.",
      "Alongside client work I study C and C++ at Chas Academy. It has made me picky about what happens under the hood, which is most of what makes a site feel fast.",
    ],
    cta: "Tell me about your project",
    localTime: "Local time in Linköping",
    logLabel: "Changelog",
    now: "now",
    log: [
      { date: "", text: "Building a site for Örhall Property Group" },
      { date: "Oct 2026", text: "Put this site live" },
      { date: "Oct 2026", text: "Launched Warde Property", href: "https://www.wardeproperty.com" },
    ],
    workLabel: "Work",
    work: {
      what: "A new website and an in-house admin for a boutique estate agency in Nice.",
      year: "2026",
      stack: "Next.js · Payload CMS · PostgreSQL",
      readBrief: "Read the brief",
      hideBrief: "Hide the brief",
      closeBrief: "Close the brief",
    },
    servicesLabel: "What I do",
    aboutLabel: "About",
    contactLabel: "Contact",
  },
  services: {
    heading: "What I can help with",
    items: [
      {
        title: "Websites",
        text: "Fast, accessible sites that are built to be found on Google, with forms and email that actually reach the inbox.",
      },
      {
        title: "Online stores",
        text: "Shops that work on a phone: product pages, checkout and payments, with stock and orders kept in step.",
      },
      {
        title: "Admin and backend systems",
        text: "An admin your team can run without me, or a custom system built around how your business already works.",
      },
      {
        title: "Safe AI automation",
        text: "Handing repetitive work to AI, with a person approving what matters, your data kept private and every step logged.",
      },
      {
        title: "Moving off WordPress",
        text: "Leaving WordPress or a rented system without losing your rankings, or making the site you already have faster.",
      },
      {
        title: "Servers and infrastructure",
        text: "Containers, Kubernetes and CI when a project needs servers of its own, with monitoring from day one.",
      },
    ],
  },
  case: {
    kicker: "Latest case · Nice · 2026",
    title: "Warde Property",
    body: "A new website and an in-house admin for an estate agency on the Côte d’Azur. The agents run listings, articles and newsletters themselves, and the site kept the rankings of the old one.",
    figures: [
      { value: "99–100", label: "Performance, desktop", device: "desktop" },
      { value: "96–99", label: "Performance, mobile", device: "mobile" },
      { value: "97–100", label: "Accessibility" },
      { value: "100", label: "Best practices" },
      { value: "100", label: "SEO" },
    ],
    figuresSource: "Lighthouse · 6 live pages · October 2026",
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
      "I’m a developer in Linköping. I build websites, online stores and the admin tools behind them for small and growing companies, and I work directly with the people who run them. The person you talk to is the person who writes the code, from the first conversation to launch and the weeks after.",
      "Alongside client work I study C and C++ at Chas Academy. Writing code that close to the machine teaches you to care about every millisecond and every byte. That habit carries straight over to the web, and it’s why the sites I build load quickly even on a slow phone connection.",
      "I explain things in plain language, write down what we’ve agreed, and give you a price before I start. When the site is live, your team can run it without me, and it belongs to you: the code, the content and the data.",
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
    kicker: "Case study · Warde Property · Nice · October 2026",
    title: "From a rented system to a site they own.",
    sections: [
      {
        heading: "The client",
        body: "Warde Property is a boutique estate agency in Nice.",
      },
      {
        heading: "The problem",
        body: "Their website and listings lived in a rented estate-agency system. It was slow: on a phone, the main photo took more than half a minute to appear, and Google’s own speed test gave it around 55 out of 100. The agency couldn’t even get its own listings out, as the system had no export, and every change went through the provider. Joacim wanted a faster site, a way for the team to publish listings and articles themselves, and to own their data, without losing the Google rankings they had built up over the years.",
      },
      {
        heading: "What I built",
        body: "A new website and a private admin shaped around how an estate agency works. An agent adds a listing with photos, price and status in a few minutes. When a home is sold, they mark it as sold and the site does the rest: the listing moves to Sold, the price is hidden, and old links keep working. Nothing is ever deleted. The team writes articles and pages, previews them on the real site, schedules posts and sends the newsletter, all from the same place. A built-in help section explains every screen.",
      },
      {
        heading: "Moving without losing Google",
        body: "A new website is where agencies most often lose their place in search. Before changing anything, I recorded where the old site stood in Google and mapped all 277 of its addresses. With no export available, I moved the 81 listings and 904 photos across myself, along with the 94 newsletter subscribers. Every old address now leads straight to its new page, and after launch I followed Google’s reports to close the last gaps.",
      },
      {
        heading: "Built to last",
        body: "The site is built to the international accessibility standard (WCAG 2.1 AA) and checked automatically on every change, along with security checks. Subscribers are handled under GDPR: double opt-in, one-click unsubscribe, and the agency can export or delete anyone’s data on request. A CRM and a link to their listing software are prepared for the next phase.",
      },
    ],
    results: "Results",
    comparison: {
      before: "Before",
      after: "After",
      rows: [
        { label: "Speed on a phone (Lighthouse)", before: "53–57", after: "96–99" },
        { label: "Main photo on screen, phone", before: "29–42 s", after: "about 2 s" },
        { label: "Home page size", before: "9 MB", after: "about 1 MB" },
      ],
    },
    outcome:
      "On a desktop the speed score is 99–100, with the main photo on screen in under a second. Every old address leads to its new page in one step. From first plan to launch in under two weeks.",
    tools: "Next.js · Payload CMS · PostgreSQL · Vercel",
    back: "← Back to the case",
  },
};

export type Dictionary = typeof en;
