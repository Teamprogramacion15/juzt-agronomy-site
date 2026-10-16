/**
 * Fuente única de contenido de JUZT.
 *
 * Actualizada a partir de Respuestas_Web_JUZT_para_Dinamo_v2.docx.
 * No se publican casos, testimonios, integrantes ni enlaces que la empresa
 * todavía no haya entregado y autorizado.
 */

export const site = {
  name: "JUZT",
  legalName: "JUZT",
  nit: "901.767.156",
  tagline: "Just productivity",
  domain: "juzt.com.co",
  url: "https://juzt.com.co",
  descriptionShort:
    "JUZT ejecuta y estructura proyectos, fortalece la gestión empresarial y acompaña la planeación estratégica de organizaciones rurales, empresas agro y entidades públicas y privadas en Colombia.",
  locality: "La Ceja",
  region: "Antioquia",
  country: "Colombia",
  credit: "Diseño: Dínamo Publicidad",
} as const;

export const contact = {
  email: "gerencia@juzt.com.co",
  secondaryEmail: "juztproductividad@gmail.com",
  phoneDisplay: "+57 311 334 1341",
  phoneRaw: "+573113341341",
  whatsapp:
    "https://wa.me/573113341341?text=Hola%20JUZT%2C%20quiero%20conversar%20sobre%20un%20proyecto.",
  equipmentUrl: "https://juztmaquinaria.lovable.app/",
  location: "La Ceja, Antioquia, Colombia",
} as const;

export const social = [
  {
    label: "Instagram",
    handle: "@juzt_productividad",
    href: "https://www.instagram.com/juzt_productividad/",
  },
  {
    label: "Facebook",
    handle: "JUZT",
    href: "https://www.facebook.com/juzt.co?mibextid=LQQJ4d",
  },
  {
    label: "LinkedIn",
    handle: "Juzt Productividad",
    href: "https://www.linkedin.com/company/juzt-productividad/?originalSubdomain=co",
  },
] as const;

export const hero = {
  eyebrow: "Consultoría para el territorio",
  title: "Convertimos oportunidades en resultados.",
  subtitle:
    "Estructuramos y ejecutamos proyectos estratégicos que fortalecen empresas, organizaciones y territorios.",
  primaryCta: { label: "Hablemos de tu proyecto", href: contact.whatsapp },
  secondaryCta: { label: "Conoce nuestros proyectos", href: "/proyectos" },
} as const;

export const impacto = [
  { value: "37", label: "municipios atendidos" },
  { value: "1.510", label: "personas impactadas" },
  { value: "8", label: "proyectos ejecutados" },
  { value: "21", label: "organizaciones acompañadas" },
] as const;

export const epsea = {
  code: "EPSEA",
  title: "Habilitación para prestar servicios de extensión agropecuaria",
  resolution: "número 187 de 2026",
  agency: "Agencia de Desarrollo Rural",
  agencyShort: "ADR",
  documentTitle: "Resolución 187 de 2026 · Habilitación EPSEA JUZT",
  documentHref: "/docs/resolucion-187-2026-epsea-juzt.pdf",
  body: "Esta habilitación respalda nuestra capacidad institucional para acompañar procesos de extensión agropecuaria con enfoque técnico, organizacional y territorial.",
} as const;

export const footerCopy = {
  mission:
    "Estructuramos y ejecutamos proyectos, fortalecemos negocios y acompañamos decisiones estratégicas con conocimiento rural.",
  copyright: "© 2026 Copyright:",
} as const;

