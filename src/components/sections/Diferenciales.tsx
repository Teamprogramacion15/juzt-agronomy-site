import Image from "next/image";
import { diferenciales } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const differentialImages = [
  "/original/diferencial-1.png",
  "/original/diferencial-2.png",
  "/original/diferencial-3.png",
  "/original/diferencial-4.png",
  "/original/diferencial-5.png",
  "/original/diferenciales.png",
] as const;

export function Diferenciales() {
  return (
    <section id="diferenciales" className="section-pad relative isolate overflow-hidden bg-[var(--color-pine-900)]">
      {/* Textura de suelo como fondo material sutil */}
      <Image
        src="/img/suelo-textura.webp"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover opacity-[0.10] mix-blend-luminosity"
      />
      <div className="container-edge relative">
        <SectionHeading
          eyebrow="Nuestros diferenciales"
          title="Por qué las decisiones técnicas se traducen en resultados"
          tone="bone"
        />

        <Reveal
          stagger
          className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {diferenciales.map((d, i) => (
            <div
              key={d.title}
              data-reveal-item
              className="flex flex-col gap-3 border-t border-white/12 pt-5"
            >
              <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-lime)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-3">
                <Image
                  src={differentialImages[i] ?? differentialImages[5]}
                  alt=""
                  width={56}
                  height={56}
                  className="h-11 w-11 rounded-md bg-[var(--color-bone)] object-contain p-1"
                />
                <h3 className="text-[var(--step-1)] font-semibold text-[var(--color-bone)]">
                  {d.title}
                </h3>
              </div>
              <p className="text-[color-mix(in_srgb,var(--color-bone)_72%,transparent)]">
                {d.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
