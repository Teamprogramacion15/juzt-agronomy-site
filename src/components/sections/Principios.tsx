import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { principios, principiosImages } from "@/lib/content";

export function Principios() {
  return (
    <section
      id="principios"
      className="principles-section"
      aria-labelledby="principios-title"
    >
      <div className="container-edge principles-inner">
        <Reveal>
          <div className="principles-heading-row">
            <span aria-hidden="true" />
            <h2 id="principios-title" className="principles-title">
              Nuestros principios
            </h2>
            <span aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal stagger className="principles-list-shell">
          <ol className="principles-list">
            {principios.map((principio, index) => (
              <li
                key={principio.title}
                data-reveal-item
                className="principle-item"
              >
                <div className="principle-orbit" aria-hidden="true">
                  <span className="principle-orbit-halo" />
                  <Image
                    src={principiosImages[index] ?? principiosImages[3]}
                    alt=""
                    width={400}
                    height={400}
                    sizes="(min-width: 1024px) 14vw, 10rem"
                    className="principle-orbit-artwork principle-orbit-artwork-ring"
                  />
                  <Image
                    src={principiosImages[index] ?? principiosImages[3]}
                    alt=""
                    width={400}
                    height={400}
                    sizes="(min-width: 1024px) 14vw, 10rem"
                    className="principle-orbit-artwork principle-orbit-artwork-number"
                  />
                </div>

                <div className="principle-copy">
                  <h3>{principio.title}</h3>
                  <p>{principio.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
