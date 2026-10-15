import type { Metadata } from "next";
import { ServiceDetails } from "@/components/sections/ServiceDetails";

export const metadata: Metadata = {
  title: "Proyectos y consultoría",
  description: "Proyectos y consultoría, equipos, insumos y tecnología, y gestión financiera para convertir oportunidades en resultados.",
  alternates: { canonical: "/proyectos" },
};

export default function Page() { return <ServiceDetails service="all" />; }
