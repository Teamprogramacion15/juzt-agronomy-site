import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/content";
import { getSiteUrl, organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/motion/Preloader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: "variable",
  style: ["normal", "italic"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Gestoría y consultoría agronómica en Antioquia`,
    template: `%s · ${site.name}`,
  },
  description: site.descriptionShort,
  applicationName: site.name,
  authors: [{ name: "Dínamo Publicidad" }],
  creator: "Dínamo Publicidad",
  keywords: [
    "consultoría agronómica",
    "acompañamiento productivo",
    "gestoría agro",
    "asistencia técnica agrícola",
    "estructuración de proyectos productivos",
    "consultoría agroindustrial",
    "servicios agroalimentarios",
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
  themeColor: "#0c1338",
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
      suppressHydrationWarning
      className={`${hanken.variable} ${plexMono.variable} ${cormorant.variable}`}
    >
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Preloader />
        <Header />
        <SmoothScroll>
          <main id="contenido">{children}</main>
          <Footer />
        </SmoothScroll>
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
