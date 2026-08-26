"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/gsap";
import { hero, impacto } from "@/lib/content";
import { HeroVisual } from "@/components/three/HeroVisual";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const mm = gsap.matchMedia();

      // from() es auto-reversible al estado visible: si el efecto se limpia
      // (StrictMode) el contenido queda visible, nunca atascado en oculto.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          delay: 0.35,
        });
        tl.from("[data-hero-line]", {
          yPercent: 118,
          duration: 1.15,
          stagger: 0.12,
        }).from(
          "[data-hero-fade]",
          { opacity: 0, y: 16, duration: 0.8, stagger: 0.07 },
          "-=0.7",
        );

        // Seguridad: si el rAF se frena (pestaña en segundo plano), forzar el
        // estado final para que el contenido nunca quede oculto.
        const safety = window.setTimeout(() => tl.progress(1), 2800);
        return () => window.clearTimeout(safety);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="hero-section overflow-hidden bg-[var(--color-pine-900)] text-[var(--color-bone)]"
    >
      {/* Fondo: fotografía viva de paisaje agrícola + overlays de legibilidad */}
      <div className="absolute inset-0 z-0">
        <HeroVisual alt="Paisaje agrícola de Antioquia al atardecer" />
        {/* Oscurecido a la izquierda (donde va el texto) */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-pine-900)_68%,transparent)_0%,color-mix(in_srgb,var(--color-pine-900)_32%,transparent)_45%,transparent_78%)]" />
        {/* Base y cabecera */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-pine-900)_78%,transparent),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-pine-900)_55%,transparent),transparent)]" />
      </div>

      <div className="hero-person" aria-hidden="true">
        <Image
          src="/img/hero-person.png"
          alt=""
          width={1054}
          height={1492}
          fetchPriority="low"
          sizes="(max-width: 768px) 0px, 38vw"
          className="hero-person-image"
        />
      </div>

      <div className="container-edge hero-content relative z-10 flex w-full flex-1 flex-col">
        <div className="hero-editorial flex flex-1 flex-col justify-center">
          <h1 className="sr-only">
            JUZT — Ejecución de proyectos y planeación estratégica rural
          </h1>
          <div id="hero-brand" data-testid="hero-logo" className="hero-brand overflow-hidden">
            <div data-hero-line className="hero-brand-motion">
              <Image
                src="/brand/logo_juzt_hero_white.png"
                alt="JUZT — Just productivity"
                width={1983}
                height={793}
                priority
                sizes="(max-width: 640px) 86vw, 42vw"
                className="hero-brand-image"
              />
            </div>
          </div>

          <div className="hero-actions">
            <div data-hero-fade className="hero-copy-block">
              <span className="hero-copy-rule" aria-hidden="true" />
              <p className="hero-subcopy text-[color-mix(in_srgb,var(--color-bone)_86%,transparent)]">
                {hero.subtitle}
              </p>
            </div>
            <div data-hero-fade className="hero-cta-group">
              <a href={hero.primaryCta.href} className="hero-cta hero-cta-primary group">
                <span>{hero.primaryCta.label}</span>
                <span aria-hidden="true" className="hero-cta-arrow">↗</span>
              </a>
              <a href={hero.secondaryCta.href} className="hero-cta hero-cta-secondary group">
                <span>{hero.secondaryCta.label}</span>
                <span aria-hidden="true" className="hero-cta-arrow">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-edge hero-footer relative z-10 flex items-end justify-between gap-6">
        <ul data-hero-fade className="hero-impact" aria-label="Impacto de JUZT">
          {impacto.map((item) => (
            <li key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <a
          href="#proyectos"
          data-hero-fade
          className="hero-scroll hidden text-[color-mix(in_srgb,var(--color-bone)_58%,transparent)] lg:flex"
        >
          <span>Nuestros proyectos</span>
          <span className="hero-scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
