import Image from "next/image";
import styles from "./AboutPage.module.css";

const differences = [
  "Red estratégica: contactos en instituciones públicas, privadas y cooperativas de todo el territorio nacional.",
  "Visión integral: visión de negocio combinada con conocimiento territorial y humano.",
  "Soluciones completas: diseño e implementación de nuevas unidades de negocio con acompañamiento permanente.",
  "Conocimiento rural: entendimiento real del campo, sus dinámicas y sus productores.",
  "Agilidad ejecutiva: convertimos ideas en proyectos concretos y financiables.",
];
const phases = [
  ["1. Diagnóstico integral", "Análisis técnico y financiero: ingresos, egresos y rentabilidad por línea.", "Informe técnico de diagnóstico estratégico."],
  ["2. Propósito y modelo empresarial", "Redefinición del propósito, diseño del modelo operativo y áreas de diversificación.", "Documento de propósito y líneas estratégicas de negocio."],
  ["3. Co-creación de unidades de negocio", "Taller con líderes y asociados, ideación, priorización y evaluación de factibilidad.", "Portafolio de iniciativas priorizadas."],
  ["4. Indicadores y plan de acción", "Definición de KPIs financieros, técnicos y de gestión, con hitos trimestrales.", "Tablero de indicadores y plan estratégico de ejecución."],
];

export function TeamSection() {
  return <div id="equipo-juzt" className={styles.page}>
    <header className={styles.hero}>
      <Image src="/img/reform/about-team-photo-hq.webp" alt="Equipo de JUZT" width={1024} height={768} sizes="100vw" unoptimized preload />
      <div className={styles.heroIdentity}>
        <h1>Nosotros</h1>
        <div className={styles.heroBrand}>
          <Image src="/img/reform/contact-wordmark.webp" alt="JUZT" width={552} height={332} sizes="(max-width: 760px) 32vw, 20vw" unoptimized />
          <p>Gestión de productividad S.A.S.</p>
        </div>
      </div>
    </header>
    <div className={styles.paper}>
      <div className={styles.content}>
        <section className={styles.purpose} aria-labelledby="about-purpose">
          <h2 id="about-purpose">Nuestro<br /><span>Propósito</span></h2>
          <p>Somos una empresa de gestoría y acompañamiento productivo e inversión con un grupo calificado de profesionales dispuestos a impactar positivamente con servicios justos, productivos y sostenibles.</p>
          <p>Nos enfocamos en brindar consultoría especializada y acompañamiento organizacional para brindar soluciones estratégicas, mejorando la eficiencia, la rentabilidad y sostenibilidad, mediante estrategias innovadoras y de relacionamiento.</p>
        </section>
        <section className={styles.differences} aria-labelledby="about-differences">
          <h2 id="about-differences">Nuestros<br /><span>cinco diferenciales reales</span></h2>
          <ol>{differences.map(item => <li key={item}>{item}</li>)}</ol>
        </section>
        <section className={styles.phases} aria-labelledby="about-phases">
          <h2 id="about-phases" className={styles.mobileHeading}>Así trabajamos<br /><span>por fases</span></h2>
          <Image className={styles.phasesImage} src="/img/reform/about-phases.webp" alt="" width={2172} height={724} sizes="80vw" unoptimized />
          <div className={styles.tableAccess}><table className={styles.phasesTable}>
            <thead><tr><th scope="col">Fase</th><th scope="col">Qué hacemos</th><th scope="col">Entregable</th></tr></thead>
            <tbody>{phases.map(([phase, action, result]) => <tr key={phase}><th scope="row">{phase}</th><td>{action}</td><td>{result}</td></tr>)}</tbody>
          </table></div>
        </section>
        <section className={styles.accompaniment} aria-labelledby="about-accompaniment">
          <h2 id="about-accompaniment">Más que consultoría,<br /><span>un acompañamiento estratégico.</span></h2>
          <p>Nuestra consultoría técnico, Es un acompañamiento cercano a los equipos directivos y a las juntas de las organizaciones, en el que trabajamos con ellos la planeación estratégica y los ayudamos a tomar decisiones. Presentar la consultoría como mentoría y acompañamiento estratégico a organizaciones, no como asesoría genérica.</p>
        </section>
        <div className={styles.signature}><Image src="/img/reform/about-mark.webp" alt="JUZT" width={130} height={155} unoptimized /></div>
      </div>
    </div>
  </div>;
}
