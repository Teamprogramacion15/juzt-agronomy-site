import Image from "next/image";
import { MotionScene } from "@/components/motion/MotionScene";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeContact } from "./HomeContact";
import styles from "./HomeReform.module.css";

const asset = (name: string) => `/img/reform/${name.startsWith("ally-") ? `${name}.webp` : `${name.replace(/\.png$/, "")}-hq.webp`}`;

const allies = [
  { name: "Alcaldía de Abejorral", slug: "abejorral", width: 451 },
  { name: "Finagro", slug: "finagro", width: 739 },
  { name: "Infinite 1133", slug: "infinite", width: 511 },
  { name: "Tecnilac Willgo", slug: "tecnilac", width: 462 },
  { name: "Alagro", slug: "alagro", width: 685 },
  { name: "Mercados del Oriente", slug: "mercados-oriente", width: 213 },
  { name: "Corpoleche", slug: "corpoleche", width: 340 },
  { name: "SENA", slug: "sena", width: 263 },
  { name: "Coopsumercé", slug: "coopsumerce", width: 640 },
  { name: "Corporación Prodepaz", slug: "prodepaz", width: 648 },
  { name: "Gestando", slug: "gestando", width: 653 },
  { name: "Acodea", slug: "acodea", width: 753 },
  { name: "Alcaldía Municipal de San Luis, Antioquia", slug: "san-luis", width: 537 },
];

function Photo({ name, alt, sizes, className = "" }: { name: string; alt: string; sizes: string; className?: string }) {
  return <Image src={asset(name)} alt={alt} fill sizes={sizes} quality={100} className={className} />;
}
function Arrow() { return <ArrowRight aria-hidden="true" strokeWidth={1.5} />; }
/** Home contains the introduction, service links, allies and contact. */
export function HomeReform() {
  return (
    <MotionScene className={styles.reform}>
      <section id="reforma" className={styles.ribbon} data-home="4" aria-label="Proyectos que conectan estrategia y territorio">
        <div className={styles.ribbonTrack} aria-hidden="true">
          {[0, 1].map((copy) => <div className={styles.ribbonGroup} key={copy}>{[0, 1, 2].map((i) => <span key={i}><b>•</b> PROYECTOS QUE CONECTAN ESTRATEGIA Y TERRITORIO</span>)}</div>)}
        </div>
      </section>

      <section className={styles.intro} data-home="5" aria-labelledby="reform-intro-title">
        <div className={styles.introInner}>
          <div className={styles.introPhoto} data-motion="image" data-motion-exit="true"><Photo name="intro-photo" alt="Participantes de un proyecto rural acompañados por JUZT" sizes="(max-width: 760px) 105vw, 45vw" /></div>
          <div className={styles.introCopy} data-motion="editorial" data-motion-exit="true">
            <h2 id="reform-intro-title"><span>Estructuramos,</span><br />gestionamos y<br />ejecutamos</h2>
            <p className={styles.introSubtitle}>proyectos de principio a fin.</p>
            <p className={styles.introBody}>Conectamos la visión estratégica con el trabajo en territorio para convertir oportunidades en proyectos viables, decisiones claras y resultados que se pueden sostener.</p>
            <a href="#lineas-estrategicas" className={styles.outlineLink}>Ver nuestra forma de trabajar <Arrow /></a>
          </div>
        </div>
      </section>

      <section id="lineas-estrategicas" className={styles.lines} data-home="6" aria-labelledby="reform-lines-title">
        <div className={styles.linesInner}>
          <header className={styles.linesHeader} data-motion="title">
            <p className={styles.tag}>Líneas estratégicas</p>
            <h2 id="reform-lines-title"><span>Una consultoría</span><br />que también ejecuta.</h2>
          </header>
          <div className={styles.lineGrid}>
            <Link href="/proyectos#linea-proyectos" className={styles.lineCard} aria-label="Proyectos y consultoría">
              <div className={styles.cardPhoto} data-motion="portrait" data-motion-delay="80"><Photo name="projects-card.png" alt="Encuentro de JUZT con productores rurales" sizes="(max-width: 760px) 85vw, 25vw" /></div>
              <div className={styles.cardCopy} data-motion="card">
                <p className={styles.lineLabel}>Línea 1</p>
                <h3>Proyectos y<br /><span>consultoría</span></h3>
                <p>Estructuramos, ejecutamos y acompañamos proyectos hasta convertirlos en resultados.<br />Integramos asistencia técnica, consultoría empresarial y planeación estratégica.</p>
                <span className={styles.cardAction}>Ver más <span aria-hidden="true">→</span></span>
              </div>
            </Link>
            <Link href="/proyectos#linea-equipos" className={`${styles.lineCard} ${styles.equipmentCard}`} aria-label="Equipos, insumos y tecnología">
              <div className={styles.cardCopy} data-motion="card">
                <p className={styles.lineLabel}>Línea 2</p>
                <h3>Equipos,<br />insumos y<br /><span>tecnología</span></h3>
                <p>Conectamos a las unidades productivas con maquinaria, equipos, insumos y tecnología, y las asesoramos para elegir lo que necesitan.</p>
                <span className={styles.cardAction}>Ver más <span aria-hidden="true">→</span></span>
              </div>
              <div className={styles.cardPhoto} data-motion="portrait" data-motion-delay="80"><Photo name="equipment-card.png" alt="Productor utilizando un motocultor entre los cultivos" sizes="(max-width: 760px) 85vw, 25vw" /></div>
            </Link>
            <Link href="/proyectos#linea-financiera" className={styles.lineCard} aria-label="Gestión financiera">
              <div className={styles.cardPhoto} data-motion="portrait" data-motion-delay="80"><Photo name="finance-card.png" alt="Productores acompañados por JUZT en territorio" sizes="(max-width: 760px) 85vw, 25vw" /></div>
              <div className={styles.cardCopy} data-motion="card">
                <p className={styles.lineLabel}>Línea 3</p>
                <h3>Gestión<br /><span>financiera</span></h3>
                <p>Facilitamos el acceso a crédito, garantías e inversión para proyectos agropecuarios.<br /><strong>¿Buscas financiación para tu proyecto?</strong></p>
                <span className={styles.cardAction}>Hablemos <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="aliados" className={styles.allies} data-home="7" aria-labelledby="reform-allies-title">
        <p className={styles.tag}>Nuestros aliados</p>
        <h2 id="reform-allies-title" data-motion="quiet"><span>Relaciones que</span><br />amplían el impacto.</h2>
        <p className={styles.alliesIntro}>Trabajamos en red con organizaciones que comparten una<br /><strong>visión de productividad con propósito.</strong></p>
        <div className={styles.allyViewport}>
          <div className={styles.allyTrack}>
            {[0, 1].map((copy) => (
              <ul className={styles.allyGrid} key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {allies.map((ally) => (
                  <li key={ally.slug}>
                    <span className={styles.allyLogo}>
                      <Image src={`/img/allies/${ally.slug}-bw.webp`} alt={copy === 0 ? ally.name : ""} width={ally.width} height={220} sizes="200px" quality={100} />
                      <Image src={`/img/allies/${ally.slug}-color.webp`} alt="" width={ally.width} height={220} sizes="200px" quality={100} className={styles.allyColor} />
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>



      <HomeContact home />


    </MotionScene>
  );
}
