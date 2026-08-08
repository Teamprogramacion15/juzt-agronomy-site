import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Tarjeta social generada — sin fuentes externas para evitar dependencias de red.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0c1338 0%, #182466 60%, #2c3c86 100%)",
          color: "#f4f2ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
            Juzt
          </div>
          <div
            style={{ width: 16, height: 16, borderRadius: 999, background: "#f3c73f" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Convertimos conocimiento técnico en productividad agroalimentaria
          </div>
          <div style={{ fontSize: 30, color: "#f4d15f" }}>
            Gestoría y consultoría agronómica · Antioquia, Colombia
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            textTransform: "uppercase",
            letterSpacing: 4,
            color: "#f3c73f",
          }}
        >
          <span>Just productivity</span>
          <span>juzt.com.co</span>
        </div>
      </div>
    ),
    size,
  );
}
