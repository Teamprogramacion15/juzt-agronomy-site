# JUZT — sitio web 2026

Sitio institucional de JUZT para presentar tres líneas integradas: ejecución y
estructuración de proyectos, gestión administrativa y de negocios, y
consultoría técnica en planeación estratégica.

La arquitectura vigente se basa en `Estructura Web Juzt 2026.docx`: una
portada institucional sobria y móvil primero, con páginas independientes para
Proyectos y Casos de éxito. Todas las rutas comparten un footer de contacto con
formulario, WhatsApp y datos corporativos.

La identidad vigente usa los logotipos oficiales de JUZT, Pitagon Serif para
titulares y la paleta `#192147`, `#1C609B`, `#FFFFFF` y `#EDEDED`.

## Stack y comandos

- Next.js 16, React 19 y TypeScript.
- Tailwind CSS v4 y variables de diseño.
- React Hook Form + Zod.
- Playwright para pruebas E2E.

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

## Dónde editar

- Contenido corporativo: `src/lib/content.ts`.
- Composición de la portada: `src/app/page.tsx`.
- Página de proyectos: `src/app/proyectos/page.tsx`.
- Página de casos: `src/app/casos-de-exito/page.tsx`.
- SEO y JSON-LD: `src/app/layout.tsx` y `src/lib/seo.ts`.
- Diseño responsive: `src/app/globals.css`.
- Formulario: `src/components/sections/ContactForm.tsx`.
- Aviso web de privacidad: `src/app/privacidad/page.tsx`.
- Lista de insumos pendientes: `docs/PENDIENTES_JUZT_2026.md`.

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

- `NEXT_PUBLIC_SITE_URL`.
- `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`.
- `RESEND_API_KEY` o la configuración SMTP.
- `NEXT_PUBLIC_GOOGLE_TAG_ID`.
- `NEXT_PUBLIC_META_PIXEL_ID`.
- `NEXT_PUBLIC_CLARITY_ID`.

Google Analytics, Meta Pixel y Microsoft Clarity solo se cargan después de una autorización
expresa del visitante. Si no hay identificadores, no se muestra el aviso de
medición ni se carga ningún script.

## Criterios de contenido

- No se publican casos, testimonios, integrantes ni resultados no autorizados.
- La página de Casos de éxito conserva esa restricción de forma visible hasta
  recibir contenido verificable y autorizado.
- Las cifras de impacto provienen del documento 2026 y deben conservar su
  soporte y fecha de corte.
- EPSEA se presenta como habilitación institucional concreta, no como una
  galería genérica de sellos.
- Equipos e insumos enlaza al sitio especializado de JUZT Maquinaria:
  `https://juztmaquinaria.lovable.app/`.
- Las imágenes actuales mantienen la composición, pero son temporales hasta
  recibir el banco fotográfico real de JUZT.

## Verificación

La comprobación mínima antes de publicar es:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

La interfaz respeta `prefers-reduced-motion`, usa scroll nativo en táctil,
incluye navegación por teclado, foco visible, jerarquía semántica, Open Graph,
JSON-LD, sitemap, robots y canonical.
