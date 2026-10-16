import Image from "next/image";
import { MotionScene } from "@/components/motion/MotionScene";
import { ArrowRight } from "lucide-react";
import { CaseCard, type CaseCardProps } from "./CaseCard";
import styles from "./HomeReform.module.css";

const asset = (name: string) => `/img/reform/${name}${name.startsWith("case-") ? "-hq" : ""}.webp`;
const placeholder = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut";

type CaseItem = Omit<CaseCardProps, "index" | "id">;

const cases: CaseItem[] = [
  {
    photo: "case-san-luis",
    photoAlt: "Técnico de JUZT y un productor junto a un hato de ganado en San Luis, Antioquia",
    title: "Tecnificación ganadera en San Luis (2025)",
    place: "Municipio de San Luis, Antioquia",
    text: "Inseminación artificial a tiempo fijo, capacitación en buenas prácticas ganaderas, sistemas silvopastoriles y acompañamiento técnico en BPA y manejo integrado de plagas en el Oriente Antioqueño.",
    result: "Resultado: 43 unidades productivas ganaderas beneficiadas.",
    gallery: [
      { src: "/img/reform/san-luis-2.webp", alt: "Establo techado con ganado en una unidad productiva de San Luis" },
      { src: "/img/reform/san-luis-1.webp", alt: "Productores y equipo técnico reunidos en una jornada de capacitación" },
      { src: "/img/reform/san-luis-3.webp", alt: "Entrega de insumos silvopastoriles a una productora" },
    ],
  },
  {
    photo: "case-abejorral",
    photoAlt: "Emprendedora de Abejorral con su diploma de reconocimiento y funcionaria de la Alcaldía firmando un acta con una productora",
    title: "Negocios verdes y rutas ecoturísticas en Abejorral (2026)",
    place: "Municipio de Abejorral, Antioquia",
    text: "En el marco del convenio con CORNARE fortalecimos 5 negocios verdes y 2 rutas ecoturísticas con asesoría y entrega de equipos e insumos productivos.",
    result: "Resultado: 5 negocios verdes y 2 rutas ecoturísticas fortalecidos.",
    gallery: [
      { src: "/img/reform/abejorral-3.webp", alt: "Equipo de JUZT dictando una capacitación a emprendedores en Abejorral" },
    ],
  },
  {
    photo: "case-conecta2",
    photoAlt: "Mesa de trabajo con participantes del proyecto CONECTA2 en un auditorio",
    title: "Asociatividad y formalización – Proyecto CONECTA2 (2026)",
    place: "Corporación Mundial de la Mujer Medellín",
    text: "Consultoría para fortalecer el ecosistema asociativo local en Bello, Santa Fe de Antioquia y Gómez Plata.",
    result: "Resultado: 32 empresas fortalecidas en asociatividad y formalización.",
    galleryLayout: "wide",
    gallery: [
      { src: "/img/reform/conecta2-1.webp", alt: "Facilitador acompañando una mesa de trabajo de emprendedores" },
      { src: "/img/reform/conecta2-2.webp", alt: "Taller de asociatividad con participantes en mesas de trabajo" },
      { src: "/img/reform/conecta2-3.webp", alt: "Dinámica grupal al aire libre con participantes del proyecto" },
    ],
  },
  ...[
    "Jornada de asesoría de JUZT en una feria municipal",
  ].map((alt, i) => ({ photo: `case-${i + 4}`, photoAlt: alt, title: "Título", text: placeholder })),
];

function Photo({ name, alt, sizes }: { name: string; alt: string; sizes: string }) {
  return <Image src={asset(name)} alt={alt} fill sizes={sizes} quality={90} />;
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
          {cases.map((c, i) => <CaseCard key={c.photo} id={c.photo} index={i} {...c} />)}
        </div>
      </section>
    </MotionScene>
  );
}
