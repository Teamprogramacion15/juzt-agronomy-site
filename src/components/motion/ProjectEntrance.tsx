"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ENTRANCE_ROOT_MARGIN, ENTRANCE_THRESHOLDS, isPresented, startsBelowFold } from "./viewport";

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
const targets = "[data-project-photo], [data-project-heading], [data-project-lede], [data-project-includes]";
const openPhoto = "polygon(0% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 50%)";

/** Each aperture opens from the text/photo seam. No continuous scroll listener. */
export function ProjectEntrance({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || !root.animate || !("IntersectionObserver" in window)) return;

    let dispose = () => {};
    const setup = () => {
      dispose();
      if (preference.matches) return;
      let stopped = false;
      const active = new Map<Element, Animation>();
      const entered = new WeakSet<HTMLElement>();
      const armed = new WeakSet<HTMLElement>();
      const exiting = new WeakSet<HTMLElement>();
      const visible = new WeakSet<HTMLElement>();
      const loading = new WeakSet<HTMLElement>();
      const compact = window.matchMedia("(max-width: 760px)").matches;
      const duration = compact ? 950 : 1250;

      const animate = (element: Element, frames: Keyframe[], time: number, delay = 0, persist = false) => {
        active.get(element)?.cancel();
        const animation = element.animate(frames, { duration: time, delay, easing: ease, fill: "both" });
        active.set(element, animation);
        void animation.finished.then(() => {
          if (!persist && active.get(element) === animation) {
            animation.cancel();
            active.delete(element);
          }
        }).catch(() => {});
      };

      const currentFrame = (element: Element): Keyframe => {
        const style = getComputedStyle(element);
        return { clipPath: style.clipPath, transform: style.transform, opacity: style.opacity };
      };

      const exit = (element: HTMLElement, direction: number) => {
        if (exiting.has(element) || element.contains(document.activeElement)) return;
        exiting.add(element);
        element.dataset.projectState = "exiting";
        const time = compact ? 520 : 650;
        if (element.hasAttribute("data-project-photo")) {
          const left = element.closest("[data-project-panel]")?.getAttribute("data-project-panel") === "equipment";
          const closed = left
            ? "polygon(100% 0%, 100% 0%, 100% 50%, 100% 100%, 100% 100%, 88% 50%)"
            : "polygon(0% 0%, 0% 0%, 12% 50%, 0% 100%, 0% 100%, 0% 50%)";
          const aperture = element.querySelector("[data-project-aperture]")!;
          animate(aperture, [currentFrame(aperture), { clipPath: closed, opacity: 1, transform: "none" }], time, 0, true);
          const surface = element.querySelector("[data-project-surface]");
          if (surface) animate(surface, [currentFrame(surface), { transform: `translateX(${left ? "2" : "-2"}%) scale(1.06)` }], time, 0, true);
        } else if (element.hasAttribute("data-project-heading")) {
          element.querySelectorAll("[data-project-title-line]").forEach((line, index) => {
            animate(line, [currentFrame(line), {
              clipPath: "inset(0% -5% 100% -5%)",
              transform: `perspective(900px) translateY(${direction * 20}%) rotateX(-8deg)`,
            }], time, index * 45, true);
          });
        } else if (element.hasAttribute("data-project-includes")) {
          const content = element.querySelector("[data-project-content]")!;
          animate(content, [currentFrame(content), { clipPath: "inset(-5% 100% -5% 0%)", transform: "translateX(-10px)" }], time, 0, true);
        } else {
          animate(element, [currentFrame(element), { opacity: 0, transform: `translateY(${direction * 18}px)` }], time, 0, true);
        }
      };

      const restore = (element: HTMLElement) => {
        if (!exiting.has(element)) return;
        exiting.delete(element);
        element.dataset.projectState = "visible";
        const time = compact ? 520 : 650;
        if (element.hasAttribute("data-project-photo")) {
          const aperture = element.querySelector("[data-project-aperture]")!;
          animate(aperture, [currentFrame(aperture), { clipPath: openPhoto, transform: "none", opacity: 1 }], time);
          const surface = element.querySelector("[data-project-surface]");
          if (surface) animate(surface, [currentFrame(surface), { transform: "none", opacity: 1 }], time);
        } else if (element.hasAttribute("data-project-heading")) {
          element.querySelectorAll("[data-project-title-line]").forEach((line, index) => {
            animate(line, [currentFrame(line), { clipPath: "inset(-15% -5% -15% -5%)", transform: "none", opacity: 1 }], time, index * 45);
          });
        } else {
          const content = element.querySelector("[data-project-content]") ?? element;
          animate(content, [currentFrame(content), { clipPath: "inset(-5% 0% -5% 0%)", transform: "none", opacity: 1 }], time);
        }
      };

      const enter = async (element: HTMLElement) => {
        if (entered.has(element) || loading.has(element)) return;
        loading.add(element);
        if (element.hasAttribute("data-project-photo")) {
          await Promise.allSettled(Array.from(element.querySelectorAll("img")).map((image) => image.decode()));
        }
        loading.delete(element);
        if (stopped || !visible.has(element) || entered.has(element)) return;
        entered.add(element);
        observer.unobserve(element);
        delete element.dataset.projectPending;
        element.dataset.projectEntered = "true";
        element.dataset.projectState = "visible";

        if (element.hasAttribute("data-project-photo")) {
          const left = element.closest("[data-project-panel]")?.getAttribute("data-project-panel") === "equipment";
          const closed = left
            ? "polygon(100% 0%, 100% 0%, 100% 50%, 100% 100%, 100% 100%, 88% 50%)"
            : "polygon(0% 0%, 0% 0%, 12% 50%, 0% 100%, 0% 100%, 0% 50%)";
          const halfway = left
            ? "polygon(20% 0%, 100% 0%, 100% 50%, 100% 100%, 20% 100%, 0% 50%)"
            : "polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%, 0% 50%)";
          animate(element.querySelector("[data-project-aperture]")!, [{ clipPath: closed }, { clipPath: halfway, offset: 0.58 }, { clipPath: openPhoto }], duration);
          const surface = element.querySelector("[data-project-surface]");
          if (surface) animate(surface, [
            { transform: `translateX(${left ? "2" : "-2"}%) scale(${compact ? 1.06 : 1.1})` },
            { transform: "translateX(0%) scale(1)" },
          ], duration + 180);
        } else if (element.hasAttribute("data-project-heading")) {
          element.querySelectorAll("[data-project-title-line]").forEach((line, index) => {
            animate(line, [
              { clipPath: "inset(0% -5% 100% -5%)", transform: "perspective(900px) translateY(35%) rotateX(-12deg)", transformOrigin: "50% 100%" },
              { clipPath: "inset(-15% -5% -15% -5%)", transform: "perspective(900px) translateY(0%) rotateX(0deg)", transformOrigin: "50% 100%" },
            ], compact ? 760 : 950, index * 110);
          });
        } else if (element.hasAttribute("data-project-includes")) {
          animate(element.querySelector("[data-project-content]")!, [
            { clipPath: "inset(-5% 100% -5% 0%)", transform: "translateX(-10px)" },
            { clipPath: "inset(-5% 0% -5% 0%)", transform: "translateX(0px)" },
          ], compact ? 720 : 900);
        } else {
          animate(element, [{ opacity: 0.25, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0px)" }], 700);
        }
      };

      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (isPresented(entry)) {
            visible.add(element);
            void enter(element);
          } else if (!entry.isIntersecting) visible.delete(element);
        }
      }, { rootMargin: ENTRANCE_ROOT_MARGIN, threshold: ENTRANCE_THRESHOLDS });

      // Arm only after a meaningful view; an entrance at the lower edge must
      // never immediately trigger an exit. Different thresholds prevent jitter.
      const exitObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.34) {
            armed.add(element);
            restore(element);
          } else if (entry.intersectionRatio <= 0.24 && entered.has(element) && armed.has(element)) {
            exit(element, entry.boundingClientRect.top < 72 ? -1 : 1);
          }
        }
      }, { rootMargin: "-72px 0px 0px 0px", threshold: [0, 0.24, 0.34] });

      root.querySelectorAll<HTMLElement>(targets).forEach((element) => {
        // Only offscreen elements are prepared; SSR and the first paint stay readable.
        if (startsBelowFold(element)) element.dataset.projectPending = "true";
        observer.observe(element);
        exitObserver.observe(element);
      });

      dispose = () => {
        stopped = true;
        observer.disconnect();
        exitObserver.disconnect();
        active.forEach((animation) => animation.cancel());
        active.clear();
        root.querySelectorAll<HTMLElement>("[data-project-pending]").forEach((element) => { delete element.dataset.projectPending; });
        root.querySelectorAll<HTMLElement>("[data-project-state]").forEach((element) => { delete element.dataset.projectState; });
      };
    };

    setup();
    preference.addEventListener("change", setup);
    return () => { dispose(); preference.removeEventListener("change", setup); };
  }, []);

  return <div ref={ref} className={className} data-project-entrance="true">{children}</div>;
}
