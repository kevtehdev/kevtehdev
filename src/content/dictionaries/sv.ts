import type { Dictionary } from "./en";

export const sv: Dictionary = {
  meta: {
    title: "Utvecklare",
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
    label: "Linköping",
    title: "Jag bygger webbplatser, webbutiker och mjukvaran bakom dem.",
    lead: [
      "Mest åt små företag som vill sköta saker själva: publicera egna objekt och artiklar, ta emot beställningar och behålla placeringarna på Google som de har jobbat för.",
      "Vid sidan av kunduppdragen studerar jag C och C++ på Chas Academy. Det har gjort mig noga med vad som händer under huven, och det är mest det som gör att en sajt känns snabb.",
    ],
    cta: "Berätta om ditt projekt",
    localTime: "Lokal tid i Linköping",
    logLabel: "Logg",
    now: "nu",
    log: [
      { date: "", text: "Bygger en sajt åt Örhall Property Group" },
      { date: "okt 2026", text: "Lade ut den här sajten" },
      { date: "okt 2026", text: "Lanserade Warde Property", href: "https://www.wardeproperty.com" },
    ],
    workLabel: "Arbete",
    work: {
      what: "En ny webbplats och ett eget adminverktyg för en boutiquemäklare i Nice.",
      year: "2026",
      stack: "Next.js · Payload CMS · PostgreSQL",
      readBrief: "Läs briefen",
      hideBrief: "Dölj briefen",
      closeBrief: "Stäng briefen",
    },
    servicesLabel: "Det här gör jag",
    aboutLabel: "Om",
    contactLabel: "Kontakt",
  },
  services: {
    heading: "Det här kan jag hjälpa till med",
    items: [
      {
        title: "Webbplatser",
        text: "Snabba, tillgängliga sajter som är byggda för att hittas på Google, med formulär och mejl som faktiskt når inkorgen.",
      },
      {
        title: "Webbutiker",
        text: "Butiker som fungerar i mobilen: produktsidor, kassa och betalning, med lager och ordrar i takt.",
      },
      {
        title: "Admin och backendsystem",
        text: "Ett admin som teamet kan sköta utan mig, eller ett eget system byggt efter hur ert företag redan fungerar.",
      },
      {
        title: "Säker AI-automation",
        text: "AI som tar det repetitiva arbetet, med en människa som godkänner det viktiga, er data skyddad och varje steg loggat.",
      },
      {
        title: "Flytt från WordPress",
        text: "Bort från WordPress eller ett hyrt system utan att tappa placeringar, eller en snabbare version av sajten ni redan har.",
      },
      {
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
      { value: "100", label: "Prestanda, dator", device: "dator" },
      { value: "97–99", label: "Prestanda, mobil", device: "mobil" },
      { value: "100", label: "Tillgänglighet" },
      { value: "100", label: "Bästa praxis" },
      { value: "100", label: "SEO" },
    ],
    figuresSource: "Lighthouse · 6 sidor live",
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
    body: [
      "Jag är utvecklare i Linköping. Jag bygger webbplatser, webbutiker och systemen bakom dem åt små och växande företag, från första skissen till lansering och veckorna efter.",
      "Vid sidan av kunduppdragen studerar jag C och C++ på Chas Academy, en tvåårig utbildning. Att jobba så nära maskinen formar hur jag bygger för webben: jag tänker på minne och hastighet, och jag vill att kod säger ifrån direkt i stället för att fela i tysthet. I C blir slarvig kod inte bara långsam, den kraschar.",
      "Det jag bryr mig mest om är sådant ingen märker förrän det saknas: sidor som laddar direkt, adminpaneler som går att förstå och kod som någon annan kan läsa nästa år.",
    ],
    facts: [
      { label: "Bas", value: "Linköping" },
      { label: "Studerar", value: "C och C++ på Chas Academy" },
      { label: "Bygger med", value: "Next.js · TypeScript · Go · PostgreSQL" },
    ],
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
        body: "Warde Property är en boutiquemäklare i Nice. Objekten låg i ett hyrt mäklarsystem som inte gick att exportera ifrån, och webbplatsen drevs separat på WordPress. Joacim och hans team ville äga sin data, få en snabbare sajt och själva publicera objekt och artiklar, utan att tappa placeringarna i Google som de byggt upp under flera år.",
      },
      {
        heading: "Det här byggde jag",
        body: "Jag designade och byggde en ny sajt i Next.js med ett eget admin i Payload CMS och PostgreSQL. Mäklarna lägger in objekt med bilder, pris och status (aktiv, reserverad, såld eller arkiverad), och ett publicerat objekt arkiveras, det raderas aldrig. Redaktörerna skriver artiklar och sidor av färdiga block, förhandsgranskar utkast på den riktiga sajten, schemalägger inlägg och skickar nyhetsbrevet. Behörigheter kontrolleras på servern, och varje ändring skrivs till en logg.",
      },
      {
        heading: "Placeringarna behölls",
        body: "Innan jag ändrade något crawlade jag den gamla sajten med ett eget skript, 277 adresser, och använde Search Console som baslinje. Av 222 objektsidor hade 81 fortfarande en bostad bakom sig; utan någon export läste jag av dem från den publika sajten och importerade dem. Varje gammal adress leder nu till sin nya sida med en enda 301, och efter lanseringen följde jag Search Console för att täppa till de sista luckorna.",
      },
      {
        heading: "Byggt för att hålla",
        body: "TypeScript i strict-läge, end-to-end-tester med Playwright och axe, och CI som kör beroendegranskning och sökning efter hemligheter vid varje ändring. Den publika sajten är byggd för WCAG 2.1 AA. Ett CRM och en synk mot Apimo, byråns objektsystem, är förberedda som utbyggnadspunkter, inte byggda, så nästa fas börjar på stabil grund.",
      },
    ],
    results: "Resultat",
    rankings: "Alla 247 adresser från den gamla sajten leder till sina nya sidor i ett steg.",
    stack: "Teknik",
    tools: "Next.js 16 · Payload CMS 3 · PostgreSQL · Tailwind · Vercel · Resend · Sentry",
    back: "← Tillbaka till caset",
  },
};
