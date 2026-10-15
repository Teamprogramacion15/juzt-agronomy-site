import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { epsea } from "@/lib/content";
import { EpseaDocumentDialog } from "./EpseaDocumentDialog";

export function EpseaCredential() {
  return (
    <section className="epsea-section" aria-labelledby="epsea-title">
      <div className="epsea-grid">
        <Reveal className="epsea-identity" y={16} duration={0.9}>
          <h2 id="epsea-title" className="epsea-code">{epsea.code}</h2>
          <p className="epsea-definition">
            Entidad Prestadora del Servicio de<br />{" "}
            Extensión Agropecuaria en Colombia
          </p>
        </Reveal>
        <div className="epsea-divider" aria-hidden="true" />
        <div className="epsea-details">
          <Reveal className="epsea-logo" y={12} scale={0.88} rotation={-3} delay={0.18} duration={0.95}>
            <Image src="/brand/logo_juzt_home.png" alt="Juzt" width={265} height={86} />
          </Reveal>
          <p className="epsea-statement">
            es una empresa habilitada como <strong>EPSEA mediante resolución {epsea.resolution}</strong> de la {epsea.agency} ({epsea.agencyShort}).
          </p>
          <EpseaDocumentDialog />
        </div>
      </div>
    </section>
  );
}
