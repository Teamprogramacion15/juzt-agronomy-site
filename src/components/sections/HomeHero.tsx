"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  useRef,
} from "react";
import { hero } from "@/lib/content";
import equipmentStyles from "./EquipmentHero.module.css";

const SLIDE_DURATIONS = [8_000, 8_000] as const;

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
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const paused = interactionPaused || reducedMotion;

  useEffect(() => {
    const image = heroImageRef.current;
    if (image?.complete && image.naturalWidth > 0) setImageReady(true);
  }, []);

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
              <div className="hero-copy">
                <h1 aria-label={hero.title}>
                  <span>Convertimos</span>
                  <strong>oportunidades</strong>
                  <strong>en resultados</strong>
                </h1>

                <p className="hero-lede">{hero.subtitle}</p>
                <div className="hero-links">
                  <a
                    href={hero.primaryCta.href}
                    className="text-link text-link-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={activeSlide === 0 ? 0 : -1}
                  >
                    {hero.primaryCta.label} <span className="hero-cta-arrow" aria-hidden="true">→</span>
                  </a>
                  <Link
                    href={hero.secondaryCta.href}
                    className="text-link"
                    tabIndex={activeSlide === 0 ? 0 : -1}
                  >
                    {hero.secondaryCta.label}
                  </Link>
                </div>
              </div>

              {/* The framed photo waits for its pixels, so its entrance is never half over when it appears. */}
              <div className="hero-visual" data-image-ready={imageReady}>
                <noscript>
                  <style>{".hero-reference-person{animation:none!important}"}</style>
                </noscript>
                <Image
                  ref={heroImageRef}
                  onLoad={() => setImageReady(true)}
                  src="/img/home-slide-1-field.webp"
                  alt="Equipo de JUZT junto a productores rurales en una jornada de campo"
                  width={1909}
                  height={1441}
                  className="hero-reference-person"
                  sizes="(max-width: 899px) 90vw, 52vw"
                  quality={100}
                  preload
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`hero-slide hero-slide-equipment ${activeSlide === 1 ? "is-active" : "is-inactive"}`}
          aria-hidden={activeSlide !== 1}
        >
          <div className={equipmentStyles.slide}>
            <div className={equipmentStyles.composition}>
              <div className={equipmentStyles.scene}>
                <Image
                  src="/img/home-slide-2-equipment.webp"
                  alt="Trabajadores usando un transporter, una motoazada y un ahoyador en el campo"
                  fill
                  sizes="(max-width: 699px) 100vw, 55vw"
                  className={equipmentStyles.sceneImage}
                  unoptimized
                  loading="eager"
                  fetchPriority="low"
                />
            </div>

            <div className={equipmentStyles.copy}>
              <div className={equipmentStyles.logo}>
                <Image src="/brand/logo_juzt.png" alt="JUZT" width={364} height={115} sizes="20vw" />
              </div>
              <h2 className={equipmentStyles.heading}>
                <span className={equipmentStyles.firstLine}>Equipos <span>que ponen la</span></span>
                <span>productividad</span>
                <span className={equipmentStyles.blueLine}>en movimiento</span>
              </h2>
              <p className={equipmentStyles.description}>
                Maquinaria seleccionada para trabajar el territorio con<br className={equipmentStyles.desktopBreak} />
                <strong> respaldo, asesoría y cobertura nacional.</strong>
              </p>
              <a
                href="https://juztmaquinaria.lovable.app/"
                className={equipmentStyles.catalogLink}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={activeSlide === 1 ? 0 : -1}
              >
                Conoce nuestro catálogo <span aria-hidden="true">→</span>
              </a>
            </div>
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
