"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import { Reveal } from "@/components/motion/Reveal";
import { hero } from "@/lib/content";

const SLIDE_DURATIONS = [9_500, 10_500] as const;

function LaunchMark() {
  return (
    <span className="hero-launch-mark" aria-hidden="true">
      <span className="hero-launch-track">
        {[0, 1].map((item) => (
          <svg key={item} viewBox="0 0 16 16" focusable="false">
            <path d="M4 12 12 4M6 4h6v6" />
          </svg>
        ))}
      </span>
    </span>
  );
}

function SliderArrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={direction === "previous" ? "is-reversed" : undefined}
    >
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
  );
}

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const paused = userPaused || interactionPaused || reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(media.matches);
    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const handleVisibility = () => setInteractionPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (paused) return;

    const timeout = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % 2);
      setCycle((current) => current + 1);
    }, SLIDE_DURATIONS[activeSlide]);

    return () => window.clearTimeout(timeout);
  }, [activeSlide, cycle, paused]);

  const goToSlide = (nextSlide: number) => {
    setActiveSlide((nextSlide + 2) % 2);
    setCycle((current) => current + 1);
  };

  const progressStyle = {
    "--hero-slide-duration": `${SLIDE_DURATIONS[activeSlide]}ms`,
  } as CSSProperties;

  return (
    <section
      className="consulting-hero"
      id="top"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Presentación de JUZT"
      data-active-slide={activeSlide + 1}
    >
      <div className="hero-cartography" aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="none" focusable="false">
          <g className="hero-contour-lines">
            <path d="M-112 785C95 681 245 741 416 681C586 621 699 528 891 570C1015 597 1125 579 1247 518" />
            <path d="M-98 829C118 730 270 791 445 731C620 671 737 582 918 620C1046 647 1166 627 1295 568" />
            <path d="M-78 870C149 783 301 839 481 785C665 730 784 644 956 675C1094 700 1213 677 1346 620" />
          </g>
          <g className="hero-survey-marks">
            <path d="M132 174h52m-26-26v52M720 94h34m-17-17v34M944 760h44m-22-22v44" />
            <path d="M1062 128h198M1062 128v74M322 560h112M322 560v58" />
            <path d="M1098 116v24m42-24v24m42-24v24m42-24v24" />
          </g>
        </svg>
      </div>

      <div className="hero-slider-stage">
        <div
          className={`hero-slide hero-slide-consulting ${activeSlide === 0 ? "is-active" : "is-inactive"}`}
          aria-hidden={activeSlide !== 0}
        >
          <div className="section-shell hero-editorial">
            <div className="hero-main">
              <Reveal className="hero-copy" stagger y={18} duration={0.78}>
                <h1 aria-label={hero.title}>
                  <span data-reveal-item>Convertimos</span>
                  <span data-reveal-item>oportunidades</span>
                  <em data-reveal-item>en resultados.</em>
                </h1>

                <p className="hero-lede" data-reveal-item>{hero.subtitle}</p>
                <div className="hero-links" data-reveal-item>
                  <a
                    href={hero.primaryCta.href}
                    className="text-link text-link-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={activeSlide === 0 ? 0 : -1}
                  >
                    {hero.primaryCta.label} <LaunchMark />
                  </a>
                  <Link
                    href={hero.secondaryCta.href}
                    className="text-link"
                    tabIndex={activeSlide === 0 ? 0 : -1}
                  >
                    {hero.secondaryCta.label} <LaunchMark />
                  </Link>
                </div>
              </Reveal>

              <Reveal
                className="hero-visual"
                y={0}
                scale={0.985}
                delay={0.08}
                duration={1}
              >
                <div className="hero-territory-layer" aria-hidden="true">
                  <Image
                    src="/img/hero-territory-hq.webp"
                    alt=""
                    fill
                    className="hero-territory-photo"
                    sizes="(max-width: 899px) 92vw, 47vw"
                    quality={90}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <svg
                  className="hero-visual-field"
                  viewBox="0 0 720 760"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="hero-field-light" cx="0.72" cy="0.18" r="0.66">
                      <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
                      <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <path
                    className="hero-field-surface"
                    d="M106 20C64 54 40 112 30 184C20 260 44 326 24 400C2 482 20 592 70 670C98 714 142 738 198 736L664 724C694 723 716 698 716 668V68C716 34 689 14 655 16C540 24 469 44 375 26C272 6 175-8 106 20Z"
                    fill="transparent"
                  />
                  <path
                    d="M106 20C64 54 40 112 30 184C20 260 44 326 24 400C2 482 20 592 70 670C98 714 142 738 198 736L664 724C694 723 716 698 716 668V68C716 34 689 14 655 16C540 24 469 44 375 26C272 6 175-8 106 20Z"
                    fill="url(#hero-field-light)"
                  />
                  <path
                    className="hero-field-outline"
                    d="M122 52C84 83 62 132 54 194C45 263 67 326 48 404C29 480 45 573 88 640C113 679 151 701 201 700L646 690C665 690 680 674 680 654V86C680 66 664 52 643 53C534 61 464 79 372 61C273 42 184 28 122 52Z"
                  />
                </svg>
                <Image
                  src="/brand/logo_juzt_hero_white.webp"
                  alt=""
                  width={1983}
                  height={793}
                  className="hero-brand-backdrop"
                  sizes="(max-width: 899px) 92vw, 47vw"
                  aria-hidden="true"
                />
                <div className="hero-person-composite">
                  <Image
                    src="/img/hero-person-integrated.webp"
                    alt="Profesional de JUZT"
                    width={1054}
                    height={1492}
                    className="hero-person"
                    sizes="(max-width: 899px) 78vw, 34vw"
                    quality={90}
                    preload
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div
          className={`hero-slide hero-slide-equipment ${activeSlide === 1 ? "is-active" : "is-inactive"}`}
          aria-hidden={activeSlide !== 1}
        >
          <div className="section-shell equipment-hero">
            <div className="equipment-collage">
              <div className="equipment-collage-frame">
                <Image
                  src="/img/hero-equipos-integrated-v2.webp"
                  alt="Motoazada, ahoyador, biotrituradora y transporter de JUZT integrados en terrazas de territorio"
                  fill
                  sizes="(max-width: 899px) 92vw, 48vw"
                  className="equipment-collage-image"
                  quality={90}
                  loading="eager"
                />
              </div>
            </div>

            <div className="equipment-copy">
              <h2>
                <span>Equipos que ponen</span>
                <span>la productividad</span>
                <em>en movimiento.</em>
              </h2>
              <p>
                Maquinaria seleccionada para trabajar el territorio con respaldo,
                asesoría y cobertura nacional.
              </p>
              <a
                href="https://juztmaquinaria.lovable.app/"
                className="text-link equipment-store-link"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={activeSlide === 1 ? 0 : -1}
              >
                Conoce el catálogo <LaunchMark />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-slider-controls" aria-label="Controles de la presentación">
        <button
          type="button"
          className="hero-slider-arrow"
          onClick={() => goToSlide(activeSlide - 1)}
          aria-label="Ver slide anterior"
        >
          <SliderArrow direction="previous" />
        </button>

        <div className="hero-slider-dots" style={progressStyle}>
          {["Consultoría", "Equipos e insumos"].map((label, index) => (
            <button
              key={label}
              type="button"
              className={activeSlide === index ? "is-active" : undefined}
              onClick={() => goToSlide(index)}
              aria-label={`Ver slide ${index + 1}: ${label}`}
              aria-current={activeSlide === index ? "true" : undefined}
            >
              <span className="hero-slider-dot-track" aria-hidden="true">
                {activeSlide === index && (
                  <span
                    key={`${activeSlide}-${cycle}`}
                    className="hero-slider-dot-progress"
                    data-paused={paused ? "true" : "false"}
                  />
                )}
              </span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="hero-slider-pause"
          onClick={() => setUserPaused((current) => !current)}
          aria-label={userPaused ? "Reanudar presentación" : "Pausar presentación"}
          aria-pressed={userPaused}
        >
          {userPaused ? (
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5 7 5-7 5Z" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10" /></svg>
          )}
        </button>

        <button
          type="button"
          className="hero-slider-arrow"
          onClick={() => goToSlide(activeSlide + 1)}
          aria-label="Ver siguiente slide"
        >
          <SliderArrow direction="next" />
        </button>
      </div>

      <p className="hero-slider-status" aria-live="polite" aria-atomic="true">
        Slide {activeSlide + 1} de 2: {activeSlide === 0 ? "Consultoría" : "Equipos e insumos"}
      </p>
    </section>
  );
}
