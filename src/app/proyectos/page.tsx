import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { metodologia, proyectos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Tres líneas integradas para estructurar, gestionar y ejecutar proyectos con impacto en el territorio.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosPage() {
  return (
    <>
      <section className="inner-hero inner-hero-projects">
        <div className="section-shell inner-hero-grid">
          <Reveal stagger>
            <p className="micro-label" data-reveal-item>Proyectos</p>
            <h1 data-reveal-item>Estrategia que llega hasta la ejecución.</h1>
          </Reveal>
          <Reveal stagger delay={0.08}>
            <p data-reveal-item>
              Integramos estructuración, gestión y criterio técnico para mover
              proyectos desde una necesidad real hasta resultados medibles.
            </p>
            <a href="#lineas" className="text-link text-link-primary" data-reveal-item>
              Conocer las líneas <span aria-hidden="true">↓</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section id="lineas" className="project-detail-list" aria-label="Líneas de proyectos">
        {proyectos.map((project, index) => (
          <article key={project.id} id={project.id} className="project-detail">
            <div className="section-shell project-detail-grid">
              <Reveal
                className="project-detail-media"
                x={index % 2 === 0 ? -18 : 18}
                y={0}
                scale={0.99}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 899px) 100vw, 48vw"
                  quality={90}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  data-parallax
                />
                <span>{project.index}</span>
              </Reveal>
              <Reveal className="project-detail-copy" stagger>
                <p className="micro-label" data-reveal-item>{project.kicker}</p>
                <h2 data-reveal-item>{project.title}</h2>
                <p className="project-detail-lead" data-reveal-item>{project.summary}</p>
                <p data-reveal-item>{project.detail}</p>
                <div data-reveal-item>
                  <span>Resultado esperado</span>
                  <strong>{project.outcome}</strong>
                </div>
                <a href="#contacto-footer" className="text-link text-link-dark" data-reveal-item>
                  Conversar sobre esta línea <span aria-hidden="true">→</span>
                </a>
              </Reveal>
            </div>
            {index < proyectos.length - 1 ? <span className="project-divider" /> : null}
          </article>
        ))}
      </section>

      <section className="method-section" aria-labelledby="method-title">
        <Reveal className="section-shell method-grid" stagger staggerEach={0.09}>
          <div className="method-intro" data-reveal-item>
            <p className="micro-label">{metodologia.eyebrow}</p>
            <h2 id="method-title">{metodologia.title}</h2>
            <p>{metodologia.intro}</p>
          </div>
          <ol>
            {metodologia.steps.map((step) => (
              <li key={step.phase} data-reveal-item>
                <span>{step.phase}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <p><strong>Entregable:</strong> {step.deliverable}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="page-bridge">
        <Reveal className="section-shell" stagger>
          <p className="micro-label" data-reveal-item>Resultados</p>
          <h2 data-reveal-item>Conoce el impacto antes de iniciar la conversación.</h2>
          <Link href="/casos-de-exito" className="text-link text-link-primary" data-reveal-item>
            Ir a casos de éxito <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
