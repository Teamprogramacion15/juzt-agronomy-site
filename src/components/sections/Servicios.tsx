"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { servicios, epsea } from "@/lib/content";
import { registerGsap, gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Service = (typeof servicios)[number];

type ServiceScene = {
  kicker: string;
  title: string;
  image: string;
  imageAlt: string;
  tone: "light" | "dark";
  layerClass: string;
  reverse?: boolean;
  items: readonly [Service, Service];
};

const serviceScenes: readonly ServiceScene[] = [
  {
    kicker: "Estrategia y mercado",
    title: "Gestión que ordena. Mercado que conecta.",
    image: "/img/acompanamiento-campo.webp",
    imageAlt: "Consultores recorriendo una unidad productiva en las montañas",
    tone: "light",
    layerClass: "service-panel-layer-1",
    items: [servicios[0], servicios[1]],
  },
  {
    kicker: "Proyecto y asistencia",
    title: "Proyectos viables. Decisiones técnicas en campo.",
    image: "/img/parcelas-aereas.webp",
    imageAlt: "Vista aérea de parcelas y sistemas productivos agrícolas",
    tone: "dark",
    layerClass: "service-panel-layer-2",
    reverse: true,
    items: [servicios[2], servicios[3]],
  },
  {
    kicker: "Capital y oportunidades",
    title: "Financiación e inversión para crecer con criterio.",
    image: "/img/territorio-hero.webp",
    imageAlt: "Territorio agrícola de montaña con cultivos y caminos rurales",
    tone: "light",
    layerClass: "service-panel-layer-3",
    items: [servicios[4], servicios[5]],
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
      id="servicios"
      className="services-story"
      aria-labelledby="servicios-title"
    >
      <div data-services-intro className="services-intro">
        <div className="container-edge services-intro-layout">
          <div data-services-intro-copy className="services-intro-copy">
            <h2 id="servicios-title" className="services-intro-title">
              <span>Nuestros</span>
              <em>servicios</em>
            </h2>
            <div className="services-intro-description">
              <p>
                <strong>Seis capacidades conectadas.</strong>
                <span>
                  Una visión integral para ordenar, acompañar y hacer crecer
                  cada proyecto agro con criterio técnico.
                </span>
              </p>
            </div>
          </div>

          <a
            data-services-intro-copy
            href="#servicios-panel-1"
            className="services-intro-cue"
          >
            <span>Descubrir servicios</span>
            <span className="services-intro-cue-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>

      {serviceScenes.map((scene, sceneIndex) => {
        return (
          <article
            key={scene.kicker}
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
                  <span>Juzt</span>
                  <span>Productividad aplicada</span>
                </div>
              </div>

              <div className="service-content">
                <header data-service-copy className="service-scene-heading">
                  <h3 className="service-scene-title">
                    {scene.title}
                  </h3>
                </header>

                <div className="service-list">
                  {scene.items.map((service) => (
                    <section
                      key={service.id}
                      id={
                        service.id === "gestoria-inversion"
                          ? "oportunidades"
                          : service.id
                      }
                      data-service-copy
                      className="service-item"
                    >
                      <div className="service-item-copy">
                        <h4>{service.title}</h4>
                        <p className="service-item-summary">{service.summary}</p>
                      </div>

                      <div
                        className={cn(
                          "service-quality-seal",
                          service.sealVariant === "institutional" &&
                            "service-quality-seal-institutional",
                        )}
                      >
                        <div className="service-quality-seal-emblem">
                          {service.sealVariant === "original" ? (
                            <Image
                              src={service.sealImage}
                              alt={`Sello Juzt — ${service.title}`}
                              width={601}
                              height={624}
                              sizes="6rem"
                              className="service-quality-seal-image"
                              quality={90}
                            />
                          ) : (
                            <Image
                              src={service.sealImage}
                              alt=""
                              width={330}
                              height={196}
                              className="service-quality-seal-logo"
                              quality={90}
                            />
                          )}
                        </div>

                        <div className="service-quality-seal-copy">
                          <span>
                            {service.sealVariant === "original"
                              ? "Sello oficial"
                              : "Identidad institucional"}
                          </span>
                          <strong>{service.title}</strong>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}

      <div className="service-credential">
        <div className="container-edge service-credential-grid">
          <div className="service-credential-mark">
            <p className="service-credential-label">Sello de calidad</p>
            <p className="service-credential-code">{epsea.code}</p>
          </div>

          <div className="service-credential-copy">
            <h3>{epsea.title}</h3>
            <p>
              Juzt está habilitada como <strong>{epsea.code}</strong> mediante
              la <strong>Resolución {epsea.resolution}</strong> del{" "}
              {epsea.date} de la {epsea.agency} ({epsea.agencyShort}).
            </p>
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
