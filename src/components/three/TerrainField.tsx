"use client";

/*
 * La mutación imperativa de uniforms y transformaciones dentro de useFrame es
 * el patrón estándar de react-three-fiber (no pasa por el render de React).
 * Desactivamos la regla del compilador solo para este archivo de escena 3D.
 */
/* eslint-disable react-hooks/immutability */

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  TERRAIN_VERTEX,
  TERRAIN_FRAGMENT,
  POINTS_VERTEX,
  POINTS_FRAGMENT,
} from "./shaders";

const c = (hex: string) => new THREE.Color(hex);

type Props = {
  /** Progreso de scroll [0..1] que hace evolucionar el relieve. */
  progressRef: RefObject<number>;
  /** Menos puntos y menor detalle en dispositivos limitados. */
  lowPower?: boolean;
};

export function TerrainField({ progressRef, lowPower = false }: Props) {
  const group = useRef<THREE.Group>(null);
  const segments = lowPower ? 96 : 160;
  const pointsPerSide = lowPower ? 28 : 40;

  const terrainMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: TERRAIN_VERTEX,
        fragmentShader: TERRAIN_FRAGMENT,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uLow: { value: c("#0c1338") },
          uHigh: { value: c("#2c3c86") },
          uContour: { value: c("#f3c73f") },
          uLine: { value: c("#4a5490") },
        },
      }),
    [],
  );

  const pointsGeometry = useMemo(() => {
    const count = pointsPerSide * pointsPerSide;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    let i = 0;
    for (let x = 0; x < pointsPerSide; x++) {
      for (let y = 0; y < pointsPerSide; y++) {
        positions[i * 3] = (x / (pointsPerSide - 1)) * 2 - 1;
        positions[i * 3 + 1] = (y / (pointsPerSide - 1)) * 2 - 1;
        positions[i * 3 + 2] = 0;
        // Semilla pseudoaleatoria determinista (evita Math.random en render y
        // mantiene el resultado estable entre servidor y cliente).
        const n = Math.sin(i * 12.9898) * 43758.5453;
        seeds[i] = n - Math.floor(n);
        i++;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [pointsPerSide]);

  const pointsMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: POINTS_VERTEX,
        fragmentShader: POINTS_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uSize: { value: lowPower ? 5 : 7 },
          uColor: { value: c("#34479a") },
          uColorHot: { value: c("#f4d15f") },
        },
      }),
    [lowPower],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = progressRef.current ?? 0;

    terrainMaterial.uniforms.uTime!.value = t;
    terrainMaterial.uniforms.uScroll!.value = p;
    pointsMaterial.uniforms.uTime!.value = t;
    pointsMaterial.uniforms.uScroll!.value = p;

    // Inclinación sutil siguiendo el cursor (sin marear).
    if (group.current) {
      const targetY = state.pointer.x * 0.16;
      const targetX = -1.12 + state.pointer.y * 0.06;
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        targetY,
        3,
        delta,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        targetX,
        3,
        delta,
      );
    }
  });

  return (
    <group ref={group} rotation={[-1.12, 0, 0]} scale={1.65} position={[0, -0.15, 0]}>
      <mesh material={terrainMaterial}>
        <planeGeometry args={[2, 2, segments, segments]} />
      </mesh>
      <points geometry={pointsGeometry} material={pointsMaterial} />
    </group>
  );
}
