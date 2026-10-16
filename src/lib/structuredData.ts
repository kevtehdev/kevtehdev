import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";

/** Who and what the site is, as schema.org JSON-LD for search engines. */
export function structuredData(dict: Dictionary) {
  const address = { "@type": "PostalAddress", addressLocality: site.location, addressCountry: "SE" };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        jobTitle: dict.meta.title,
        email: `mailto:${site.email}`,
        url: site.url,
        address,
        sameAs: site.profiles.map((profile) => profile.href),
        knowsAbout: site.knowsAbout,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: site.domain,
        url: site.url,
        description: dict.meta.description,
        email: site.email,
        areaServed: "Worldwide",
        address,
        founder: { "@id": `${site.url}/#person` },
      },
    ],
  };
}
