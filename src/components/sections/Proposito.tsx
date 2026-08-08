import Image from "next/image";
import { proposito, sectores } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Proposito() {
  return (
    <section
      id="nosotros"
      className="purpose-section"
      aria-labelledby="purpose-title"
    >
      <div className="container-edge purpose-layout">
        <Reveal className="purpose-media">
          <div className="purpose-image-frame">
            <Image
              src="/original/proposito.jpg"
              alt="Planta joven sostenida por manos en un contexto agrícola"
              width={562}
              height={749}
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="purpose-image"
              quality={90}
            />
          </div>
        </Reveal>

        <div className="purpose-content">
          <Reveal>
            <Eyebrow className="purpose-eyebrow">{proposito.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal y={30}>
            <h2 id="purpose-title" className="purpose-title">
              {proposito.title}
            </h2>
          </Reveal>

          <Reveal stagger className="purpose-body">
            {proposito.body.map((p) => (
              <p key={p.slice(0, 24)} data-reveal-item>
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal className="purpose-sectors">
            <p className="purpose-sectors-label">Sectores que atendemos</p>
            <ul className="purpose-sectors-list">
              {sectores.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
