import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.descriptionShort,
    start_url: "/",
    display: "standalone",
    background_color: "#ededed",
    theme_color: "#192147",
    lang: "es-CO",
    icons: [
      {
        src: "/icon.png",
        sizes: "1966x2126",
        type: "image/png",
      },
    ],
  };
}
