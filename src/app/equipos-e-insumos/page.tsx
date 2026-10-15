import type { Metadata } from "next";
import { ServiceDetails } from "@/components/sections/ServiceDetails";

export const metadata: Metadata = {
  title: "Equipos e insumos",
  description: "Equipos, insumos y tecnología para las unidades productivas, con asesoría en la compra.",
  alternates: { canonical: "/equipos-e-insumos" },
};

export default function Page() { return <ServiceDetails service="equipment" />; }
