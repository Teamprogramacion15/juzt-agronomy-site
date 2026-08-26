"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/gsap";

function signalReady() {
  if (typeof window === "undefined") return;
  window.__juztReady = true;
  window.dispatchEvent(new Event("juzt:ready"));
}

/**
 * Preloader de entrada (equivalente al del sitio de referencia).
 * Cortina con wordmark animado que se retira y dispara la animación del hero.
 * Con prefers-reduced-motion se omite por completo (contenido inmediato).
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      registerGsap();

      const finish = () => {
        signalReady();
        setDone(true);
      };

      // Mostrar solo una vez por sesión (mejor LCP en visitas repetidas).
      const alreadySeen =
        typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem("juzt:seen") === "1";
      if (alreadySeen) {
        finish();
        return;
      }
      try {
        sessionStorage.setItem("juzt:seen", "1");
      } catch {
        /* modo privado: ignorar */
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => finish());

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Backstop: si el rAF se detiene (pestaña oculta, dispositivo lento),
        // igual se revela el contenido.
        const backstop = window.setTimeout(finish, 4000);

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            window.clearTimeout(backstop);
            finish();
          },
        });

        tl.set(root.current, { autoAlpha: 1 })
          .from("[data-pre-mark]", { yPercent: 120, duration: 0.55 })
          .from("[data-pre-dot]", { scale: 0, opacity: 0, duration: 0.35 }, "-=0.15")
          .fromTo(
            "[data-pre-line]",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.55, ease: "power2.inOut" },
            "-=0.2",
          )
          .to("[data-pre-mark], [data-pre-dot]", {
            yPercent: -120,
            duration: 0.45,
            ease: "power3.in",
          })
          .to(
            root.current,
            { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
            "-=0.15",
          );

        return () => window.clearTimeout(backstop);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-pine-900)] opacity-0"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-baseline overflow-hidden">
          <span
            data-pre-mark
            className="inline-block font-[family-name:var(--font-display)] text-5xl font-semibold text-[var(--color-bone)]"
          >
            JUZT
          </span>
          <span
            data-pre-dot
            className="ml-1 inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-clay)]"
          />
        </div>
        <span
          data-pre-line
          className="block h-px w-40 origin-left bg-[color-mix(in_srgb,var(--color-bone)_40%,transparent)]"
        />
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-lime)]">
          Just productivity
        </span>
      </div>
    </div>
  );
}
