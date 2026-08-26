import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/lib/content";
import { getSiteUrl, organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsConsent } from "@/components/layout/AnalyticsConsent";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: "variable",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

const pitagon = localFont({
  src: [
    {
      path: "./fonts/PitagonSerif-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/PitagonSerif-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-pitagon",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

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
      className={`${hanken.variable} ${plexMono.variable} ${pitagon.variable}`}
    >
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
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
