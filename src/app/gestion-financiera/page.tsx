import type { Metadata } from "next";
import { ServiceDetails } from "@/components/sections/ServiceDetails";

export const metadata: Metadata = {
  title: "Gestión financiera",
  description: "Crédito, garantías e inversión para proyectos agropecuarios.",
  alternates: { canonical: "/gestion-financiera" },
};

export default function Page() { return <ServiceDetails service="finance" />; }
