"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

// El canvas WebGL queda fuera del bundle crítico.
const LivingPhotoCanvas = dynamic(() => import("./LivingPhotoCanvas"), {
  ssr: false,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      (!!canvas.getContext("webgl2") || !!canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Fondo del hero: fotografía real de paisaje agrícola.
 *  - Base estática siempre presente (carga, sin WebGL, prefers-reduced-motion,
 *    conexiones lentas): la misma foto, nítida.
 *  - Si hay WebGL y no hay reduced-motion, encima se anima como "foto viva"
 *    (viento en el pasto, nubes derivando, parallax con el cursor).
 * La capa es decorativa; el contenido del hero vive en el DOM (ver Hero.tsx).
 */
export function HeroVisual({
  src = "/img/hero-paisaje.webp",
  alt = "",
}: {
  src?: string;
  alt?: string;
}) {
  const [live, setLive] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  const handleCanvasReady = useCallback(() => {
    setCanvasReady(true);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      (
        navigator as Navigator & {
          connection?: { saveData?: boolean };
        }
      ).connection?.saveData ?? false;
    // Detección de capacidades (WebGL/reduced-motion) solo en cliente.
    if (reduced || saveData || !supportsWebGL()) return;

    // La foto estática pinta primero. El motor 3D entra cuando el navegador
    // queda libre, sin competir con el logo, el retrato ni las tipografías.
    const start = () => setLive(true);
    const timeoutId = window.setTimeout(start, 700);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden={alt === "" ? true : undefined}>
      {!canvasReady ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
      ) : null}
      {live ? <LivingPhotoCanvas src={src} onReady={handleCanvasReady} /> : null}
    </div>
  );
}
