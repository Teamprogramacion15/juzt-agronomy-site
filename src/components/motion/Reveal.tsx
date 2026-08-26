"use client";

import {
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/gsap";

type RevealProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  children: ReactNode;
  /** Retraso base en segundos. */
  delay?: number;
  /** Desplazamiento horizontal inicial en px. */
  x?: number;
  /** Desplazamiento vertical inicial en px. */
  y?: number;
  /** Escala inicial. Debe permanecer muy cerca de 1. */
  scale?: number;
  /** Duración de la entrada en segundos. */
  duration?: number;
  /** Anima los hijos con [data-reveal-item] de forma escalonada. */
  stagger?: boolean;
  /** Intervalo entre elementos escalonados. */
  staggerEach?: number;
};

/**
 * Revelado de entrada por scroll, coordinado con ScrollTrigger.
 * Respeta prefers-reduced-motion vía gsap.matchMedia: en ese modo el contenido
 * aparece de inmediato, sin pérdida de información.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 20,
  scale = 1,
  duration = 0.82,
  stagger = false,
  staggerEach = 0.07,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // from() se auto-revierte al estado visible: nunca deja contenido oculto.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger
          ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-item]"))
          : [el];

        if (!targets.length) return;

        gsap.from(targets, {
          opacity: 0,
          x,
          y,
          scale,
          duration,
          delay,
          ease: "power3.out",
          stagger: stagger ? staggerEach : 0,
          willChange: "transform, opacity",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onComplete: () => {
            gsap.set(targets, { clearProps: "transform,opacity,willChange" });
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={className}
      data-motion-reveal="true"
      data-motion-stagger={stagger ? "true" : "false"}
      {...props}
    >
      {children}
    </div>
  );
}
