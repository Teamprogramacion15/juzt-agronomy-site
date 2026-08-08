"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/gsap";

type SplitTextInstance = {
  lines: Element[];
  revert: () => void;
};

type Props = {
  children: ReactNode;
  className?: string;
  /** Retraso base del stagger. */
  delay?: number;
};

/**
 * Revela el primer bloque de texto interno por líneas (máscara + stagger),
 * al estilo SplitText de la referencia. El texto se parte tras cargar las
 * fuentes para evitar saltos de línea incorrectos.
 * Con prefers-reduced-motion el texto queda visible sin animación.
 */
export function SplitReveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      const target = el.querySelector<HTMLElement>("h1,h2,h3,h4,p,span");
      if (!target) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitTextInstance | undefined;
        let cancelled = false;

        const run = async () => {
          if (document.fonts?.ready) await document.fonts.ready;
          const { SplitText } = await import("gsap/SplitText");
          if (cancelled) return;
          gsap.registerPlugin(SplitText);
          split = new SplitText(target, { type: "lines", mask: "lines" });
          // from() se auto-revierte al estado visible: nunca deja texto oculto.
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 0.9,
            delay,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        };

        void run();

        return () => {
          cancelled = true;
          split?.revert();
        };
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
