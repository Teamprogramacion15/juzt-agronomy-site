import { diferenciales } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";

export function CapacidadesBand() {
  return (
    <section
      id="diferenciales"
      className="capabilities-band"
      aria-labelledby="diferenciales-title"
    >
      <div className="container-edge">
        <div className="capabilities-layout">
          <Reveal className="capabilities-intro">
            <p className="eyebrow capabilities-eyebrow">Por qué JUZT</p>
            <h2 id="diferenciales-title" className="capabilities-title">
              Cinco capacidades para avanzar con criterio y velocidad
            </h2>
            <p className="capabilities-copy">
              Una forma de trabajar que combina territorio, negocio, técnica y
              relacionamiento.
            </p>
          </Reveal>

          <Reveal stagger className="capabilities-list">
            {diferenciales.map((diferencial, index) => (
              <article
                key={diferencial.title}
                data-reveal-item
                className="capability-card"
              >
                <span className="capability-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="capability-name">{diferencial.title}</h3>
                <p className="capability-body">{diferencial.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
