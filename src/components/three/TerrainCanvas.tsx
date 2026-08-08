"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { TerrainField } from "./TerrainField";

/**
 * Envoltura del <Canvas>. Se carga de forma diferida (dynamic import) y:
 *  - pausa el render cuando no está visible o la pestaña está oculta,
 *  - limita el device pixel ratio,
 *  - reduce calidad automáticamente si el rendimiento cae,
 *  - libera recursos al desmontar.
 */
export default function TerrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(true);
  const [lowPower, setLowPower] = useState(false);

  // Heurística inicial de dispositivo limitado.
  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    // Heurística de hardware disponible solo en cliente; sincronizar al montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cores <= 4 || (mem !== undefined && mem <= 4)) setLowPower(true);
  }, []);

  // Progreso de scroll [0..1] para evolucionar el relieve.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight || 1;
      progress.current = Math.min(Math.max(y / h, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pausa cuando no está en viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(!!entry?.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    const onVisibility = () =>
      setActive(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, lowPower ? 1.25 : 1.6]}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 1.05, 3.15], fov: 38 }}
        style={{ background: "transparent" }}
        aria-hidden="true"
      >
        <PerformanceMonitor onDecline={() => setLowPower(true)} />
        <AdaptiveDpr pixelated={false} />
        <TerrainField progressRef={progress} lowPower={lowPower} />
      </Canvas>
    </div>
  );
}
