"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ENTRANCE_ROOT_MARGIN, ENTRANCE_THRESHOLDS, isPresented } from "./viewport";

type RevealProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  duration?: number;
  stagger?: boolean;
  staggerEach?: number;
};

/** Native, one-time entrance. HTML stays visible without JavaScript or API support. */
export function Reveal({
  children, className, delay = 0, x = 0, y = 20, scale = 1, rotation = 0,
  duration = 0.82, stagger = false, staggerEach = 0.07, ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window) || !element.animate) return;

    const targets = stagger
      ? Array.from(element.querySelectorAll<HTMLElement>("[data-reveal-item]"))
      : [element];
    const previousOpacity = targets.map((target) => target.style.opacity);
    const animations: Animation[] = [];
    const seen = new WeakSet<HTMLElement>();
    const eligible = new WeakSet<HTMLElement>();
    const loading = new WeakSet<HTMLElement>();
    let stopped = false;
    const restore = () => targets.forEach((target, index) => { target.style.opacity = previousOpacity[index] ?? ""; });
    targets.forEach((target) => { target.style.opacity = "0"; });

    const enter = async (target: HTMLElement) => {
      if (seen.has(target) || loading.has(target)) return;
      loading.add(target);
      await Promise.allSettled(Array.from(target.querySelectorAll("img")).map((image) => image.decode()));
      loading.delete(target);
      if (stopped || !eligible.has(target) || seen.has(target)) return;
      seen.add(target);
      observer.unobserve(target);
      const index = targets.indexOf(target);
      const animation = target.animate([
        { opacity: 0, transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)` },
        { opacity: 1, transform: "none" },
      ], {
        duration: duration * 1000,
        delay: Math.min(delay + (stagger ? index * staggerEach : 0), 0.2) * 1000,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      });
      animations.push(animation);
      void animation.finished.then(() => {
        target.style.opacity = previousOpacity[index] ?? "";
        animation.cancel();
      }).catch(() => {});
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (isPresented(entry)) {
          eligible.add(target);
          void enter(target);
        } else if (!entry.isIntersecting) {
          eligible.delete(target);
        }
      }
    }, { rootMargin: ENTRANCE_ROOT_MARGIN, threshold: ENTRANCE_THRESHOLDS });
    targets.forEach((target) => observer.observe(target));

    const stop = () => {
      stopped = true;
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      restore();
    };
    const onPreferenceChange = () => { if (preference.matches) stop(); };
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      stop();
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [delay, x, y, scale, rotation, duration, stagger, staggerEach]);

  return <div ref={ref} className={className} data-motion-reveal="true" data-motion-stagger={stagger ? "true" : "false"} {...props}>{children}</div>;
}
