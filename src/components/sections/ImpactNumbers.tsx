"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { impacto } from "@/lib/content";

const metricFormatter = new Intl.NumberFormat("es-CO");

function parseMetric(value: string) {
  return {
    digits: Number(value.replace(/\D/g, "")),
    grouped: value.includes("."),
  };
}

function formatMetric(value: number, grouped: boolean) {
  return grouped ? metricFormatter.format(value) : String(value);
}

export function ImpactNumbers() {
  const root = useRef<HTMLElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    let observer: IntersectionObserver | undefined;
    const setupFrame = window.requestAnimationFrame(() => {
      setEnhanced(true);

      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !("IntersectionObserver" in window)
      ) {
        setVisible(true);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          setVisible(true);
          observer?.disconnect();
        },
        { threshold: 0.28, rootMargin: "0px 0px -8%" },
      );

      observer.observe(element);
    });

    return () => {
      window.cancelAnimationFrame(setupFrame);
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      ref={root}
      className="impact-strip"
      aria-labelledby="impact-title"
      data-enhanced={enhanced ? "true" : "false"}
      data-visible={visible ? "true" : "false"}
    >
      <div className="section-shell impact-shell">
        <header className="impact-intro">
          <h2 id="impact-title">
            <span>Experiencia</span>
            <span>que ya dejó</span>
            <span>huella.</span>
          </h2>
        </header>

        <div className="impact-ledger">
          <ul>
            {impacto.map((item, index) => {
              const metric = parseMetric(item.value);
              return (
                <li
                  key={item.label}
                  style={{ "--metric-delay": `${260 + index * 110}ms` } as CSSProperties}
                >
                  <div className="impact-number-frame">
                    <AnimatedNumber
                      target={metric.digits}
                      grouped={metric.grouped}
                      play={visible}
                      index={index}
                    />
                    <span className="impact-final-value">
                      {formatMetric(metric.digits, metric.grouped)}
                    </span>
                  </div>
                  <span className="impact-metric-label">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({
  target,
  grouped,
  play,
  index,
}: {
  target: number;
  grouped: boolean;
  play: boolean;
  index: number;
}) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!play || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start = 0;
    const duration = 1250;
    const delay = 170 + index * 115;

    const reset = window.setTimeout(() => setValue(0), 0);

    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.round(target * eased));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(reset);
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [index, play, target]);

  return <strong aria-hidden="true">{formatMetric(value, grouped)}</strong>;
}
