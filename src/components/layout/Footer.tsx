import Link from "next/link";
import { contact, footerCopy, nav, site, social } from "@/lib/content";
import { DeferredContactForm } from "@/components/sections/DeferredContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer id="contacto-footer" className="contact-footer">
      <div className="section-shell">
        <Reveal className="footer-invitation" stagger>
          <div className="footer-invitation-copy" data-reveal-item>
            <p className="micro-label">Hablemos de tu próximo proyecto</p>
            <h2>Una buena idea necesita estructura para convertirse en resultado.</h2>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-whatsapp"
            >
              Escribir por WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="footer-form-card" data-reveal-item>
            <p className="micro-label">Contacto directo</p>
            <DeferredContactForm />
          </div>
        </Reveal>

        <Reveal className="footer-directory" stagger staggerEach={0.08}>
          <div className="footer-brand" data-reveal-item>
            <Logo tone="bone" />
            <p>{footerCopy.mission}</p>
          </div>

          <div data-reveal-item>
            <h3>Contacto</h3>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phoneRaw}`}>{contact.phoneDisplay}</a>
            <p>{contact.location}</p>
          </div>

          <nav aria-label="Pie de página" data-reveal-item>
            <h3>Navegación</h3>
            {nav.map((item) => (
              <Link key={item.label} href={item.href}>{item.label}</Link>
            ))}
            <a href={contact.equipmentUrl} target="_blank" rel="noopener noreferrer">
              Equipos e insumos ↗
            </a>
          </nav>

          <div data-reveal-item>
            <h3>Redes</h3>
            {social.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </Reveal>

        <div className="footer-legal">
          <p>{footerCopy.copyright}</p>
          <div>
            <Link href="/privacidad">Privacidad y datos</Link>
            <p>{site.credit}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
