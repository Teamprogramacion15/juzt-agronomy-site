import { epsea } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";

export function EpseaCredential() {
  return (
    <section className="epsea-section" aria-labelledby="epsea-title">
      <Reveal className="section-shell epsea-grid" stagger y={16}>
        <div className="epsea-code" aria-hidden="true" data-reveal-item>
          {epsea.code}
        </div>

        <h2 id="epsea-title" className="epsea-statement" data-reveal-item>
          Empresa habilitada como {epsea.code} mediante resolución {epsea.resolution} del{" "}
          {epsea.date} de la {epsea.agency} ({epsea.agencyShort}).
        </h2>
      </Reveal>
    </section>
  );
}
