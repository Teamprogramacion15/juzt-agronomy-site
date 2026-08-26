import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { casosDeExito, impacto } from "@/lib/content";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description:
    "Impacto verificado de JUZT y espacio para casos de éxito documentados con resultados y testimonios autorizados.",
  alternates: { canonical: "/casos-de-exito" },
};

export default function CasosDeExitoPage() {
  return (
    <>
      <section className="inner-hero cases-hero">
        <Reveal className="section-shell cases-hero-grid" stagger>
          <p className="micro-label" data-reveal-item>{casosDeExito.eyebrow}</p>
          <h1 data-reveal-item>{casosDeExito.title}</h1>
          <p data-reveal-item>{casosDeExito.intro}</p>
        </Reveal>
      </section>

      <section className="cases-impact" aria-labelledby="cases-impact-title">
        <Reveal className="section-shell" stagger staggerEach={0.09}>
          <header data-reveal-item>
            <p className="micro-label">Impacto consolidado</p>
            <h2 id="cases-impact-title">Lo que podemos afirmar hoy.</h2>
          </header>
          <ul>
            {impacto.map((item) => (
              <li key={item.label} data-reveal-item>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="case-editorial" aria-labelledby="case-editorial-title">
        <Reveal className="section-shell case-editorial-grid" stagger staggerEach={0.09}>
          <div data-reveal-item>
            <p className="micro-label">Publicación responsable</p>
            <h2 id="case-editorial-title">
              Cada historia deberá mostrar el reto, la intervención y el resultado.
            </h2>
          </div>
          <div className="case-principles">
            <article data-reveal-item>
              <span>01</span>
              <h3>Contexto verificable</h3>
              <p>Qué organización enfrentaba el reto y cuál era la situación de partida.</p>
            </article>
            <article data-reveal-item>
              <span>02</span>
              <h3>Intervención concreta</h3>
              <p>Qué estructuró, gestionó o ejecutó JUZT y con qué alcance.</p>
            </article>
            <article data-reveal-item>
              <span>03</span>
              <h3>Resultado respaldado</h3>
              <p>Indicadores, aprendizajes y testimonio publicados con autorización.</p>
            </article>
          </div>
        </Reveal>
      </section>

      <section className="cases-note">
        <Reveal className="section-shell cases-note-grid" stagger>
          <p data-reveal-item>{casosDeExito.note}</p>
          <div data-reveal-item>
            <h2>¿Quieres construir el próximo caso con JUZT?</h2>
            <a href="#contacto-footer" className="text-link text-link-primary">
              Hablemos del proyecto <span aria-hidden="true">→</span>
            </a>
            <Link href="/proyectos" className="text-link">
              Conocer las líneas <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
