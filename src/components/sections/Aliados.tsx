import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { aliados } from "@/lib/content";

export function Aliados() {
  const allyGroups = ["principal", "duplicado"] as const;

  return (
    <section id="aliados" className="allies-section" aria-labelledby="allies-title">
      <Reveal className="section-shell" stagger y={16}>
        <header className="section-heading-row" data-reveal-item>
          <div>
            <p className="micro-label">Nuestros aliados</p>
            <h2 id="allies-title">Relaciones que amplían el impacto.</h2>
          </div>
          <p>
            Trabajamos en red con organizaciones que comparten una visión de
            productividad con propósito.
          </p>
        </header>

        <div
          className="allies-marquee"
          role="region"
          aria-label="Organizaciones aliadas de JUZT"
          data-reveal-item
        >
          <div className="allies-track">
            {allyGroups.map((group) => {
              const isDuplicate = group === "duplicado";

              return (
                <ul
                  key={group}
                  className="allies-group"
                  aria-hidden={isDuplicate ? "true" : undefined}
                >
                  {aliados.map((aliado) => (
                    <li key={`${group}-${aliado.name}`}>
                      <Image
                        src={aliado.image}
                        alt={isDuplicate ? "" : aliado.name}
                        width={250}
                        height={100}
                        className="allies-logo"
                      />
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
