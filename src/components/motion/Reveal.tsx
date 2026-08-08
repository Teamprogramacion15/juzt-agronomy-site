"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retraso base en segundos. */
  delay?: number;
  /** Desplazamiento vertical inicial en px. */
  y?: number;
  /** Anima los hijos con [data-reveal-item] de forma escalonada. */
  stagger?: boolean;
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
  y = 24,
  stagger = false,
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
          ? el.querySelectorAll<HTMLElement>("[data-reveal-item]")
          : [el];

        gsap.from(targets, {
          opacity: 0,
          y,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
