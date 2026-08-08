"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/gsap";

/** Motivos line-art abstractos (cartográficos/técnicos) por servicio. */
const GLYPHS: Record<string, string[]> = {
  "gestion-administrativa": [
    "M10 14 H38",
    "M10 24 H30",
    "M10 34 H34",
    "M6 8 H42 V40 H6 Z",
  ],
  "comercializacion-agro": [
    "M8 18 H34 L28 12",
    "M40 30 H14 L20 36",
  ],
  "estructuracion-proyectos": [
    "M24 6 L42 16 L24 26 L6 16 Z",
    "M6 24 L24 34 L42 24",
    "M6 32 L24 42 L42 32",
  ],
  "consultoria-tecnica": [
    "M6 6 H42 V42 H6 Z",
    "M6 20 H42",
    "M22 6 V42",
    "M31 27 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0",
    "M37 33 L43 39",
  ],
  "soluciones-financieras": [
    "M8 40 V28",
    "M18 40 V22",
    "M28 40 V16",
    "M38 40 V10",
    "M6 22 L20 16 L30 22 L44 8",
  ],
  "gestoria-inversion": [
    "M12 12 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0",
    "M36 14 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0",
    "M24 36 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0",
    "M14 15 L33 33",
    "M34 17 L26 33",
    "M15 13 H33",
  ],
};

export function ServiceGlyph({ variant }: { variant: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const paths = GLYPHS[variant] ?? GLYPHS["gestion-administrativa"]!;

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      const targets = el.querySelectorAll<SVGPathElement>("path");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(targets, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.to(targets, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { strokeDashoffset: 0 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 48 48"
      className="h-10 w-10"
      fill="none"
      stroke="var(--color-pine)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength={1} />
      ))}
    </svg>
  );
}
