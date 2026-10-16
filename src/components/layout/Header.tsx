"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { contact } from "@/lib/content";
import { useEffect, useRef, useState } from "react";

const homeNav = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Casos de éxito", href: "/casos-de-exito" },
  { label: "Equipos e insumos", href: contact.equipmentUrl },
  { label: "Contactos", href: "#contacto-footer" },
] as const;

// Absolute URLs (the equipment shop) open in a new tab and never replace the current page.
const externalProps = (href: string) =>
  /^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Warm the mobile menu too, without competing with the initial render.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    const warmRoutes = () => {
      for (const item of homeNav) {
        if (item.href.startsWith("/") && item.href !== pathname) router.prefetch(item.href);
      }
      router.prefetch("/gestion-financiera");
      router.prefetch("/equipos-e-insumos");
    };
    if (typeof window.requestIdleCallback === "function") {
      const idle = window.requestIdleCallback(warmRoutes, { timeout: 2000 });
      return () => window.cancelIdleCallback(idle);
    }
    const timeout = window.setTimeout(warmRoutes, 500);
    return () => window.clearTimeout(timeout);
  }, [pathname, router]);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const previousScrollY = useRef(0);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
    setOpen(false);
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setOpen(Boolean(menuRef.current?.open)));
    return () => window.cancelAnimationFrame(frame);
  }, []);

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
      if (event.key === "Escape") {
        if (menuRef.current) menuRef.current.open = false;
        setOpen(false);
      }
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
      className="site-header site-header-home"
      data-scrolled={scrolled ? "true" : "false"}
      data-hidden={hidden ? "true" : "false"}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="site-header-inner">
        <Link href="/" className="site-logo" aria-label="JUZT · inicio">
          <Image
              src="/brand/home-reference-logo.png"
              alt="JUZT — Gestión de productividad"
              width={264}
              height={189}
              priority
              className="home-reference-logo"
            />
        </Link>

        <nav className="home-reference-nav" aria-label="Principal">
          <ul>
            {homeNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} {...externalProps(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>

      <details ref={menuRef} className="mobile-menu" onToggle={(event) => {
        setOpen(event.currentTarget.open);
        setHidden(false);
      }}>
        <summary
          role="button"
          className="menu-toggle"
          aria-controls="mobile-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span />
          <span />
        </summary>

      <div
        id="mobile-navigation"
        className="mobile-navigation"
        data-open={open ? "true" : "false"}
      >
        <nav aria-label="Móvil">
          <ul>
            {homeNav.map((item, index) => (
              <li key={item.label}>
                <Link
                    href={item.href}
                    onClick={closeMenu}
                    {...externalProps(item.href)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p>Consultoría, estrategia y ejecución para el territorio.</p>
      </div>
      </details>
    </header>
  );
}
