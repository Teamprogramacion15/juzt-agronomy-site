"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const openRef = useRef(false);
  const scrolledRef = useRef(false);
  const hiddenRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    // Si hubo scroll antes de que React terminara de hidratar, se interpreta
    // como navegación descendente. Los enlaces directos con hash se conservan
    // visibles para orientar al visitante en la sección de destino.
    let lastScrollY = window.location.hash
      ? Math.max(window.scrollY, 0)
      : 0;

    const updateHeader = () => {
      frame = 0;
      const currentScrollY = Math.max(window.scrollY, 0);
      const services = document.getElementById("servicios");
      const headerHeight =
        headerRef.current?.getBoundingClientRect().height ?? 76;

      const nextScrolled =
        services
          ? services.getBoundingClientRect().top <= headerHeight
          : currentScrollY > 40;
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }

      const delta = currentScrollY - lastScrollY;
      let nextHidden = hiddenRef.current;

      if (openRef.current || currentScrollY <= 8) {
        nextHidden = false;
      } else if (delta > 1 && currentScrollY > headerHeight + 16) {
        nextHidden = true;
      } else if (delta < -1) {
        nextHidden = false;
      }

      if (nextHidden !== hiddenRef.current) {
        hiddenRef.current = nextHidden;
        setHidden(nextHidden);
      }

      lastScrollY = currentScrollY;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // El cambio sucede cuando el primer panel claro entra detrás del navbar.
  const light = !scrolled;

  return (
    <>
      <header
        ref={headerRef}
        data-hidden={hidden ? "true" : "false"}
        onFocusCapture={() => {
          hiddenRef.current = false;
          setHidden(false);
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 will-change-transform transition-[transform,background-color,box-shadow,backdrop-filter] duration-300 ease-out",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "bg-[color-mix(in_srgb,var(--color-bone)_90%,transparent)] shadow-[0_1px_0_var(--color-mineral-line)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="container-edge relative flex h-[var(--header-h)] items-center justify-end gap-6">
          <a
            href="#top"
            data-testid="navbar-logo"
            aria-label="Juzt · inicio"
            aria-hidden={!scrolled}
            tabIndex={scrolled ? undefined : -1}
            className={cn(
              "absolute left-[var(--gutter)] top-1/2 z-10 -translate-y-1/2 transition-[opacity,transform] duration-300 ease-out",
              scrolled
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-3 opacity-0",
            )}
          >
            <Logo className="h-9 sm:h-10 md:h-11" />
          </a>

          <nav
            aria-label="Principal"
            className="absolute left-1/2 hidden w-max -translate-x-1/2 min-[72rem]:block"
          >
            <ul className="flex items-center gap-6 xl:gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "navbar-link label whitespace-nowrap transition-colors",
                      light
                        ? "text-[color-mix(in_srgb,var(--color-bone)_82%,transparent)] hover:text-[var(--color-bone)]"
                        : "text-[var(--color-ink-soft)] hover:text-[var(--color-pine)]",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={cn(
              "relative z-50 flex h-11 w-11 items-center justify-center rounded-full border min-[72rem]:hidden",
              light
                ? "border-[color-mix(in_srgb,var(--color-bone)_40%,transparent)] text-[var(--color-bone)]"
                : "border-[var(--color-mineral-line)] text-[var(--color-ink)]",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => {
              const nextOpen = !open;
              openRef.current = nextOpen;
              setOpen(nextOpen);
              if (nextOpen) {
                hiddenRef.current = false;
                setHidden(false);
              }
            }}
          >
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <line
                x1="3"
                y1={open ? "11" : "7"}
                x2="19"
                y2={open ? "11" : "7"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                style={{
                  transform: open ? "rotate(45deg)" : "none",
                  transformOrigin: "center",
                }}
              />
              <line
                x1="3"
                y1={open ? "11" : "15"}
                x2="19"
                y2={open ? "11" : "15"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                style={{
                  transform: open ? "rotate(-45deg)" : "none",
                  transformOrigin: "center",
                }}
              />
            </svg>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "mobile-menu fixed inset-0 z-40 flex flex-col bg-[var(--color-pine-900)] px-[var(--gutter)] pb-10 pt-[calc(var(--header-h)+2rem)] text-[var(--color-bone)] transition-[opacity,transform] duration-300 min-[72rem]:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none translate-y-[-1rem] opacity-0",
        )}
        hidden={!open}
      >
        <nav aria-label="Móvil">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-5 text-[var(--step-3)] text-[var(--color-bone)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
