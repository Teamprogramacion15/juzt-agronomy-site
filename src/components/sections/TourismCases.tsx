import Image from "next/image";
import { MotionScene } from "@/components/motion/MotionScene";
import { ArrowRight } from "lucide-react";
import { CaseCard, type CaseCardProps } from "./CaseCard";
import styles from "./HomeReform.module.css";


type CaseItem = Omit<CaseCardProps, "index" | "id">;

const cases: CaseItem[] = [
  {
    photo: "case-san-luis",
    photoAlt: "Técnico de JUZT y un productor junto a un hato de ganado en San Luis, Antioquia",
    title: "Tecnificación ganadera en San Luis",
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
    photo: "case-abejorral-duo",
    photoAlt: "Emprendedora de Abejorral con su diploma de reconocimiento y funcionaria de la Alcaldía firmando un acta con una productora",
    title: "Negocios verdes y rutas ecoturísticas en Abejorral",
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
    title: "Asociatividad y formalización – Proyecto CONECTA2",
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
  {
    photo: "case-butica-v2",
    photoAlt: "Participantes en una sesión de capacitación de JUZT con presentación en pantalla",
    title: "Empresas con enfoque de género en Buticá",
    place: "Corporación Mundial de la Mujer Medellín",
    text: "Encuentros grupales y personalizados para consolidar el componente asociativo con enfoque de género.",
    result: "Resultado: 12 empresas fortalecidas.",
    gallery: [
      { src: "/img/reform/butica-4.webp", alt: "Sesión de capacitación grupal con participantes y equipo de JUZT en Buticá" },
      { src: "/img/reform/butica-1.webp", alt: "Facilitador de JUZT explicando costos y gastos en un tablero" },
      { src: "/img/reform/butica-2.webp", alt: "Participante tomando apuntes durante una sesión en el concejo municipal" },
      { src: "/img/reform/butica-3.webp", alt: "Participante atento durante el encuentro de asociatividad" },
    ],
  },
  {
    photo: "case-launion",
    photoAlt: "Mujeres rurales de La Unión con el material entregado por JUZT",
    title: "Seguridad y soberanía alimentaria en La Unión",
    place: "Municipio de La Unión, Antioquia",
    text: "Suministro de insumos y plántulas a un grupo de mujeres rurales.",
    result: "Resultado: 40 mujeres beneficiadas.",
  },
  {
    photo: "case-lactea",
    photoAlt: "Reunión de planeación estratégica con productores de la cadena láctea",
    title: "Cadena láctea: CORPOLECHE y COOLESA",
    text: "Planeación estratégica, fortalecimiento asociativo y comercial, y capacitación para organizaciones de la cadena láctea.",
    result: "Resultado: 96 beneficiarios en CORPOLECHE y 62 en COOLESA.",
    galleryLayout: "wide",
    gallery: [
      { src: "/img/reform/lactea-1.webp", alt: "Productores de COOLESA posando frente al logotipo de la cooperativa" },
      { src: "/img/reform/lactea-2.webp", alt: "Mesa de trabajo de acompañamiento estratégico y gerencial con productores lácteos" },
    ],
  },
];

function Arrow() { return <ArrowRight aria-hidden="true" strokeWidth={1.5} />; }

export function TourismCases() {
  return (
    <MotionScene className={`${styles.reform} ${styles.tourismPage}`}>
      <section id="rutas-turismo" className={styles.cases} aria-labelledby="tourism-cases-title">
        <div className={styles.tourismHero}>
          <Image src="/img/reform/tourism-banner-hq.webp" alt="Cascada rodeada de bosque y un arcoíris" fill sizes="100vw" quality={100} priority />
          <div className={styles.tourismCopy} data-motion="title" data-motion-exit="true">
            <h1 id="tourism-cases-title">Experiencia que se siente<br />en el territorio</h1>
            <p className={styles.tourismSub}>Desde 2024 acompañamos a municipios, cooperativas, asociaciones y fundaciones de Antioquia y Boyacá en el fortalecimiento de sus organizaciones, la tecnificación de sus unidades productivas y la comercialización de lo que el campo produce.</p>
            <div><a href="#historias-territorio" className={styles.whiteLink}>Conoce más <Arrow /></a></div>
          </div>
        </div>
        <div id="historias-territorio" className={styles.caseGrid}>
          {cases.map((c, i) => <CaseCard key={c.title} id={`caso-${i + 1}`} index={i} {...c} />)}
        </div>
      </section>
    </MotionScene>
  );
}
