"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { metodologia } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Metodologia() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const fill = root.current?.querySelector<HTMLElement>("[data-line-fill]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      if (!fill) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(fill, { scaleY: 0, transformOrigin: "top" });
        gsap.to(fill, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        });

        steps.forEach((step) => {
          const dot = step.querySelector<HTMLElement>("[data-dot]");
          gsap.fromTo(
            step,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 82%", once: true },
              onStart: () => dot?.classList.add("is-active"),
            },
          );
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(fill, { scaleY: 1, transformOrigin: "top" });
        gsap.set(steps, { opacity: 1, y: 0 });
        steps.forEach((s) =>
          s.querySelector("[data-dot]")?.classList.add("is-active"),
        );
      });

      return () => {
        mm.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: root },
  );

  return (
    <section id="metodologia" className="section-pad bg-[var(--color-bone)]">
      <div className="container-edge" ref={root}>
        <SectionHeading
          eyebrow={metodologia.eyebrow}
          title={metodologia.title}
          intro="Del dato al resultado: un método claro para que cada etapa aporte valor y quede documentada."
        />

        <div className="relative mt-16 pl-9">
          {/* Track de progreso */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-mineral-line)]"
            aria-hidden="true"
          >
            <span
              data-line-fill
              className="absolute inset-0 block w-px origin-top bg-[var(--color-clay)]"
            />
          </div>

          <ol className="flex flex-col gap-11">
            {metodologia.steps.map((step) => (
              <li key={step.phase} data-step className="relative">
                <span
                  data-dot
                  aria-hidden="true"
                  className="dot absolute left-[-2.15rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--color-mineral-line)] bg-[var(--color-bone)] transition-colors duration-500"
                />
                <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-clay)]">
                  {step.phase}
                </span>
                <h3 className="mt-2 text-[var(--step-2)] font-semibold text-[var(--color-ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[52ch] text-[var(--color-ink-soft)]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
