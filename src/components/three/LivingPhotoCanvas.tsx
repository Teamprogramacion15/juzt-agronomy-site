"use client";

/*
 * Sincronizaciones en montaje/observers (detección de WebGL/hardware, pausa por
 * visibilidad): setState al montar es intencional en este componente.
 */
/* eslint-disable react-hooks/set-state-in-effect */

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { LivingPhoto } from "./LivingPhoto";

/**
 * Envoltura del <Canvas> para la "foto viva" del hero. Se carga diferida y:
 *  - sigue el cursor a nivel de ventana (funciona aunque el texto esté encima),
 *  - pausa el render fuera de viewport / pestaña oculta,
 *  - limita el device pixel ratio y baja calidad si el rendimiento cae.
 */
export default function LivingPhotoCanvas({
  src,
  onReady,
}: {
  src: string;
  onReady: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [inViewport, setInViewport] = useState(true);
  const [pageVisible, setPageVisible] = useState(
    () => document.visibilityState === "visible",
  );
  const [lowPower, setLowPower] = useState(false);
  const active = inViewport && pageVisible;

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (cores <= 4 || (mem !== undefined && mem <= 4)) setLowPower(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [active]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInViewport(!!entry?.isIntersecting),
      { threshold: 0.02 },
    );
    io.observe(el);
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, lowPower ? 1.25 : 1.75]}
        gl={{
          alpha: true,
          antialias: false,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
        }}
        orthographic
        camera={{ position: [0, 0, 1] }}
        style={{ background: "transparent", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <PerformanceMonitor onDecline={() => setLowPower(true)} />
        <AdaptiveDpr pixelated={false} />
        <Suspense fallback={null}>
          <LivingPhoto
            src={src}
            mouseRef={mouse}
            lowPower={lowPower}
            onReady={onReady}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
