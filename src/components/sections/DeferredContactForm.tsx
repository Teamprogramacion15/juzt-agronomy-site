"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(
  () => import("./ContactForm").then((module) => module.ContactForm),
  {
    ssr: false,
    loading: () => <ContactFormPlaceholder />,
  },
);

/**
 * Mantiene fuera de la carga inicial las librerías de validación del formulario.
 * Empieza a descargarlas antes de que contacto sea visible para que la transición
 * sea imperceptible durante el scroll normal.
 */
export function DeferredContactForm() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "1200px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      {ready ? <ContactForm /> : <ContactFormPlaceholder />}
    </div>
  );
}

function ContactFormPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="contact-form flex min-h-[30rem] animate-pulse flex-col"
    >
      <div className="contact-form-grid grid sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="contact-field-group flex flex-col gap-1.5"
          >
            <span className="h-4 w-20 rounded bg-[var(--color-mineral-line)]" />
            <span className="contact-field h-[3.25rem] rounded-[var(--radius-md)] border border-[var(--color-mineral-line)]" />
          </div>
        ))}
      </div>
      <span className="mt-1 h-4 w-20 rounded bg-[var(--color-mineral-line)]" />
      <span className="contact-message mt-1.5 min-h-36 rounded-[var(--radius-md)] border border-[var(--color-mineral-line)]" />
      <span className="mt-4 h-4 w-4/5 rounded bg-[var(--color-mineral-line)]" />
      <span className="contact-submit mt-auto h-12 rounded-full bg-[color-mix(in_srgb,var(--color-clay)_35%,transparent)]" />
    </div>
  );
}
