import Image from "next/image";
import { aliados } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * El sitio original incluye una sección "Nuestros Aliados" pero no expone
 * nombres ni logotipos verificables. No se inventan aliados: se dejan espacios
 * intencionales listos para incorporar los logotipos reales.
 * → Colocar los SVG/PNG de aliados en /public/aliados y mapearlos aquí.
 */
export function Aliados() {
  return (
    <section id="aliados" className="allies-section bg-[var(--color-bone)]">
      <div className="container-edge">
        <SectionHeading
          eyebrow="Nuestros aliados"
          title="Relacionamiento estratégico que abre oportunidades"
          intro="Trabajamos en red con actores de la cadena agroalimentaria y con organizaciones que comparten nuestra visión de productividad."
        />

        <Reveal
          stagger
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-dashed border-[var(--color-mineral-line)] bg-[var(--color-mineral-line)] sm:grid-cols-3"
        >
          {aliados.map((aliado) => (
            <div
              key={aliado.name}
              data-reveal-item
              className="flex min-h-28 items-center justify-center bg-[var(--color-bone)] p-5 sm:p-6"
            >
              <Image
                src={aliado.image}
                alt={aliado.name}
                width={250}
                height={100}
                className="h-auto max-h-16 w-full max-w-[12rem] object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-4">
          <p className="text-sm text-[var(--color-mineral)]">
            ¿Su organización quiere ser aliada de Juzt?{" "}
            <a
              href="#contacto"
              className="text-[var(--color-pine)] underline decoration-[var(--color-clay)] decoration-2 underline-offset-4 hover:text-[var(--color-clay)]"
            >
              Conversemos
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
