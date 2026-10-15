import Image from "next/image";
import { MotionScene } from "@/components/motion/MotionScene";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { contact, footerCopy, site, social } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import styles from "./HomeReform.module.css";

const asset = (name: string) => `/img/reform/${name}.webp`;
const linkedin = social.find((item) => item.label === "LinkedIn")!;
function LinkedIn() { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.37 24H.4V7.98h4.97V24ZM2.88 5.8A2.88 2.88 0 1 1 2.9.04a2.88 2.88 0 0 1-.02 5.76ZM24 24h-4.96v-7.8c0-1.86-.04-4.25-2.59-4.25-2.59 0-2.99 2.02-2.99 4.12V24H8.5V7.98h4.76v2.19h.07c.66-1.26 2.28-2.59 4.7-2.59 5.03 0 5.97 3.31 5.97 7.61V24Z" /></svg>; }
function Facebook() { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5A24 24 0 0 0 15 1c-3 0-5 2-5 5v3H7v4h3v9z" /></svg>; }
function Instagram() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>; }


export function HomeContact({ home = false }: { home?: boolean }) {
  return <MotionScene className={styles.reform}>
      <section id="contacto-footer" className={styles.contact} data-home={home ? "8" : undefined} aria-label="Contacto">
        <div className={styles.contactInner}>
          <div className={styles.contactInfo}>
            <Image className={styles.contactLogo} data-motion="quiet" src={asset("contact-wordmark")} alt="JUZT" width={800} height={480} sizes="(max-width: 760px) 45vw, 18vw" />
            <p className={styles.mission} data-motion="quiet" data-motion-delay="80">Estructuramos y ejecutamos proyectos, fortalecemos negocios y acompañamos decisiones estratégicas con conocimiento rural.</p>
            <p className={styles.nit}>Nit: 901.767.156-0</p>
            <div className={styles.directory}>
              <div><MapPin aria-hidden="true" /><p><strong>Dirección</strong><br />Antioquia, Colombia</p></div>
              <div><Mail aria-hidden="true" /><p><strong>E-mail</strong><br /><a href={`mailto:${contact.email}`}>{contact.email}</a><br /><a href={`mailto:${contact.secondaryEmail}`}>{contact.secondaryEmail}</a></p></div>
              <div><MessageCircle aria-hidden="true" /><p><strong>Contacto</strong><br /><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">{contact.phoneDisplay}</a></p></div>
              <div><span className={styles.socialIcons}><a href="https://www.facebook.com/juzt.co" aria-label="JUZT en Facebook" target="_blank" rel="noopener noreferrer"><Facebook /></a><a href="https://www.instagram.com/juzt_productividad/" aria-label="JUZT en Instagram" target="_blank" rel="noopener noreferrer"><Instagram /></a></span><p><strong>Síguenos</strong><br /><a href="https://www.instagram.com/juzt_productividad/" target="_blank" rel="noopener noreferrer">@juzt_productividad</a></p></div>
              <div><a href={linkedin.href} aria-label="JUZT en LinkedIn" target="_blank" rel="noopener noreferrer"><LinkedIn /></a><p><strong>LinkedIn</strong><br /><a href={linkedin.href} target="_blank" rel="noopener noreferrer">{linkedin.handle}</a></p></div>
            </div>
          </div>
          <div className={styles.form}><ContactForm referenceStyle whatsapp={contact.whatsapp} /></div>
        </div>
        <p className={styles.copyright}>{footerCopy.copyright} <a href={site.url}>www.juzt.com.co</a></p>
      </section>
  </MotionScene>;
}
