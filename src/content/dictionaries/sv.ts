import type { Dictionary } from "./en";

export const sv: Dictionary = {
  meta: {
    title: "Fullstackutvecklare",
    description:
      "Kevin bygger snabba webbplatser, webbutiker och systemen bakom dem, och sätter upp AI-automation som är säker. Next.js, TypeScript och Payload CMS, från Linköping.",
  },
  skip: "Hoppa till innehållet",
  nav: {
    label: "Huvudmeny",
    home: "Hem",
    case: "Case",
    now: "Nu",
    about: "Om",
    contact: "Kontakt",
    brief: "Brief",
    skills: "Kunskap",
  },
  language: {
    label: "Språk",
    en: "English",
    sv: "Svenska",
  },
  home: {
    title: "Webbplatser, webbutiker och systemen som driver ert företag.",
    lead: "Jag hjälper små och växande företag med det de säljer och driver verksamheten på: sajter som laddar direkt, butiker som fungerar i mobilen, adminverktyg som teamet sköter själva och AI-automation ni kan lita på. Från Linköping, för kunder var som helst.",
    cta: "Har du ett projekt?",
    localTime: "Lokal tid i Linköping",
    proofHeading: "Bevis",
    proofBody:
      "Min senaste lansering, mätt med Googles eget Lighthouse-test på den riktiga sajten. Alla projekt jag tar mig an byggs med samma krav.",
    caseLink: "Läs caset",
    available: "Ledig från",
    availableNow: "Ledig nu",
  },
  services: {
    label: "Tjänster",
    heading: "Det här kan jag hjälpa till med",
    items: [
      {
        tag: "/web",
        title: "Webbplatser",
        text: "Snabba, tillgängliga sajter byggda för att hittas på Google, med formulär och mejl som faktiskt når inkorgen.",
      },
      {
        tag: "/commerce",
        title: "Webbutiker",
        text: "E-handel som laddar snabbt i mobilen: produktsidor, kassa och betalning, med lager och ordrar i synk.",
      },
      {
        tag: "/systems",
        title: "Admin och backendsystem",
        text: "Ett admin som teamet sköter själva, och skräddarsydda system byggda efter hur ert företag fungerar: objekt, bokningar, ordrar, nyhetsbrev.",
      },
      {
        tag: "/ai",
        title: "Säker AI-automation",
        text: "Låt AI ta det repetitiva arbetet, med en människa som godkänner det viktiga, er data skyddad och varje steg loggat.",
      },
      {
        tag: "/migrate",
        title: "Flytt och snabbare sajt",
        text: "Från WordPress eller ett hyrt system utan att tappa placeringar, eller gör den sajt ni redan har snabbare och tillgänglig för alla.",
      },
      {
        tag: "/infra",
        title: "Servrar och infrastruktur",
        text: "Containrar, Kubernetes och CI när ett projekt behöver egna servrar, med övervakning från första dagen.",
      },
    ],
  },
  case: {
    kicker: "Senaste case · Nice · 2026",
    title: "Warde Property",
    body: "En ny webbplats och ett eget adminverktyg för en mäklare på Côte d’Azur. Mäklarna sköter objekt, artiklar och nyhetsbrev själva, och sajten behöll den gamlas placeringar.",
    figures: [
      { value: "97–99", label: "Prestanda, mobil" },
      { value: "100", label: "Tillgänglighet" },
      { value: "100", label: "Bästa praxis" },
      { value: "100", label: "SEO" },
    ],
    figuresSource: "Lighthouse, mobil · 6 sidor live",
    test: "Testa själv",
    link: "Besök sajten",
    brief: "Läs briefen",
  },
  now: {
    status: "Skrivs…",
    due: "klar",
    correction: "nästan klar",
    title: "Örhall Property Group",
    body: "En ny webbplats för en fastighetskoncern, gjord för att kännas som en del av samma familj som Warde.",
  },
  about: {
    kicker: "Om mig",
    title: "Hej, jag heter Kevin.",
    body: "Jag är fullstackutvecklare från Linköping och bryr mig om några saker som ingen märker förrän de saknas: sidor som laddar direkt, adminpaneler som går att förstå, kod som någon annan kan läsa nästa år. Det lärde jag mig genom att skriva C och C++, där slarvig kod inte bara blir långsam, den kraschar. Nu tar jag med mig den disciplinen till webben.",
    skills: "Vad jag jobbar med, och hur →",
  },
  contact: {
    kicker: "Skriv till mig",
    title: "Har du ett projekt?",
    body: "Berätta vad du behöver, så återkommer jag med en plan och ett pris.",
    copy: "Kopiera",
    copied: "Kopierad",
  },
  skills: {
    kicker: "Kunskap",
    title: "Vad jag kan hjälpa till med, och hur jag jobbar.",
    processHeading: "Så jobbar jag",
    process: [
      { step: "Brief", text: "Vi skriver ner vad ni behöver och hur vi vet att det fungerade." },
      { step: "Plan", text: "Ni får en plan och ett pris innan någon kod skrivs." },
      { step: "Bygge", text: "Små steg, med en demo efter varje del så att ni ser det växa." },
      { step: "Lansering", text: "Redirects kontrollerade, Google meddelat, de första veckorna följda." },
    ],
    toolsHeading: "Verktyg jag använder",
    tools: [
      { group: "Frontend", list: "Next.js · React · TypeScript · Tailwind CSS" },
      { group: "Backend", list: "Go · Node.js · Payload CMS · egna API:er" },
      { group: "Data", list: "PostgreSQL · Neon" },
      { group: "Infrastruktur", list: "Docker · Kubernetes · Vercel · egen drift" },
      { group: "Kvalitet & CI", list: "Playwright · axe · Lighthouse · GitHub Actions" },
      { group: "Drift", list: "Sentry · Resend" },
      { group: "System", list: "C · C++ · Rust · sockets · ESP32" },
    ],
    cta: "Har du ett projekt?",
  },
  brief: {
    kicker: "Case · Warde Property · Nice · 2026",
    title: "Från ett hyrt admin till ett eget.",
    sections: [
      {
        heading: "Problemet",
        body: "Warde hade sina objekt i ett hyrt mäklarsystem och sin webbplats på WordPress, och inget av dem gick att exportera data ur. De ville äga sin data, få en snabbare sajt och publicera utan utvecklare, utan att tappa placeringarna i Google som de byggt upp.",
      },
      {
        heading: "Det här byggde jag",
        body: "En ny Next.js-sajt med ett admin i Payload CMS och PostgreSQL. Mäklarna lägger in objekt med bilder, pris och status (aktiv, reserverad, såld, arkiverad) och arkiverar i stället för att radera. Redaktörerna bygger artiklar och sidor av block, förhandsgranskar utkast på riktiga sajten, schemalägger inlägg och skickar nyhetsbrevet. Roller kontrolleras på servern, varje ändring hamnar i en logg och redirects sköts i adminet.",
      },
      {
        heading: "Placeringarna behölls",
        body: "Innan jag ändrade något tog jag en baslinje från Search Console och crawlade den gamla sajten. Den nya sajten behåller URL-strukturen, varje adress som ändras får en 301 som testas i CI, och sidorna har sitemaps och strukturerad data. Det gamla systemet saknade export, så jag läste av alla 81 objekt från den publika sajten och importerade dem.",
      },
      {
        heading: "Byggt för att hålla",
        body: "TypeScript i strict-läge, end-to-end-tester med Playwright och axe, och CI som kör beroendegranskning och sökning efter hemligheter vid varje ändring. Tillgängligheten siktar på WCAG 2.1 AA. Ett CRM och synk mot deras leadsystem är förberedda som utbyggnadspunkter, inte byggda, så nästa fas börjar på stabil grund.",
      },
    ],
    results: "Resultat",
    rankings: "Alla 247 adresser från den gamla sajten leder till de nya sidorna i ett steg.",
    stack: "Teknik",
    tools: "Next.js 16 · Payload CMS 3 · PostgreSQL · Tailwind · Vercel · Resend · Sentry",
    back: "← Tillbaka till caset",
  },
};
