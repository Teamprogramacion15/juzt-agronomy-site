/**
 * Fuente única de contenido de la marca Juzt.
 *
 * Todo el texto proviene del sitio original (juzt.com.co) — reorganizado y
 * afinado, sin inventar clientes, cifras, certificaciones ni testimonios.
 * Si un dato no existe en la fuente, se marca como pendiente y NO se rellena
 * con contenido ficticio.
 */

export const site = {
  name: "Juzt",
  legalName: "Juzt",
  tagline: "Just productivity",
  domain: "juzt.com.co",
  url: "https://juzt.com.co",
  descriptionShort:
    "Gestoría y consultoría agronómica en Antioquia. Acompañamiento productivo, asistencia técnica y estructuración de proyectos para la cadena agroalimentaria.",
  locality: "Antioquia",
  region: "Antioquia",
  country: "Colombia",
  credit: "Diseño: Dínamo Publicidad",
} as const;

export const contact = {
  email: "gerente@juzt.com.co",
  phoneDisplay: "+57 300 247 8601",
  phoneRaw: "+573002478601",
  // Mismo número de contacto de la empresa; confirmar que tiene WhatsApp activo.
  whatsapp: "https://wa.me/573002478601",
  location: "Antioquia, Colombia",
} as const;

export const social = [
  {
    label: "Instagram",
    handle: "@juzt_productividad",
    href: "https://www.instagram.com/juzt_productividad/",
  },
  {
    label: "Facebook",
    handle: "Juzt",
    href: "https://www.facebook.com/juzt.co?mibextid=LQQJ4d",
  },
] as const;

export const nav = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nuestros Aliados", href: "#aliados" },
  { label: "Oportunidades", href: "#oportunidades" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const hero = {
  eyebrow: "Gestoría y consultoría agronómica · Antioquia",
  // Titular específico — evita frases genéricas tipo "cultivamos el futuro".
  titleLead: "Convertimos conocimiento técnico en",
  titleEmphasis: "productividad agroalimentaria",
  subtitle:
    "Acompañamos a productores, asociaciones y empresas del sector agro con diagnóstico, gestión y ejecución. Decisiones técnicas que se traducen en resultados medibles.",
  primaryCta: { label: "Hablar con un consultor", href: "#contacto" },
  secondaryCta: { label: "Ver servicios", href: "#servicios" },
  pills: [
    "Consultoría especializada",
    "Acompañamiento organizacional",
    "Soluciones estratégicas",
    "Profesionales calificados",
  ],
} as const;

export const proposito = {
  eyebrow: "Nuestro propósito",
  title: "Una firma de gestoría agro enfocada en resultados justos y sostenibles",
  body: [
    "Somos una empresa de gestoría, acompañamiento productivo e inversión, con un grupo calificado de profesionales dispuesto a impactar positivamente mediante servicios justos, productivos y sostenibles.",
    "Nos enfocamos en la consultoría especializada y el acompañamiento organizacional para entregar soluciones estratégicas que mejoran la eficiencia, la rentabilidad y la sostenibilidad, con estrategias innovadoras y de relacionamiento.",
  ],
} as const;

/** Diferenciales — provienen de "Nuestros Diferenciales". Sin cifras inventadas. */
export const diferenciales = [
  {
    title: "Experiencia profesional",
    body: "Un equipo con criterio técnico y trayectoria en el sector agro, agroindustrial y agroalimentario.",
  },
  {
    title: "Equipo de consultores y gestores",
    body: "Perfiles interdisciplinarios que acompañan cada etapa del proceso productivo.",
  },
  {
    title: "Resultados escalables en esquemas asociativos",
    body: "Modelos de trabajo que crecen con asociaciones y unidades productivas.",
  },
  {
    title: "Relacionamiento estratégico",
    body: "Conexiones que abren mercados, financiación y oportunidades reales de negocio.",
  },
  {
    title: "Innovación en productos y servicios",
    body: "Soluciones aplicadas al contexto del productor y de la cadena agroalimentaria.",
  },
  {
    title: "Sellos de calidad",
    body: "Estándares que respaldan la gestión y la confianza en cada entrega.",
  },
] as const;

/**
 * Servicios — nombres y descripciones literales de juzt.com.co.
 * Los cinco primeros cuentan con un sello gráfico publicado por la marca.
 * Gestoría de inversión no tiene uno en la página original, por lo que el
 * rediseño la identifica con una placa institucional sin presentarla como una
 * certificación externa.
 */
export const servicios = [
  {
    id: "gestion-administrativa",
    index: "01",
    sealImage: "/original/servicio-gestion.jpg",
    sealVariant: "original",
    title: "Gestión Administrativa y de negocios",
    summary:
      "Acompañamiento administrativo y asesoría integral en la gestión para el desarrollo empresarial y sostenibilidad económica.",
  },
  {
    id: "comercializacion-agro",
    index: "02",
    sealImage: "/original/servicio-comercializacion.jpg",
    sealVariant: "original",
    title: "Comercialización de productos agro",
    summary: "Línea de productos innovadores para el sector agropecuario.",
  },
  {
    id: "estructuracion-proyectos",
    index: "03",
    sealImage: "/original/servicio-proyectos.jpg",
    sealVariant: "original",
    title: "Ejecución y estructuración de proyectos",
    summary:
      "Bancos de proyectos para impulsar las unidades de negocios y oportunidades del mercado.",
  },
  {
    id: "consultoria-tecnica",
    index: "04",
    sealImage: "/original/servicio-consultoria.jpg",
    sealVariant: "original",
    title: "Consultoría técnica integral",
    summary:
      "Asistencia técnica y acompañamiento estratégico por parte de un equipo interdisciplinario de profesionales.",
  },
  {
    id: "soluciones-financieras",
    index: "05",
    sealImage: "/original/servicio-finanzas.jpg",
    sealVariant: "original",
    title: "Soluciones financieras",
    summary:
      "Gestionamos desde la estructuración y facilitamos la consecución de créditos agropecuarios.",
  },
  {
    id: "gestoria-inversion",
    index: "06",
    sealImage: "/brand/logo_juzt_mark.png",
    sealVariant: "institutional",
    title: "Gestoría de inversión",
    summary:
      "Acceso a fondos de inversión y ángeles inversionista, con un listado de oportunidades de inversión.",
  },
] as const;

/**
 * EPSEA — credencial institucional real, verificada en juzt.com.co:
 * habilitación mediante Resolución 048 del 1 de marzo de 2024 de la ADR.
 */
export const epsea = {
  code: "EPSEA",
  title: "Empresa prestadora de servicios agropecuarios",
  resolution: "048",
  date: "1 de marzo de 2024",
  agency: "Agencia de Desarrollo Rural",
  agencyShort: "ADR",
} as const;

/**
 * Metodología — proceso derivado del lenguaje de la marca ("diagnóstico,
 * gestión, seguimiento y productividad"). Describe cómo trabaja Juzt; no
 * inventa entregables ni plazos específicos.
 */
export const metodologia = {
  eyebrow: "Cómo trabajamos",
  title: "Un acompañamiento por etapas, del diagnóstico a la productividad",
  steps: [
    {
      phase: "01",
      title: "Diagnóstico",
      body: "Entendemos el sistema productivo, sus datos y sus cuellos de botella antes de proponer.",
    },
    {
      phase: "02",
      title: "Gestión y estructuración",
      body: "Definimos el plan, estructuramos proyectos y organizamos la gestión administrativa y financiera.",
    },
    {
      phase: "03",
      title: "Ejecución y acompañamiento",
      body: "Acompañamos en campo con asistencia técnica y relacionamiento estratégico.",
    },
    {
      phase: "04",
      title: "Seguimiento y resultados",
      body: "Medimos, ajustamos y sostenemos la mejora en eficiencia, rentabilidad y sostenibilidad.",
    },
  ],
} as const;

/** Principios — de "Nuestros Principios", redacción afinada. */
export const principios = [
  {
    title: "Vínculos de lealtad",
    body: "Buscamos relaciones sólidas que dejen como resultado el bien común, empezando por el propio equipo de gestores.",
  },
  {
    title: "Prácticos y transparentes",
    body: "Ponemos los panoramas de la gestoría sobre la mesa y nos anticipamos a los riesgos para una buena toma de decisiones.",
  },
  {
    title: "Social y humano",
    body: "Creamos vínculos sanos y sociales, dando lo mejor de cada uno en cada acción.",
  },
  {
    title: "Rentable consciente",
    body: "«Just productivity»: equilibrar la eficiencia con la sostenibilidad organizacional.",
  },
] as const;

export const sectores = [
  "Agropecuario",
  "Agroindustrial",
  "Agroalimentario",
  "Esquemas asociativos",
] as const;

export const contactoCopy = {
  eyebrow: "Contacto",
  title: "Evaluemos su proyecto agro",
  body: "Cuéntenos en qué está trabajando. Un consultor revisará su caso y le propondrá el siguiente paso.",
} as const;

export const footerCopy = {
  mission:
    "Servimos de herramienta para facilitar y agenciar procesos asociativos y empresariales, mediante gestoría y conexiones estratégicas para la cadena agroalimentaria.",
  copyright: `Juzt © ${new Date().getFullYear()} · ${site.domain}`,
} as const;

/** Capacidades destacadas que aparecen en la página original. */
export const capacidades = [
  { title: "Consultoría especializada", image: "/original/icon-consultoria.png" },
  { title: "Acompañamiento organizacional", image: "/original/icon-acompanamiento.png" },
  { title: "Soluciones estratégicas", image: "/original/icon-soluciones.png" },
  { title: "Estrategias innovadoras", image: "/original/icon-innovacion.png" },
  { title: "Profesionales calificados", image: "/original/icon-profesionales.png" },
] as const;

export const originalHeroCopy = {
  objective: "Acompañamiento productivo para alcanzar tus objetivos",
  relationships: "Damos lo mejor de nosotros para crear relaciones sólidas",
} as const;

export const principiosImages = [
  "/original/principio-1.png",
  "/original/principio-2.png",
  "/original/principio-3.png",
  "/original/principio-4.png",
] as const;

export const aliados = [
  { name: "Infinite 1133", image: "/original/aliado-infinite1133.jpg" },
  { name: "Tecnilas", image: "/original/aliado-tecnilas.jpg" },
  { name: "Alagro", image: "/original/aliado-alagro.jpg" },
  { name: "Coopsumerce", image: "/original/aliado-coopsumerce.jpg" },
  { name: "Prodepaz", image: "/original/aliado-prodepaz.jpg" },
  { name: "Gestando", image: "/original/aliado-gestando.jpg" },
] as const;
