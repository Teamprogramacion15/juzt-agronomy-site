# Juzt — sitio web

Rediseño integral del sitio de **Juzt**, firma de gestoría y consultoría
agronómica en Antioquia (Colombia). _Just productivity._

Sitio de una sola página, construido a medida — sin plantillas — con una
dirección de arte territorial y una escena 3D de terreno productivo.

---

## Stack

| Área        | Tecnología                                            |
| ----------- | ----------------------------------------------------- |
| Framework   | Next.js 16 (App Router) · React 19 · TypeScript estricto |
| Estilos     | Tailwind CSS v4 + design tokens (CSS variables)       |
| Animación   | GSAP 3 + ScrollTrigger + **SplitText** · **Lenis** (scroll suave) |
| 3D          | Three.js + React Three Fiber 9 + drei                 |
| Formularios | React Hook Form + Zod (validación cliente y servidor) |
| Calidad     | ESLint (flat config de Next) · TypeScript · Playwright |

Gestor de paquetes: **npm**. Node LTS (probado con Node 24).

---

## Comandos

```bash
npm install            # instalar dependencias
npm run dev            # desarrollo (http://localhost:3000)
npm run build          # build de producción
npm run start          # servir el build
npm run lint           # ESLint
npm run typecheck      # TypeScript (tsc --noEmit)
npm run test:e2e       # Playwright (levanta el server en :3100 solo)
```

Estado de validación (este entorno): `lint` ✓ · `typecheck` ✓ · `build` ✓ ·
`test:e2e` ✓ (5/5 en Chromium). Firefox/WebKit están configurados en
`playwright.config.ts`; ejecuta `npx playwright install` para correrlos.

---

## Estructura

```
src/
  app/
    layout.tsx           # fuentes (next/font), metadata, JSON-LD, skip link
    page.tsx             # composición de secciones
    globals.css          # design tokens + base + utilidades
    api/contact/route.ts # endpoint del formulario (valida + envía si hay proveedor)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx not-found.tsx
  components/
    layout/              # Header (menú móvil), Footer, Logo
    sections/            # Hero, Proposito, Servicios, Diferenciales,
                         # Metodologia, Principios, Aliados, Contacto, ContactForm
    three/               # HeroVisual (gate) · TerrainCanvas · TerrainField ·
                         # shaders.ts (GLSL) · TerrainFallback (SVG)
    motion/Reveal.tsx    # revelado por scroll con GSAP
    ui/                  # Button, Eyebrow, SectionHeading
  lib/
    content.ts           # ÚNICA fuente de contenido de marca (texto real)
    contact-schema.ts    # esquema Zod compartido
    seo.ts  gsap.ts  utils.ts
legacy/                  # copia del sitio WordPress original (referencia)
tests/e2e/               # smoke tests Playwright
```

---

## Contenido y variables

- Todo el texto vive en [`src/lib/content.ts`](src/lib/content.ts). Editar ahí.
- Copia `.env.example` a `.env.local`:
  - `NEXT_PUBLIC_SITE_URL` — usado por metadata, sitemap, robots, OG.
  - Envío del formulario: sin `RESEND_API_KEY`/`CONTACT_FROM_EMAIL`, el endpoint
    **valida y registra** la solicitud pero responde `delivered:false` y la UI
    invita a escribir por correo/WhatsApp. **No se simula un envío exitoso.**

## Pendientes de contenido (no se inventó nada)

- **Logotipo oficial**: hoy hay un wordmark tipográfico en
  [`Logo.tsx`](src/components/layout/Logo.tsx). Reemplazar por el SVG/PNG real.
- **Aliados**: la sección deja espacios listos; faltan logotipos verificables.
- **Fotografía**: no hay banco de imágenes reales del equipo/campo. La
  dirección de arte funciona sin fotos; cuando existan, incorporar en
  Propósito/Servicios (campo antioqueño, visitas técnicas, procesos).
- **WhatsApp**: se enlaza el mismo número de contacto (`+57 300 247 8601`);
  confirmar que tiene WhatsApp activo.
- **Casos/resultados/equipo**: no se crearon secciones con cifras o nombres por
  no existir datos reales.

---

## Sistema de animación (estructura inspirada en farmminerals.com)

Réplica de la **estructura** de animación de la referencia (no del contenido ni
del código), con GSAP en vez de Webflow/Lenis/Lottie:

| Referencia (Farm Minerals) | Implementación en Juzt |
| -------------------------- | ---------------------- |
| Lenis (scroll suave)       | `ScrollSmoother` — [SmoothScroll.tsx](src/components/motion/SmoothScroll.tsx), parallax por `data-speed` |
| Preloader con logo Lottie  | [Preloader.tsx](src/components/motion/Preloader.tsx) — cortina + wordmark; una vez por sesión; backstop 4 s |
| Titulares SplitText        | [SplitReveal.tsx](src/components/motion/SplitReveal.tsx) — revelado por líneas con máscara |
| Reveals escalonados        | [Reveal.tsx](src/components/motion/Reveal.tsx) |
| Ilustraciones Lottie       | Terreno 3D (héroe) + glifos SVG animados por servicio ([ServiceGlyph.tsx](src/components/ui/ServiceGlyph.tsx)) |
| Imágenes full-bleed + parallax | [ParallaxBand.tsx](src/components/sections/ParallaxBand.tsx) (Territorio y Acompañamiento) |
| Contadores                 | Omitidos — no hay cifras reales verificables |

Todo respeta `prefers-reduced-motion` (sin preloader, sin smooth-scroll, sin
animaciones) y en táctil usa scroll nativo. SplitText y ScrollSmoother son
gratuitos desde GSAP 3.13.

## Imágenes

Generadas con Adobe/Firefly (Google Nano Banana Pro) y optimizadas a WebP en
[`public/img/`](public/img). Escenas de territorio agrícola de Antioquia, sin
personas identificables ni evidencias inventadas. Reemplazables por fotografía
real de Juzt cuando exista. Los prompts usados quedaron documentados en el chat.

## Notas técnicas

- **3D**: la escena (`TerrainField`) es decorativa (`aria-hidden`). El contenido
  esencial es HTML semántico. Se carga con `dynamic(ssr:false)`, se pausa fuera
  de viewport y con pestaña oculta, limita el DPR, baja calidad con
  `PerformanceMonitor` y tiene alternativa estática (SVG) para
  `prefers-reduced-motion`, sin WebGL, `save-data` o hardware limitado.
- **Motion**: GSAP + ScrollTrigger para revelados y la línea de metodología.
  Todo respeta `prefers-reduced-motion` (contenido visible de inmediato).
- **Accesibilidad**: skip link, foco visible, jerarquía de encabezados, labels
  asociados, validación con `role="alert"`, navegación por teclado.
- **SEO**: Metadata API, Open Graph + imagen generada, JSON-LD
  (`ProfessionalService`), sitemap, robots, canonical.

Diseño original del sitio previo: **Dínamo Publicidad**.
