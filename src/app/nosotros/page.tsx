import type { Metadata } from "next";
import { TeamSection } from "@/components/sections/TeamSection";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Nuestro propósito, cinco diferenciales reales y un acompañamiento estratégico por fases para organizaciones y proyectos productivos.",
  alternates: { canonical: "/nosotros" },
};

export default function Page() { return <TeamSection />; }
