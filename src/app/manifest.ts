import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.descriptionShort,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e4",
    theme_color: "#1f4a37",
    lang: "es-CO",
    icons: [],
  };
}
