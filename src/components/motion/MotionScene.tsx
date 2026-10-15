"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ENTRANCE_ROOT_MARGIN, ENTRANCE_THRESHOLDS, isPresented, startsBelowFold } from "./viewport";

const profiles = {
  title: { transform: "translateY(24px)", duration: 720, opacity: 0.12 },
  image: { transform: "translate(28px, 36px) scale(0.92) rotate(-2deg)", settle: "translateY(-3px) scale(1.01) rotate(0.2deg)", duration: 1050, opacity: 0.08 },
  portrait: { transform: "translateY(38px) scale(0.93) rotate(1.5deg)", settle: "translateY(-3px) scale(1.005)", duration: 980, opacity: 0.1 },
  editorial: { transform: "translateX(-20px)", duration: 720, opacity: 0.18 },
  card: { transform: "translateY(18px)", duration: 760, opacity: 0.22 },
  quiet: { transform: "translateY(7px)", duration: 640, opacity: 0.35 },
} as const;

/** Separate entrance/exit observers; only selected elements move, with no scroll loop. */
export function MotionScene({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!scene || preference.matches || !scene.animate || !("IntersectionObserver" in window)) return;

    const elements = Array.from(scene.querySelectorAll<HTMLElement>("[data-motion]")).filter((element) => element.closest("[data-motion-scene]") === scene);
    const seen = new WeakSet<HTMLElement>();
    const eligible = new WeakSet<HTMLElement>();
    const loading = new WeakSet<HTMLElement>();
    let stopped = false;
    const exiting = new WeakSet<HTMLElement>();
    const animations = new Map<HTMLElement, Animation>();
    const baseTransforms = new Map(elements.map((element) => [element, getComputedStyle(element).transform]));

    const animate = (element: HTMLElement, frames: Keyframe[], duration: number, delay = 0, persist = false) => {
      animations.get(element)?.cancel();
      const animation = element.animate(frames, {
        duration, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both",
      });
      animations.set(element, animation);
      void animation.finished.then(() => {
        if (!persist && animations.get(element) === animation) {
          animation.cancel();
          animations.delete(element);
        }
      }).catch(() => {});
    };

    const enter = async (element: HTMLElement) => {
      if (seen.has(element) || loading.has(element)) return;
      loading.add(element);
      // A lazy-loaded photograph must be painted before its entrance can start.
      await Promise.allSettled(Array.from(element.querySelectorAll("img")).map((image) => image.decode()));
      loading.delete(element);
      if (stopped || !eligible.has(element) || seen.has(element)) return;
      seen.add(element);
      element.style.opacity = "";
      const base = baseTransforms.get(element) ?? "none";
      const suffix = base === "none" ? "" : ` ${base}`;
      const profile = profiles[element.dataset.motion as keyof typeof profiles] ?? profiles.quiet;
      const frames: Keyframe[] = [
        { opacity: profile.opacity, transform: profile.transform + suffix, offset: 0 },
      ];
      if ("settle" in profile) frames.push({ opacity: 1, transform: profile.settle + suffix, offset: 0.78 });
      frames.push({ opacity: 1, transform: base, offset: 1 });
      animate(element, frames, profile.duration, Math.min(Number(element.dataset.motionDelay) || 0, 140));
    };

    const entranceObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (isPresented(entry)) {
          eligible.add(element);
          void enter(element);
        } else if (!entry.isIntersecting) {
          eligible.delete(element);
        }
      }
    }, { rootMargin: ENTRANCE_ROOT_MARGIN, threshold: ENTRANCE_THRESHOLDS });

    // Exits use the actual viewport, independently of the later entrance point.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        const base = baseTransforms.get(element) ?? "none";
        const suffix = base === "none" ? "" : ` ${base}`;
        if (entry.isIntersecting && entry.intersectionRatio > 0.08) {
          if (exiting.has(element) && entry.intersectionRatio >= 0.15) {
            const style = getComputedStyle(element);
            exiting.delete(element);
            animate(element, [{ opacity: style.opacity, transform: style.transform }, { opacity: 1, transform: base }], 240);
          }
        } else if (seen.has(element) && !exiting.has(element) && element.dataset.motionExit === "true") {
          // Only the last sliver at the viewport edge fades; never an active link or input.
          if (element.contains(document.activeElement)) continue;
          exiting.add(element);
          const direction = entry.boundingClientRect.top < 0 ? -1 : 1;
          animate(element, [
            { opacity: 1, transform: base },
            { opacity: 0.7, transform: `translateY(${direction * 6}px)` + suffix },
          ], 280, 0, true);
        }
      }
    }, { threshold: [0, 0.08, 0.15] });
    elements.forEach((element) => {
      // Offscreen elements wait hidden, so the entrance is never preceded by a flash of the final state.
      if (startsBelowFold(element)) element.style.opacity = "0";
      entranceObserver.observe(element);
      observer.observe(element);
    });

    const stop = () => {
      stopped = true;
      entranceObserver.disconnect();
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      elements.forEach((element) => { element.style.opacity = ""; });
    };
    const change = () => { if (preference.matches) stop(); };
    preference.addEventListener("change", change);
    return () => { stop(); preference.removeEventListener("change", change); };
  }, []);

  return <div ref={ref} className={className} data-motion-scene="true">{children}</div>;
}
