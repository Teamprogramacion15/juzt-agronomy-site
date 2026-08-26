import { experiencia, impacto } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Experiencia() {
  return (
    <section
      id="experiencia"
      className="experience-section"
      aria-labelledby="experiencia-title"
    >
      <div className="container-edge">
        <div className="experience-heading">
          <Reveal>
            <Eyebrow>{experiencia.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal y={28}>
            <h2 id="experiencia-title" className="experience-title">
              {experiencia.title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="experience-intro">{experiencia.body}</p>
          </Reveal>
        </div>

        <Reveal stagger className="experience-metrics">
          {impacto.map((item) => (
            <div key={item.label} data-reveal-item className="experience-metric">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="experience-relationship">
          <p className="experience-relationship-label">
            Capacidad transversal
          </p>
          <h3>{experiencia.relationshipTitle}</h3>
          <p>{experiencia.relationshipBody}</p>
          <a href="#contacto">Conversemos sobre su iniciativa <span aria-hidden="true">↗</span></a>
        </Reveal>
      </div>
    </section>
  );
}
