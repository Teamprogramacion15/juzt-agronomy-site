import type { Metadata } from "next";
import { TourismCases } from "@/components/sections/TourismCases";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description: "Rutas del Turismo Sostenible, Negocios Verdes e historias de proyectos de JUZT en territorio.",
  alternates: { canonical: "/casos-de-exito" },
};

export default function CasosDeExitoPage() {
  return <TourismCases />;
}
