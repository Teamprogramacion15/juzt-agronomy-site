import { site, contact, footerCopy, nav, social } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bone)]">
      <div className="container-edge py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="bone" />
            <p className="mt-5 max-w-[48ch] text-[color-mix(in_srgb,var(--color-bone)_72%,transparent)]">
              {footerCopy.mission}
            </p>
            <p className="mt-6 font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[var(--color-lime)]">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-3">
            <h2 className="mb-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[color-mix(in_srgb,var(--color-bone)_55%,transparent)]">
              Navegación
            </h2>
            <ul className="flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[color-mix(in_srgb,var(--color-bone)_80%,transparent)] transition-colors hover:text-[var(--color-bone)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="mb-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[color-mix(in_srgb,var(--color-bone)_55%,transparent)]">
              Contacto
            </h2>
            <ul className="flex flex-col gap-2.5 text-[color-mix(in_srgb,var(--color-bone)_80%,transparent)]">
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-[var(--color-bone)]">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phoneRaw}`} className="hover:text-[var(--color-bone)]">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>{contact.location}</li>
            </ul>
            <ul className="mt-4 flex gap-4">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color-mix(in_srgb,var(--color-bone)_80%,transparent)] underline decoration-[var(--color-clay)] underline-offset-4 hover:text-[var(--color-bone)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/12 pt-6 text-sm text-[color-mix(in_srgb,var(--color-bone)_60%,transparent)] sm:flex-row sm:items-center sm:justify-between">
          <p>{footerCopy.copyright}</p>
          <p>{site.credit}</p>
        </div>
      </div>
    </footer>
  );
}
