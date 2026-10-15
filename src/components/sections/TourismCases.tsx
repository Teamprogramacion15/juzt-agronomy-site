import Image from "next/image";
import { MotionScene } from "@/components/motion/MotionScene";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./HomeReform.module.css";

const asset = (name: string) => `/img/reform/${name}${name.startsWith("case-") ? "-hq" : ""}.webp`;
const placeholder = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut";

function Photo({ name, alt, sizes }: { name: string; alt: string; sizes: string }) {
  return <Image src={asset(name)} alt={alt} fill sizes={sizes} quality={name.startsWith("case-") ? 100 : 90} />;
}
function Arrow() { return <ArrowRight aria-hidden="true" strokeWidth={1.5} />; }

export function TourismCases() {
  return (
    <MotionScene className={`${styles.reform} ${styles.tourismPage}`}>
      <section id="rutas-turismo" className={styles.cases} aria-labelledby="tourism-cases-title">
        <div className={styles.tourismHero}>
          <Photo name="tourism" alt="Cascada rodeada de bosque y un arcoíris" sizes="100vw" />
          <div className={styles.tourismCopy} data-motion="title" data-motion-exit="true">
            <h1 id="tourism-cases-title">Rutas del<br />Turismo Sostenible</h1>
            <div><p>Negocios Verdes</p><a href="#historias-territorio" className={styles.whiteLink}>Conoce más <Arrow /></a></div>
          </div>
        </div>
        <div id="historias-territorio" className={styles.caseGrid}>
          {["Encuentro de participantes de una iniciativa de turismo en territorio", "Representantes de JUZT y organizaciones aliadas en una feria", "Productores presentando los resultados de un proyecto", "Jornada de asesoría de JUZT en una feria municipal"].map((alt, i) => (
            <article key={alt} className={styles.caseCard}>
              <div className={styles.casePhoto} data-motion="image" data-motion-exit="true"><Photo name={`case-${i + 1}`} alt={alt} sizes="(max-width: 760px) 85vw, 36vw" /></div>
              <div className={styles.caseCopy} data-motion="quiet" data-motion-delay="100"><h3>Título</h3><p>{placeholder}</p><Link href="/casos-de-exito" className={styles.blueLink} aria-label={`Conoce más sobre casos de éxito, fotografía ${i + 1}`}>Conoce más <Arrow /></Link></div>
            </article>
          ))}
        </div>
      </section>
    </MotionScene>
  );
}
