import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/sections/HomeHero";
import { ImpactNumbers } from "@/components/sections/ImpactNumbers";
import { EpseaCredential } from "@/components/sections/EpseaCredential";
import { Aliados } from "@/components/sections/Aliados";
import { Reveal } from "@/components/motion/Reveal";
import { proyectos } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ImpactNumbers />
      <EpseaCredential />

      <section id="nosotros" className="project-statement" aria-labelledby="statement-title">
        <div className="section-shell statement-grid">
          <Reveal className="statement-media" x={-18} y={0} scale={0.99}>
            <p className="micro-label">Proyectos que conectan estrategia y territorio</p>
            <div className="statement-image">
              <Image
                src="/original/proposito.jpg"
                alt="Planta joven sostenida por manos en un contexto agrícola"
                fill
                sizes="(max-width: 899px) 100vw, 38vw"
                quality={90}
                data-parallax
              />
            </div>
          </Reveal>
          <Reveal className="statement-copy" stagger>
            <h2 id="statement-title" data-reveal-item>
              Estructuramos, gestionamos y ejecutamos proyectos de principio a fin.
            </h2>
            <p data-reveal-item>
              Conectamos la visión estratégica con el trabajo en territorio para
              convertir oportunidades en proyectos viables, decisiones claras y
              resultados que se pueden sostener.
            </p>
            <Link href="/proyectos" className="text-link text-link-dark" data-reveal-item>
              Ver nuestra forma de trabajar <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="project-lines" aria-labelledby="project-lines-title">
        <div className="section-shell">
          <Reveal className="section-heading-row" stagger>
            <div data-reveal-item>
              <p className="micro-label">Líneas estratégicas</p>
              <h2 id="project-lines-title">Una consultoría que también ejecuta.</h2>
            </div>
            <Link href="/proyectos" className="round-arrow" aria-label="Ver todos los proyectos" data-reveal-item>
              ↗
            </Link>
          </Reveal>

          <Reveal className="project-line-grid" stagger staggerEach={0.1}>
            {proyectos.map((project) => (
              <article key={project.id} className="project-line-card" data-reveal-item>
                <div className="project-line-image">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    quality={90}
                  />
                  <span>{project.index}</span>
                </div>
                <p className="micro-label">{project.kicker}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <Link href={`/proyectos#${project.id}`} aria-label={`Conocer ${project.title}`}>
                  Explorar la línea <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <Aliados />
    </>
  );
}
