import Image from "next/image";
import { capacidades, originalHeroCopy } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";

/** Capacidades y mensajes que estaban presentes en el home original. */
export function CapacidadesBand() {
  return (
    <section
      className="capabilities-band"
      aria-labelledby="capacidades-title"
    >
      <div className="container-edge">
        <div className="capabilities-layout">
          <Reveal className="capabilities-intro">
            <p className="eyebrow capabilities-eyebrow">
              La productividad se construye en equipo
            </p>
            <h2 id="capacidades-title" className="capabilities-title">
              {originalHeroCopy.objective}
            </h2>
            <p className="capabilities-copy">
              {originalHeroCopy.relationships}
            </p>
          </Reveal>

          <Reveal stagger className="capabilities-list">
            {capacidades.map((capacidad) => (
              <div
                key={capacidad.title}
                data-reveal-item
                className="capability-card"
              >
                <Image
                  src={capacidad.image}
                  alt=""
                  width={90}
                  height={90}
                  className="capability-icon"
                />
                <p className="capability-name">
                  {capacidad.title}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
