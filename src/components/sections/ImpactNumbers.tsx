"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, Landmark, UserRound, UsersRound } from "lucide-react";
import { isPresented } from "@/components/motion/viewport";
import { impacto } from "@/lib/content";

const metricIcons = [Landmark, UserRound, BriefcaseBusiness, UsersRound] as const;
const metricFormatter = new Intl.NumberFormat("es-CO");

function parseMetric(value: string) {
  return Number(value.replace(/\D/g, ""));
}

export function ImpactNumbers() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const videoVisible = useRef(false);
  const playbackRequest = useRef(0);
  const metricsRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  const syncPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const request = ++playbackRequest.current;
    if (!videoVisible.current || document.hidden || userPaused.current) {
      video.pause();
      return;
    }

    video.muted = false;
    void video.play().catch(() => {
      if (
        playbackRequest.current !== request ||
        !videoVisible.current ||
        document.hidden ||
        userPaused.current
      ) return;

      video.muted = true;
      void video.play().catch(() => {});
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!("IntersectionObserver" in window)) {
      videoVisible.current = true;
      return;
    }

    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      video.preload = "metadata";
      preloadObserver.disconnect();
    }, { rootMargin: "200px" });
    preloadObserver.observe(video);

    const observer = new IntersectionObserver(
      ([entry]) => {
        videoVisible.current = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.5);
        syncPlayback();
      },
      { threshold: [0, 0.5] },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      preloadObserver.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      playbackRequest.current += 1;
      video.pause();
    };
  }, [syncPlayback]);

  useEffect(() => {
    const metrics = metricsRef.current;
    if (!metrics) return;

    let observer: IntersectionObserver | undefined;
    const setupFrame = window.requestAnimationFrame(() => {
      setEnhanced(true);
      if (!("IntersectionObserver" in window)) {
        setVisible(true);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          // Count only once the whole row is on screen, so the visitor sees it from zero.
          if (!entry || !isPresented(entry)) return;
          setVisible(true);
          observer?.disconnect();
        },
        { rootMargin: "-72px 0px 0px 0px", threshold: [0, 0.25, 0.5, 0.75, 0.9, 1] },
      );

      observer.observe(metrics);
    });

    return () => {
      window.cancelAnimationFrame(setupFrame);
      observer?.disconnect();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    userPaused.current = !video.paused;
    syncPlayback();
  }

  return (
    <section id="nosotros" className="experience-section" aria-labelledby="experience-title">
      <button
        className="experience-video-button"
        type="button"
        aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
        onClick={togglePlayback}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="none"
          poster="/img/juan-video-poster.webp"
          disablePictureInPicture
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="/img/juan-video-web.mp4" type="video/mp4" />
          Tu navegador no puede reproducir este video.
        </video>
      </button>

      <div
        ref={metricsRef}
        className="experience-stats"
        data-enhanced={enhanced}
        data-visible={visible}
      >
        <h2 id="experience-title">Experiencia que ya dejó huella</h2>
        <ul className="experience-metrics">
          {impacto.map((item, index) => {
            const Icon = metricIcons[index] ?? Landmark;
            const target = parseMetric(item.value);

            return (
              <li key={item.label} aria-label={`${item.value} ${item.label}`}>
                <div className="experience-metric-value" aria-hidden="true">
                  <Icon size={17} strokeWidth={2.3} />
                  <AnimatedNumber target={target} play={visible} />
                </div>
                <span className="experience-metric-label">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function AnimatedNumber({ target, play }: { target: number; play: boolean }) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!play) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start: number | undefined;

    const tick = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    const resetFrame = window.requestAnimationFrame(() => {
      setValue(0);
      frame = window.requestAnimationFrame(tick);
    });
    return () => {
      window.cancelAnimationFrame(resetFrame);
      window.cancelAnimationFrame(frame);
    };
  }, [play, target]);

  return <strong>{metricFormatter.format(value)}</strong>;
}
