import type { Metadata, Viewport } from "next";
import { site } from "@/lib/content";
import { getSiteUrl, organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { HomeContact } from "@/components/sections/HomeContact";
import { InteriorFooter } from "@/components/layout/InteriorFooter";
import { AnalyticsConsent } from "@/components/layout/AnalyticsConsent";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Proyectos y planeación estratégica rural`,
    template: `%s · ${site.name}`,
  },
  description: site.descriptionShort,
  applicationName: site.name,
  authors: [{ name: "Dínamo Publicidad" }],
  creator: "Dínamo Publicidad",
  keywords: [
    "estructuración de proyectos agropecuarios",
    "ejecución de proyectos rurales",
    "planeación estratégica rural",
    "gestión administrativa agro",
    "consultoría técnica agropecuaria",
    "EPSEA",
    "extensión agropecuaria",
    "Antioquia",
    "Colombia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.descriptionShort,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.descriptionShort,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#192147",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-CO"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/fonts/PitagonSans-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PitagonSans-ExtraBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://juztmaquinaria.lovable.app" />
      </head>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <InteriorFooter><HomeContact /></InteriorFooter>
        <WhatsAppFloating />
        <AnalyticsConsent />
        <script
          type="application/ld+json"
          // JSON-LD estático a partir de datos reales de la marca.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
