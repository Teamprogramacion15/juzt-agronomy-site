import { site, contact, social } from "@/lib/content";

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");
}

/** JSON-LD para la organización — solo datos reales verificados. */
export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    alternateName: site.tagline,
    url,
    email: contact.email,
    telephone: contact.phoneRaw,
    description: site.descriptionShort,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${site.region}, ${site.country}`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: "CO",
    },
    knowsAbout: [
      "Ejecución de proyectos rurales",
      "Estructuración de proyectos agropecuarios",
      "Gestión administrativa y de negocios",
      "Planeación estratégica rural",
      "Extensión agropecuaria",
      "EPSEA",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Líneas de proyectos JUZT",
      itemListElement: [
        "Ejecución y estructuración de proyectos",
        "Gestión administrativa y de negocios",
        "Consultoría técnica en planeación estratégica",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
    sameAs: social.map((s) => s.href),
  };
}
