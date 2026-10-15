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

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Casos de éxito", href: "/casos-de-exito" },
  { label: "Contacto", href: "#contacto-footer" },
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

export const proposito = {
  eyebrow: "Quiénes somos",
  title: "Estrategia, ejecución y conocimiento rural en una sola firma",
  body: [
    "JUZT acompaña a organizaciones rurales, empresas agro y entidades públicas y privadas para convertir desafíos complejos en proyectos viables, negocios sostenibles y decisiones estratégicas.",
    "Integramos criterio técnico, gestión empresarial y relacionamiento para que cada intervención avance del diagnóstico a la ejecución y deje capacidades instaladas en el territorio.",
  ],
} as const;

export const diferenciales = [
  {
    title: "Red estratégica",
    body: "Articulamos actores públicos, privados y territoriales para movilizar conocimiento, oportunidades y recursos.",
  },
  {
    title: "Visión integral",
    body: "Conectamos las dimensiones técnica, financiera, administrativa y humana de cada iniciativa.",
  },
  {
    title: "Soluciones completas",
    body: "Acompañamos desde el diagnóstico y la estructuración hasta la ejecución y el seguimiento.",
  },
  {
    title: "Conocimiento rural",
    body: "Entendemos el territorio, la asociatividad y las dinámicas de las cadenas agroalimentarias.",
  },
  {
    title: "Agilidad ejecutiva",
    body: "Convertimos la estrategia en prioridades, responsables, indicadores y acciones concretas.",
  },
] as const;

export const proyectos = [
  {
    id: "estructuracion-ejecucion",
    index: "01",
    kicker: "Del concepto a la ejecución",
    title: "Ejecución y estructuración de proyectos",
    summary:
      "Diseñamos, estructuramos y ejecutamos iniciativas productivas y territoriales con viabilidad técnica, financiera y operativa.",
    detail:
      "Organizamos objetivos, alcance, presupuesto, aliados, cronograma e indicadores para convertir una necesidad en un proyecto gestionable y medible.",
    outcome: "Proyectos viables, articulados y listos para generar impacto.",
    image: "/img/project-execution.jpeg",
    imageAlt: "Equipo técnico evaluando un proyecto productivo en territorio",
  },
  {
    id: "gestion-empresarial",
    index: "02",
    kicker: "Organizaciones sostenibles",
    title: "Gestión administrativa y de negocios",
    summary:
      "Fortalecemos modelos empresariales, procesos administrativos y unidades de negocio para mejorar su sostenibilidad y rentabilidad.",
    detail:
      "Acompañamos la lectura financiera, la definición del propósito, la diversificación y la priorización de oportunidades con los equipos líderes.",
    outcome: "Decisiones de negocio con estructura, foco y capacidad de ejecución.",
    image: "/img/project-management.jpeg",
    imageAlt: "Equipo de trabajo reunido alrededor de una mesa de gestión",
  },
  {
    id: "mentoria-estrategica",
    index: "03",
    kicker: "Decisiones con respaldo técnico",
    title: "Consultoría técnica en planeación estratégica",
    summary:
      "Mentoría y acompañamiento para juntas directivas, gerencias, asociaciones de productores, cooperativas y entidades públicas.",
    detail:
      "Facilitamos conversaciones estratégicas, definimos indicadores y construimos planes de acción que alinean la dirección con la realidad productiva y territorial.",
    outcome: "Gobierno, gestión y operación conectados por una ruta común.",
    image: "/img/project-consulting.jpeg",
    imageAlt: "Taller participativo de planeación estratégica con organizaciones rurales",
  },
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

export const metodologia = {
  eyebrow: "Nuestro método",
  title: "Del diagnóstico a un plan que se puede ejecutar y medir",
  intro:
    "Cuatro fases conectan la realidad de la organización con decisiones, entregables y una ruta de ejecución.",
  steps: [
    {
      phase: "01",
      title: "Diagnóstico integral",
      body: "Analizamos la situación técnica y financiera, incluidos ingresos, egresos y rentabilidad.",
      deliverable: "Informe técnico de diagnóstico estratégico.",
    },
    {
      phase: "02",
      title: "Propósito y modelo empresarial",
      body: "Redefinimos el propósito, el modelo operativo y las alternativas de diversificación.",
      deliverable: "Documento de propósito y líneas estratégicas de negocio.",
    },
    {
      phase: "03",
      title: "Cocreación de unidades de negocio",
      body: "Trabajamos con líderes y asociados para idear, priorizar y validar oportunidades.",
      deliverable: "Portafolio priorizado de unidades de negocio.",
    },
    {
      phase: "04",
      title: "Indicadores y plan de acción",
      body: "Definimos indicadores financieros, técnicos y de gestión, con hitos trimestrales.",
      deliverable: "Tablero de indicadores y plan estratégico de ejecución.",
    },
  ],
} as const;

export const principios = [
  {
    title: "Relaciones leales",
    body: "Buscamos el bien común y construimos vínculos sólidos con equipos, aliados y territorios.",
  },
  {
    title: "Gestión práctica y transparente",
    body: "Ponemos la información y los riesgos sobre la mesa para tomar mejores decisiones.",
  },
  {
    title: "Mirada social y humana",
    body: "Reconocemos a las personas y sus capacidades como parte central de cada proceso.",
  },
  {
    title: "Rentabilidad consciente",
    body: "Equilibramos productividad, sostenibilidad organizacional e impacto territorial.",
  },
] as const;

export const principiosImages = [
  "/original/principio-1.png",
  "/original/principio-2.png",
  "/original/principio-3.png",
  "/original/principio-4.png",
] as const;

export const audiencias = [
  "Organizaciones rurales",
  "Empresas agro",
  "Asociaciones y cooperativas",
  "Entidades públicas y privadas",
] as const;

export const experiencia = {
  eyebrow: "Experiencia comprobada",
  title: "Capacidad de ejecución en territorio y articulación institucional",
  body: "Nuestra experiencia conecta organizaciones rurales, empresas y entidades para llevar iniciativas estratégicas a resultados concretos.",
  relationshipTitle: "Relacionamiento público y privado",
  relationshipBody:
    "Construimos puentes entre organizaciones productivas, aliados técnicos, empresas y entidades para fortalecer la viabilidad y el alcance de cada proyecto.",
} as const;

export const contactoCopy = {
  eyebrow: "Hablemos",
  title: "Convirtamos su desafío en un proyecto ejecutable",
  body: "Cuéntenos qué necesita fortalecer, estructurar o poner en marcha. Revisaremos el contexto y definiremos el siguiente paso.",
} as const;

export const casosDeExito = {
  eyebrow: "Casos de éxito",
  title: "Resultados que merecen ser contados con evidencia.",
  intro:
    "JUZT ha ejecutado ocho proyectos y acompañado a veintiuna organizaciones. Los casos detallados y sus testimonios están en proceso de documentación y validación antes de publicarse.",
  note:
    "No publicamos nombres, testimonios ni resultados individuales sin autorización y soporte verificable.",
} as const;

export const footerCopy = {
  mission:
    "Estructuramos y ejecutamos proyectos, fortalecemos negocios y acompañamos decisiones estratégicas con conocimiento rural.",
  copyright: "© 2026 Copyright:",
} as const;

export const aliados = [
  { name: "Tecnilac Wilgo", image: "/original/aliado-tecnilas.jpg" },
  { name: "Alagro", image: "/original/aliado-alagro.jpg" },
  { name: "Coopsumerce", image: "/original/aliado-coopsumerce.jpg" },
  { name: "Prodepaz", image: "/original/aliado-prodepaz.jpg" },
  { name: "Gestando", image: "/original/aliado-gestando.jpg" },
] as const;
