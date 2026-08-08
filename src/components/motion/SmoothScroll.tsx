"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll suave + motor de scroll para las animaciones, con el mismo montaje
 * que el sitio de referencia: Lenis (scroll nativo suavizado) conectado a
 * ScrollTrigger. Lenis mueve el scroll real de la ventana, así que ScrollTrigger
 * funciona sin `scroller` personalizado (más fiable que ScrollSmoother).
 *
 * - Respeta prefers-reduced-motion (sin suavizado; los reveals quedan visibles).
 * - `ScrollTrigger.refresh()` tras cargar fuentes/recursos para posiciones OK.
 * - Parallax de `[data-parallax]` mediante ScrollTrigger con scrub.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | undefined;
    const rafCb = (time: number) => lenis?.raf(time * 1000);

    if (!reduced) {
      // El bucle rAF lo maneja gsap.ticker (patrón oficial Lenis + GSAP).
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(rafCb);
      gsap.ticker.lagSmoothing(0);
    }

    // Enlaces internos con desplazamiento suave respetando el header fijo.
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -84 });
      else el.scrollIntoView({ behavior: "auto", block: "start" });
    };
    document.addEventListener("click", onClick);

    // Parallax por scroll (reemplaza data-speed de ScrollSmoother).
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    // Recalcular posiciones cuando todo está listo.
    const refresh = () => {
      // Un refresh tardío puede restaurar la posición que GSAP registró al
      // montar. Si el visitante ya empezó a navegar, conservamos su scroll.
      if (window.scrollY <= 8) ScrollTrigger.refresh();
      else ScrollTrigger.update();
    };
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 700);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
      if (lenis) {
        gsap.ticker.remove(rafCb);
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
