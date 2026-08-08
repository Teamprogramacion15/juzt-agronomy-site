import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Props = {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  body?: string;
  cta?: { label: string; href: string };
  priority?: boolean;
  /** Alineación del contenido. */
  align?: "left" | "center";
  className?: string;
  id?: string;
};

/**
 * Banda full-bleed con imagen de fondo y parallax (`data-speed`, activado por
 * ScrollSmoother). El texto se revela con SplitText. La imagen es decorativa
 * de apoyo; el mensaje vive en HTML semántico.
 */
export function ParallaxBand({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  body,
  cta,
  priority = false,
  align = "left",
  className,
  id,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate flex min-h-[78svh] items-center overflow-hidden bg-[var(--color-pine-900)]",
        className,
      )}
    >
      {/* Imagen con overscan para el parallax */}
      <div className="absolute inset-[-14%] -z-20" data-parallax>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overlay para legibilidad */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-pine-900)_86%,transparent)_0%,color-mix(in_srgb,var(--color-pine-900)_60%,transparent)_45%,color-mix(in_srgb,var(--color-pine-900)_28%,transparent)_100%)]"
        aria-hidden="true"
      />

      <div className="container-edge relative w-full py-24">
        <div
          className={cn(
            "max-w-[46rem]",
            align === "center" && "mx-auto text-center",
          )}
        >
          <Reveal>
            <Eyebrow className="mb-5 [&::before]:bg-[var(--color-lime)]">
              {eyebrow}
            </Eyebrow>
          </Reveal>

          <SplitReveal>
            <h2 className="headline-2 text-[var(--color-bone)]">{title}</h2>
          </SplitReveal>

          {body ? (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[46ch] text-[var(--step-1)] text-[color-mix(in_srgb,var(--color-bone)_82%,transparent)]">
                {body}
              </p>
            </Reveal>
          ) : null}

          {cta ? (
            <Reveal delay={0.15} className="mt-8">
              <Button href={cta.href} size="lg" variant="light">
                {cta.label}
              </Button>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
