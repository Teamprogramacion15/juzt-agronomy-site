"use client";

/*
 * La mutación imperativa de uniforms dentro de useFrame es el patrón estándar
 * de react-three-fiber (no pasa por el render de React).
 */
/* eslint-disable react-hooks/immutability */

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { PHOTO_VERTEX, PHOTO_FRAGMENT } from "./heroPhotoShaders";

type Props = {
  src: string;
  /** Posición del cursor normalizada (-1..1). */
  mouseRef: RefObject<{ x: number; y: number }>;
  lowPower?: boolean;
  onReady?: () => void;
};

export function LivingPhoto({
  src,
  mouseRef,
  lowPower = false,
  onReady,
}: Props) {
  const texture = useTexture(src);
  const smoothed = useRef(new THREE.Vector2(0, 0));

  const material = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = 4;

    const img = texture.image as { width?: number; height?: number } | undefined;
    const aspect = (img?.width ?? 16) / (img?.height ?? 9);

    return new THREE.ShaderMaterial({
      vertexShader: PHOTO_VERTEX,
      fragmentShader: PHOTO_FRAGMENT,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTex: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uImageAspect: { value: aspect },
        uViewAspect: { value: 1 },
        uIntensity: { value: lowPower ? 0.55 : 1 },
      },
    });
  }, [texture, lowPower]);

  useEffect(() => {
    onReady?.();
  }, [onReady, texture]);

  useFrame((state, delta) => {
    const u = material.uniforms;
    u.uTime!.value = state.clock.elapsedTime;
    u.uViewAspect!.value = state.size.width / Math.max(state.size.height, 1);

    const target = mouseRef.current ?? { x: 0, y: 0 };
    smoothed.current.x = THREE.MathUtils.damp(smoothed.current.x, target.x, 3, delta);
    smoothed.current.y = THREE.MathUtils.damp(smoothed.current.y, target.y, 3, delta);
    (u.uMouse!.value as THREE.Vector2).set(smoothed.current.x, smoothed.current.y);
  });

  // Plano 2×2 en espacio de recorte (el vertex escribe gl_Position directo).
  // frustumCulled=false evita que la cámara lo descarte.
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
