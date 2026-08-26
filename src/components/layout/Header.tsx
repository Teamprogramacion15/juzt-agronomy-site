"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, nav } from "@/lib/content";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const previousScrollY = useRef(0);

  useEffect(() => {
    let frame = 0;
    let accumulatedDelta = 0;

    const update = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);
        const delta = currentScrollY - previousScrollY.current;

        setScrolled(currentScrollY > 18);

        if (open || currentScrollY <= 72) {
          setHidden(false);
          accumulatedDelta = 0;
        } else if (delta > 0) {
          accumulatedDelta = Math.max(0, accumulatedDelta) + delta;
          if (accumulatedDelta >= 12) {
            setHidden(true);
            accumulatedDelta = 0;
          }
        } else if (delta < 0) {
          accumulatedDelta = Math.min(0, accumulatedDelta) + delta;
          if (accumulatedDelta <= -8) {
            setHidden(false);
            accumulatedDelta = 0;
          }
        }

        previousScrollY.current = currentScrollY;
        frame = 0;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : href.startsWith("/") && pathname === href;

  return (
    <header
      className="site-header"
      data-scrolled={scrolled ? "true" : "false"}
      data-hidden={hidden ? "true" : "false"}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="site-header-inner">
        <Link href="/" className="site-logo" aria-label="JUZT · inicio">
          <Logo priority />
        </Link>

        <nav className="desktop-nav" aria-label="Principal">
          <ul>
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          className="header-equipment"
          href={contact.equipmentUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Equipos e insumos <span aria-hidden="true">↗</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => {
            setHidden(false);
            setOpen((value) => !value);
          }}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className="mobile-navigation"
        data-open={open ? "true" : "false"}
        aria-hidden={!open}
      >
        <nav aria-label="Móvil">
          <ul>
            {nav.map((item, index) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={contact.equipmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                <span>06</span>
                Equipos e insumos ↗
              </a>
            </li>
          </ul>
        </nav>
        <p>Consultoría, estrategia y ejecución para el territorio.</p>
      </div>
    </header>
  );
}
