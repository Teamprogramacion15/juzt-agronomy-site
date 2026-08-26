"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { proyectos, epsea } from "@/lib/content";
import { registerGsap, gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ProjectScene = (typeof proyectos)[number] & {
  tone: "light" | "dark";
  layerClass: string;
  reverse?: boolean;
};

const projectScenes: readonly ProjectScene[] = [
  {
    ...proyectos[0],
    tone: "light",
    layerClass: "service-panel-layer-1",
  },
  {
    ...proyectos[1],
    tone: "dark",
    layerClass: "service-panel-layer-2",
    reverse: true,
  },
  {
    ...proyectos[2],
    tone: "light",
    layerClass: "service-panel-layer-3",
  },
] as const;

export function Servicios() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = root.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(max-width: 63.99rem) and (prefers-reduced-motion: no-preference)",
        () => {
        const intro = section.querySelector<HTMLElement>(
          "[data-services-intro]",
        );
        const introCopy = section.querySelectorAll<HTMLElement>(
          "[data-services-intro-copy]",
        );

        if (!intro || !introCopy.length) return;

        gsap.from(introCopy, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 68%",
            once: true,
          },
        });
        },
      );

      mm.add(
        "(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = gsap.utils.toArray<HTMLElement>(
            section.querySelectorAll("[data-service-panel]"),
          );
          const firstPanel = panels[0];
          const heroSection = document.getElementById("top");
          const servicesIntro = section.querySelector<HTMLElement>(
            "[data-services-intro]",
          );
          const heroCopy = document.querySelectorAll<HTMLElement>(
            "#hero-brand, #top .hero-actions, #top .hero-footer",
          );
          const introCopy = section.querySelectorAll<HTMLElement>(
            "[data-services-intro-copy]",
          );

          if (servicesIntro && heroCopy.length && introCopy.length) {
            const transition = gsap.timeline({
              scrollTrigger: {
                trigger: servicesIntro,
                start: "top bottom",
                end: "top 54%",
                scrub: 0.3,
              },
            });

            transition
              .to(
                heroCopy,
                {
                  autoAlpha: 0,
                  y: -28,
                  duration: 0.4,
                  stagger: 0.025,
                  ease: "none",
                },
                0,
              )
              .fromTo(
                introCopy,
                {
                  autoAlpha: 0,
                  y: 30,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.38,
                  stagger: 0.05,
                  ease: "none",
                },
                0.56,
              );
          }

          if (firstPanel && heroSection) {
            gsap.fromTo(
              heroSection,
              {
                scale: 1,
                filter: "brightness(1) saturate(1)",
              },
              {
                scale: 0.97,
                filter: "brightness(0.68) saturate(0.86)",
                transformOrigin: "center top",
                ease: "none",
                scrollTrigger: {
                  trigger: firstPanel,
                  start: "top bottom",
                  end: "top top",
                  scrub: 0.55,
                },
              },
            );
          }

          panels.forEach((panel, index) => {
            const shell = panel.querySelector<HTMLElement>(
              "[data-service-shell]",
            );
            const image = panel.querySelector<HTMLElement>(
              "[data-service-media-image]",
            );
            const copy = panel.querySelectorAll<HTMLElement>(
              "[data-service-copy]",
            );

            if (shell) {
              gsap.fromTo(
                shell,
                {
                  scale: 0.955,
                  borderRadius: "2rem 2rem 0 0",
                },
                {
                  scale: 1,
                  borderRadius: "0rem 0rem 0 0",
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.55,
                  },
                },
              );
            }

            if (image) {
              gsap.fromTo(
                image,
                { scale: 1.12 },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.65,
                  },
                },
              );
            }

            if (copy.length) {
              gsap.fromTo(
                copy,
                { opacity: 0.32, y: 44 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.08,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    start: "top 88%",
                    end: "top 22%",
                    scrub: 0.55,
                  },
                },
              );
            }

            const nextPanel = panels[index + 1];

            if (nextPanel && shell) {
              gsap.fromTo(
                shell,
                {
                  scale: 1,
                  y: 0,
                  filter: "brightness(1) saturate(1)",
                },
                {
                  scale: 0.965,
                  y: -18,
                  filter: "brightness(0.72) saturate(0.88)",
                  transformOrigin: "center top",
                  ease: "none",
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: nextPanel,
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.55,
                  },
                },
              );
            }
          });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="proyectos"
      className="services-story"
      aria-labelledby="proyectos-title"
    >
      <div data-services-intro className="services-intro">
        <div className="container-edge services-intro-layout">
          <div data-services-intro-copy className="services-intro-copy">
            <h2 id="proyectos-title" className="services-intro-title">
              <span>Nuestros</span>
              <em>proyectos</em>
            </h2>
            <div className="services-intro-description">
              <p>
                <strong>Tres líneas integradas.</strong>
                <span>
                  Estructuramos, fortalecemos y acompañamos iniciativas que
                  buscan resultados sostenibles en el territorio.
                </span>
              </p>
            </div>
          </div>

          <a
            data-services-intro-copy
            href="#servicios-panel-1"
            className="services-intro-cue"
          >
            <span>Descubrir proyectos</span>
            <span className="services-intro-cue-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>

      {projectScenes.map((scene, sceneIndex) => {
        return (
          <article
            key={scene.id}
            id={`servicios-panel-${sceneIndex + 1}`}
            data-service-panel
            className={cn(
              "service-panel",
              scene.tone === "dark"
                ? "service-panel-dark"
                : "service-panel-light",
              scene.layerClass,
              scene.reverse && "service-panel-reverse",
            )}
          >
            <div data-service-shell className="service-panel-shell">
              <div className="service-media">
                <Image
                  data-service-media-image
                  src={scene.image}
                  alt={scene.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="service-media-image"
                  quality={90}
                />
                <div className="service-media-shade" aria-hidden="true" />
                <div className="service-media-caption">
                  <span>JUZT · {scene.index}</span>
                  <span>{scene.kicker}</span>
                </div>
              </div>

              <div className="service-content">
                <header data-service-copy className="service-scene-heading">
                  <p className="service-scene-kicker">{scene.kicker}</p>
                  <h3 className="service-scene-title">
                    {scene.title}
                  </h3>
                </header>

                <div className="service-list">
                  <section id={scene.id} data-service-copy className="service-item">
                    <div className="service-item-copy">
                      <p className="service-item-summary">{scene.summary}</p>
                      <p className="service-item-detail">{scene.detail}</p>
                    </div>

                    <div className="service-outcome">
                      <span>Resultado esperado</span>
                      <strong>{scene.outcome}</strong>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </article>
        );
      })}

      <div className="service-credential">
        <div className="container-edge service-credential-grid">
          <div className="service-credential-mark">
            <p className="service-credential-label">Habilitación institucional</p>
            <p className="service-credential-code">{epsea.code}</p>
          </div>

          <div className="service-credential-copy">
            <h3>{epsea.title}</h3>
            <p>
              JUZT está habilitada como <strong>{epsea.code}</strong> mediante
              la <strong>Resolución {epsea.resolution}</strong> del{" "}
              {epsea.date} de la {epsea.agency} ({epsea.agencyShort}).
            </p>
            <p>{epsea.body}</p>
          </div>

          <aside
            className="service-credential-proof"
            aria-label={`Resolución ${epsea.resolution}, ${epsea.date}, ${epsea.agency}`}
          >
            <p className="service-credential-proof-label">Resolución vigente</p>
            <p className="service-credential-proof-number">
              {epsea.resolution}
            </p>
            <p className="service-credential-proof-date">{epsea.date}</p>
            <p className="service-credential-proof-agency">
              {epsea.agency} <span>({epsea.agencyShort})</span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
