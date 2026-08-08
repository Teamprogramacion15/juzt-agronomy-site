import { ParallaxBand } from "./ParallaxBand";

export function AcompanamientoBand() {
  return (
    <ParallaxBand
      imageSrc="/img/acompanamiento-campo.webp"
      imageAlt="Profesionales en una visita técnica a un cultivo en Colombia"
      eyebrow="Acompañamiento"
      title="En campo, junto al productor"
      body="Nuestra asistencia técnica y el acompañamiento estratégico ocurren donde están las decisiones: en el sistema productivo, con datos y criterio interdisciplinario."
      cta={{ label: "Hablar con un consultor", href: "#contacto" }}
    />
  );
}
