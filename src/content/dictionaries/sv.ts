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
      { value: "99–100", label: "Prestanda, dator", device: "dator" },
      { value: "96–99", label: "Prestanda, mobil", device: "mobil" },
      { value: "97–100", label: "Tillgänglighet" },
      { value: "100", label: "Bästa praxis" },
      { value: "100", label: "SEO" },
    ],
    figuresSource: "Lighthouse · 6 sidor live · oktober 2026",
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
      "Jag är utvecklare i Linköping. Jag bygger webbplatser, webbutiker och adminverktygen bakom dem åt små och växande företag, och jag jobbar direkt med dem som driver företaget. Den du pratar med är den som skriver koden, från första samtalet till lansering och veckorna efter.",
      "Vid sidan av kunduppdragen studerar jag C och C++ på Chas Academy. Att skriva kod så nära maskinen lär en att bry sig om varje millisekund och varje byte. Den vanan följer med rakt in i webben, och det är därför sajterna jag bygger laddar snabbt även på en långsam mobiluppkoppling.",
      "Jag förklarar saker på vanlig svenska, skriver ner det vi har kommit överens om och ger dig ett pris innan jag börjar. När sajten är live kan ert team sköta den utan mig, och den tillhör er: koden, innehållet och datan.",
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
    kicker: "Case · Warde Property · Nice · oktober 2026",
    title: "Från ett hyrt system till en sajt de äger.",
    sections: [
      {
        heading: "Kunden",
        body: "Warde Property är en boutiquemäklare i Nice.",
      },
      {
        heading: "Problemet",
        body: "Deras webbplats och objekt låg i ett hyrt mäklarsystem. Det var långsamt: i mobilen tog huvudbilden mer än en halv minut att visas, och Googles eget hastighetstest gav sajten runt 55 av 100. Byrån kunde inte ens få ut sina egna objekt, eftersom systemet saknade export, och varje ändring gick via leverantören. Joacim ville ha en snabbare sajt, ett sätt för teamet att själva publicera objekt och artiklar, och att äga sin data, utan att tappa placeringarna i Google som de byggt upp genom åren.",
      },
      {
        heading: "Det här byggde jag",
        body: "En ny webbplats och ett eget admin format efter hur en mäklarbyrå arbetar. En mäklare lägger in ett objekt med bilder, pris och status på några minuter. När en bostad är såld markerar de den som såld och sajten sköter resten: objektet flyttas till Sålda, priset döljs och gamla länkar fungerar som förut. Inget raderas någonsin. Teamet skriver artiklar och sidor, förhandsgranskar dem på riktiga sajten, schemalägger inlägg och skickar nyhetsbrevet, allt från samma ställe. En inbyggd hjälpsektion förklarar varje vy.",
      },
      {
        heading: "Flytten utan att tappa Google",
        body: "En ny webbplats är där mäklare oftast tappar sin plats i sökresultaten. Innan något ändrades sparade jag var den gamla sajten stod i Google och kartlade alla 277 adresser. Utan export flyttade jag själv över de 81 objekten och 904 bilderna, tillsammans med de 94 prenumeranterna på nyhetsbrevet. Varje gammal adress leder nu direkt till sin nya sida, och efter lanseringen följde jag Googles rapporter och täppte till de sista luckorna.",
      },
      {
        heading: "Byggt för att hålla",
        body: "Sajten är byggd efter den internationella tillgänglighetsstandarden (WCAG 2.1 AA) och kontrolleras automatiskt vid varje ändring, tillsammans med säkerhetskontroller. Prenumeranter hanteras enligt GDPR: dubbelt samtycke, avanmälan med ett klick, och byrån kan exportera eller radera en persons data på begäran. Ett CRM och en koppling till deras objektsystem är förberedda för nästa fas.",
      },
    ],
    results: "Resultat",
    comparison: {
      before: "Före",
      after: "Efter",
      rows: [
        { label: "Hastighet i mobilen (Lighthouse)", before: "53–57", after: "96–99" },
        { label: "Huvudbilden syns, mobil", before: "29–42 s", after: "cirka 2 s" },
        { label: "Startsidans storlek", before: "9 MB", after: "cirka 1 MB" },
      ],
    },
    outcome:
      "På dator är hastigheten 99–100, och huvudbilden syns på under en sekund. Varje gammal adress leder till sin nya sida i ett steg. Från första plan till lansering på under två veckor.",
    tools: "Next.js · Payload CMS · PostgreSQL · Vercel",
    back: "← Tillbaka till caset",
  },
};
