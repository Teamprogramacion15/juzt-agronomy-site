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
      addressRegion: site.region,
      addressCountry: "CO",
    },
    knowsAbout: [
      "Consultoría agronómica",
      "Asistencia técnica agropecuaria",
      "Gestoría agro",
      "Estructuración de proyectos agroalimentarios",
      "Gestión de inversión agro",
    ],
    sameAs: social.map((s) => s.href),
  };
}
