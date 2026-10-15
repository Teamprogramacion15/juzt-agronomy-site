import Image from "next/image";
import { ProjectEntrance } from "@/components/motion/ProjectEntrance";
import { MotionScene } from "@/components/motion/MotionScene";
import styles from "./ServiceDetails.module.css";

type Service = "projects" | "equipment" | "finance";

function Photo({ name, alt, sizes, preload }: { name: Service; alt: string; sizes: string; preload: boolean }) {
  const image = name === "equipment" ? "equipment-reference" : `${name}-photo`;
  return <div className={styles.photoAperture} data-project-aperture><div className={styles.photoSurface} data-project-surface><Image src={`/img/reform/${image}${name === "equipment" ? "" : "-hq"}.webp`} alt={alt} fill sizes={sizes} unoptimized preload={preload} /></div></div>;
}

function ServicePanel({ service, primary }: { service: Service; primary: boolean }) {
  const Heading = primary ? "h1" : "h2";

  return service === "projects" ? (
<section id="linea-proyectos" data-project-panel="projects" className={`${styles.servicePanel} ${styles.projectsPanel}`} aria-labelledby="reform-projects-title">
        <div className={styles.serviceCopy} data-motion="editorial" data-motion-exit="true">
          <Heading data-project-heading className={styles.serviceTitle} id="reform-projects-title"><span className={styles.titleLine} data-project-title-line>Proyectos y</span>{" "}<span className={`${styles.titleLine} ${styles.accent}`} data-project-title-line>consultoría</span></Heading>
          <p data-project-lede><strong>Estructuramos, ejecutamos y<br className={styles.desktopBreak} /> acompañamos</strong> proyectos hasta<br className={styles.desktopBreak} /> que producen resultados.</p>
          <div className={styles.includes} data-project-includes><div data-project-content><h3>Incluye:</h3><p>Formulación y ejecución de proyectos,<br className={styles.desktopBreak} /> asistencia técnica, consultoría organizacional<br className={styles.desktopBreak} /> y empresarial, planeación estratégica,<br className={styles.desktopBreak} /> acompañamiento en territorio.</p></div></div>
        </div>
        <div className={styles.servicePhoto} data-project-photo data-motion="image" data-motion-delay="100" data-motion-exit="true"><Photo name="projects" alt="Entrega y acompañamiento de un proyecto productivo en territorio" sizes="(max-width: 760px) 100vw, 60vw" preload={primary} /></div>
      </section>
    ) : service === "equipment" ? (
<section id="linea-equipos" data-project-panel="equipment" className={`${styles.servicePanel} ${styles.equipmentPanel}`} aria-labelledby="reform-equipment-title">
        <div className={styles.servicePhoto} data-project-photo data-motion="image" data-motion-delay="100" data-motion-exit="true"><Photo name="equipment" alt="Productor utilizando un motocultor entre los cultivos" sizes="(max-width: 760px) 100vw, 50vw" preload={primary} /></div>
        <div className={styles.serviceCopy} data-motion="editorial" data-motion-exit="true">
          <Heading data-project-heading className={styles.serviceTitle} id="reform-equipment-title"><span className={styles.titleLine} data-project-title-line>Equipos,</span>{" "}<span className={styles.titleLine} data-project-title-line>insumos y</span>{" "}<span className={`${styles.titleLine} ${styles.accent}`} data-project-title-line>tecnología</span></Heading>
          <p data-project-lede>Conectamos las unidades productivas<br className={styles.desktopBreak} /> con los <strong>equipos, insumos y tecnología</strong><br className={styles.desktopBreak} /> que realmente necesitan.</p>
          <div className={styles.includes} data-project-includes><div data-project-content><h3>Incluye:</h3><p>Maquinaria agrícola, plantas de procesamiento,<br className={styles.desktopBreak} /> equipos e insumos, asesoría en la compra.</p></div></div>
        </div>
      </section>
    ) : (
<section id="linea-financiera" data-project-panel="finance" className={`${styles.servicePanel} ${styles.financePanel}`} aria-labelledby="reform-finance-title">
        <div className={styles.serviceCopy} data-motion="editorial" data-motion-exit="true">
          <Heading data-project-heading className={styles.serviceTitle} id="reform-finance-title"><span className={styles.titleLine} data-project-title-line>Gestión</span>{" "}<span className={`${styles.titleLine} ${styles.accent}`} data-project-title-line>financiera</span></Heading>
          <p data-project-lede>Estructuramos el acceso a recursos para<br />{" "}<strong className={styles.highlight}>proyectos agropecuarios:</strong></p>
          <div className={styles.includes} data-project-includes><div data-project-content><h3>Crédito, garantías<br />e inversión.</h3></div></div>
        </div>
        <div className={styles.servicePhoto} data-project-photo data-motion="image" data-motion-delay="100" data-motion-exit="true"><Photo name="finance" alt="Encuentro con una organización de productores agropecuarios" sizes="(max-width: 760px) 100vw, 55vw" preload={primary} /></div>
      </section>
    );
}

export function ServiceDetails({ service }: { service: Service | "all" }) {
  const services: Service[] = service === "all" ? ["projects", "equipment", "finance"] : [service];

  const Scene = service === "all" ? ProjectEntrance : MotionScene;

  return (
    <Scene className={styles.page}>
      {services.map((item, index) => <ServicePanel key={item} service={item} primary={index === 0} />)}
    </Scene>
  );
}
