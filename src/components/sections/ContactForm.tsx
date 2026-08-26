"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { contact } from "@/lib/content";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "success"; delivered: boolean }
  | { kind: "error"; message: string };

const fieldBase =
  "contact-field w-full rounded-[var(--radius-md)] border bg-[var(--color-bone)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-mineral)] focus-visible:border-[var(--color-pine)] focus-visible:ring-2 focus-visible:ring-[var(--color-pine)]/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: ContactInput) {
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { ok: boolean; delivered?: boolean; error?: string } =
        await res.json();
      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          message: data.error ?? "No pudimos enviar tu mensaje.",
        });
        return;
      }
      setStatus({ kind: "success", delivered: data.delivered ?? false });
      reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Error de red. Revisa tu conexión e intenta de nuevo.",
      });
    }
  }

  const errId = (name: string) => `${name}-error`;

  if (status.kind === "success") {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-mineral-line)] bg-[var(--color-bone)] p-8"
      >
        <p className="text-[var(--step-1)] font-semibold text-[var(--color-pine)]">
          Gracias, recibimos tu solicitud.
        </p>
        {status.delivered ? (
          <p className="text-[var(--color-ink-soft)]">
            Un consultor revisará tu caso y te contactará pronto.
          </p>
        ) : (
          <p className="text-[var(--color-ink-soft)]">
            El envío por correo aún no está conectado en este entorno. Para no
            perder tiempo, escríbenos directamente a{" "}
            <a
              className="text-[var(--color-pine)] underline decoration-[var(--color-clay)] underline-offset-4"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>{" "}
            o por{" "}
            <a
              className="text-[var(--color-pine)] underline decoration-[var(--color-clay)] underline-offset-4"
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            .
          </p>
        )}
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-2 self-start text-sm text-[var(--color-pine)] underline underline-offset-4"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="contact-form flex flex-col"
    >
      {/* Honeypot (oculto para humanos) */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">No completar</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="contact-form-grid grid sm:grid-cols-2">
        <Field
          label="Nombre"
          name="nombre"
          error={errors.nombre?.message}
          errId={errId("nombre")}
        >
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? errId("nombre") : undefined}
            className={cn(fieldBase, errors.nombre ? "border-[var(--color-error)]" : "border-[var(--color-mineral-line)]")}
            {...register("nombre")}
          />
        </Field>

        <Field
          label="Correo"
          name="email"
          error={errors.email?.message}
          errId={errId("email")}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? errId("email") : undefined}
            className={cn(fieldBase, errors.email ? "border-[var(--color-error)]" : "border-[var(--color-mineral-line)]")}
            {...register("email")}
          />
        </Field>

        <Field
          label="Teléfono"
          name="telefono"
          error={errors.telefono?.message}
          errId={errId("telefono")}
        >
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.telefono}
            aria-describedby={errors.telefono ? errId("telefono") : undefined}
            className={cn(fieldBase, errors.telefono ? "border-[var(--color-error)]" : "border-[var(--color-mineral-line)]")}
            {...register("telefono")}
          />
        </Field>

        <Field label="País (opcional)" name="pais" error={errors.pais?.message} errId={errId("pais")}>
          <input
            id="pais"
            type="text"
            autoComplete="country-name"
            className={cn(fieldBase, "border-[var(--color-mineral-line)]")}
            {...register("pais")}
          />
        </Field>
      </div>

      <Field label="Mensaje" name="mensaje" error={errors.mensaje?.message} errId={errId("mensaje")}>
        <textarea
          id="mensaje"
          rows={5}
          aria-invalid={!!errors.mensaje}
          aria-describedby={errors.mensaje ? errId("mensaje") : undefined}
          className={cn(fieldBase, "contact-message resize-y", errors.mensaje ? "border-[var(--color-error)]" : "border-[var(--color-mineral-line)]")}
          placeholder="Cuéntanos sobre tu proyecto, cultivo o necesidad."
          {...register("mensaje")}
        />
      </Field>

      <div className="contact-consent flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-sm text-[var(--color-ink-soft)]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-pine)]"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? errId("consent") : undefined}
            {...register("consent")}
          />
          <span>
            Autorizo a JUZT a tratar mis datos para responder esta solicitud,
            conforme al{" "}
            <a
              href="/privacidad"
              className="text-[var(--color-pine)] underline underline-offset-4"
            >
              aviso de privacidad y tratamiento de datos
            </a>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id={errId("consent")} role="alert" className="text-sm text-[var(--color-error)]">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      {status.kind === "error" ? (
        <p role="alert" className="rounded-[var(--radius-md)] border border-[var(--color-error)]/40 bg-[var(--color-error)]/8 px-4 py-3 text-sm text-[var(--color-error)]">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="contact-submit group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-clay)] px-7 py-3.5 font-medium text-[var(--color-bone)] shadow-[var(--shadow-soft)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-clay-600)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-pine)] disabled:cursor-progress disabled:opacity-70"
      >
        {isSubmitting ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  errId,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  errId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="contact-field-group flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-[var(--color-ink)]">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errId} role="alert" className="text-sm text-[var(--color-error)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
