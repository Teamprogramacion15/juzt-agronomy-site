import type { Metadata } from "next";
import { contact, site } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Aviso de privacidad y tratamiento de datos",
  description:
    "Información sobre el tratamiento de datos personales recolectados a través del sitio web de JUZT.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <article className="legal-page">
      <Reveal className="container-edge legal-page-inner" stagger>
        <p className="eyebrow" data-reveal-item>Información legal</p>
        <h1 data-reveal-item>Aviso de privacidad y tratamiento de datos</h1>
        <p className="legal-page-lead" data-reveal-item>
          Este aviso explica el tratamiento de la información suministrada a
          través de este sitio web y los canales disponibles para ejercer sus
          derechos.
        </p>

        <section data-reveal-item>
          <h2>Responsable del tratamiento</h2>
          <p>
            {site.legalName}, NIT {site.nit}, con ubicación en{" "}
            {contact.location}. Canal de atención:{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </p>
        </section>

        <section data-reveal-item>
          <h2>Información que recopilamos</h2>
          <p>
            El formulario puede solicitar nombre, correo electrónico, teléfono,
            país y la información que la persona decida incluir en su mensaje.
            Las herramientas de medición solo se activan después de una
            autorización expresa y pueden recopilar datos técnicos de
            navegación.
          </p>
        </section>

        <section data-reveal-item>
          <h2>Finalidades</h2>
          <ul>
            <li>Atender consultas y solicitudes de contacto.</li>
            <li>Evaluar necesidades relacionadas con proyectos y servicios.</li>
            <li>Dar seguimiento a conversaciones y propuestas solicitadas.</li>
            <li>Medir el rendimiento del sitio cuando exista autorización.</li>
            <li>Proteger el formulario y la operación técnica del sitio.</li>
          </ul>
        </section>

        <section data-reveal-item>
          <h2>Derechos de los titulares</h2>
          <p>
            La persona titular puede conocer, actualizar y rectificar sus datos;
            solicitar prueba de la autorización; conocer el uso dado a su
            información; presentar consultas o reclamos; y, cuando corresponda,
            revocar la autorización o solicitar la supresión de sus datos.
          </p>
        </section>

        <section data-reveal-item>
          <h2>Consultas y solicitudes</h2>
          <p>
            Para ejercer estos derechos, escriba a{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> indicando su
            nombre, la solicitud y un medio para recibir respuesta.
          </p>
        </section>

        <p className="legal-page-note" data-reveal-item>
          Versión web: agosto de 2026. La política integral de tratamiento de
          datos deberá ser revisada y aprobada por JUZT antes de la publicación
          definitiva del sitio.
        </p>
      </Reveal>
    </article>
  );
}
