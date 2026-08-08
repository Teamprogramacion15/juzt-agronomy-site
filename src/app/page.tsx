import { Hero } from "@/components/sections/Hero";
import { CapacidadesBand } from "@/components/sections/CapacidadesBand";
import { Proposito } from "@/components/sections/Proposito";
import { Servicios } from "@/components/sections/Servicios";
import { Principios } from "@/components/sections/Principios";
import { Aliados } from "@/components/sections/Aliados";
import { Contacto } from "@/components/sections/Contacto";

export default function HomePage() {
  return (
    <>
      <div className="hero-services-stack">
        <Hero />
        <Servicios />
      </div>
      <CapacidadesBand />
      <Proposito />
      <Principios />
      <Aliados />
      <Contacto />
    </>
  );
}
