import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { MotionScene } from "@/components/motion/MotionScene";
import { hero } from "@/lib/content";
import styles from "./CasesComingSoon.module.css";

const stages = [
  { label: "Documentación de resultados", state: "done" },
  { label: "Validación con aliados y territorios", state: "active" },
  { label: "Publicación de historias", state: "pending" },
] as const;

const stateLabel = { done: "Completado", active: "En curso", pending: "Próximamente" } as const;

export function CasesComingSoon() {
  return (
    <MotionScene className={styles.page}>
      <section id="casos-en-construccion" className={styles.section} aria-labelledby="cases-coming-title">
        <svg className={styles.contours} viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M-112 785C95 681 245 741 416 681C586 621 699 528 891 570C1015 597 1125 579 1247 518C1380 452 1500 470 1720 410" />
          <path d="M-98 829C118 730 270 791 445 731C620 671 737 582 918 620C1046 647 1166 627 1295 568C1420 510 1530 525 1720 470" />
          <path d="M-78 870C149 783 301 839 481 785C665 730 784 644 956 675C1094 700 1213 677 1346 620C1460 572 1560 585 1720 540" />
          <path d="M132 174h52m-26-26v52M1452 214h44m-22-22v44M944 92h34m-17-17v34" />
        </svg>

        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.eyebrow} data-motion="quiet">
              <span aria-hidden="true" /> Casos de éxito
            </p>
            <h1 id="cases-coming-title" data-motion="title">
              <span>Estamos construyendo</span>
              <strong className={styles.blue}>historias</strong>
              <strong>que dejan huella</strong>
            </h1>
            <p className={styles.lede} data-motion="quiet" data-motion-delay="120">
              Muy pronto conocerás los proyectos, territorios y organizaciones que ya transformaron su realidad
              con JUZT. Estamos documentando cada resultado con el rigor que merece.
            </p>

            <ol className={styles.stages} aria-label="Avance de la sección" data-motion="card" data-motion-delay="200">
              {stages.map((stage, index) => (
                <li key={stage.label} className={styles[stage.state]}>
                  <span className={styles.stageMark} aria-hidden="true">
                    {stage.state === "done" ? <Check strokeWidth={3} /> : String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stageText}>
                    {stage.label}
                    <small>{stateLabel[stage.state]}</small>
                  </span>
                </li>
              ))}
            </ol>

            <div className={styles.links} data-motion="quiet" data-motion-delay="280">
              <a href={hero.primaryCta.href} className={styles.primary} target="_blank" rel="noopener noreferrer">
                {hero.primaryCta.label} <ArrowRight aria-hidden="true" strokeWidth={1.8} />
              </a>
              <Link href={hero.secondaryCta.href} className={styles.secondary}>
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className={styles.visual} data-motion="image">
            <div className={styles.frame}>
              <div className={styles.blueprint} aria-hidden="true">
                <span className={styles.crosshair} />
              </div>
              <Image
                src="/brand/logo_juzt_hero_white.webp"
                alt="JUZT"
                width={1983}
                height={793}
                className={styles.logo}
                sizes="(max-width: 899px) 60vw, 26vw"
              />
              <p className={styles.badge}>
                <span className={styles.pulse} aria-hidden="true" />
                Sección en construcción
              </p>
              <div className={styles.progress} aria-hidden="true">
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionScene>
  );
}
