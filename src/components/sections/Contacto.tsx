import Image from "next/image";
import { contact, contactoCopy, social } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { DeferredContactForm } from "./DeferredContactForm";

export function Contacto() {
  return (
    <section
      id="contacto"
      className="contact-section relative isolate overflow-hidden bg-[var(--color-pine-900)]"
    >
      {/* Montañas de Antioquia como fondo atmosférico */}
      <Image
        src="/img/montanas-antioquia.webp"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover opacity-20"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-pine-900),color-mix(in_srgb,var(--color-pine-900)_86%,transparent))]"
        aria-hidden="true"
      />
      <div className="container-edge contact-layout relative grid lg:grid-cols-12">
        <div className="contact-copy lg:col-span-5">
          <SectionHeading
            eyebrow={contactoCopy.eyebrow}
            title={contactoCopy.title}
            intro={contactoCopy.body}
            tone="bone"
            className="contact-heading"
          />

          <Reveal stagger className="contact-details flex flex-col">
            <ContactRow label="Correo">
              <a
                href={`mailto:${contact.email}`}
                className="text-[var(--color-bone)] underline decoration-[var(--color-clay)] decoration-2 underline-offset-4 hover:text-[var(--color-lime)]"
              >
                {contact.email}
              </a>
            </ContactRow>

            <ContactRow label="Teléfono / WhatsApp">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${contact.phoneRaw}`}
                  className="text-[var(--color-bone)] hover:text-[var(--color-lime)]"
                >
                  {contact.phoneDisplay}
                </a>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 px-3 py-1 text-sm text-[var(--color-bone)] transition-colors hover:border-[var(--color-lime)] hover:text-[var(--color-lime)]"
                >
                  Abrir WhatsApp
                </a>
              </div>
            </ContactRow>

            <ContactRow label="Ubicación">
              <span className="text-[var(--color-bone)]">{contact.location}</span>
            </ContactRow>

            <ContactRow label="Síguenos">
              <ul className="flex flex-wrap gap-4">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-bone)] underline decoration-[var(--color-clay)] underline-offset-4 hover:text-[var(--color-lime)]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ContactRow>
          </Reveal>
        </div>

        <div className="contact-form-column lg:col-span-7">
          <Reveal className="contact-card rounded-[var(--radius-xl)] bg-[var(--color-bone)] shadow-[var(--shadow-raised)]">
            <DeferredContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-reveal-item
      className="contact-row flex flex-col border-t border-white/12"
    >
      <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[color-mix(in_srgb,var(--color-bone)_55%,transparent)]">
        {label}
      </span>
      <div className="text-[var(--step-1)]">{children}</div>
    </div>
  );
}
