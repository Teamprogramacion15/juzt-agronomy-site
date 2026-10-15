# Reforma gráfica JUZT — Home_4 a Home_10

Implementada localmente el 2026-10-01 a partir de las guías en `C:/Users/joseg/Desktop/carpetas/Dinamo/Paginas_web/juzt_reforma/untitled folder`.

## Publicación — 2026-10-05

Publicada por petición del usuario en [juzt.vercel.app](https://juzt.vercel.app), despliegue `dpl_GbEwsDTk3k28uhsgh9jQppsnYpRp`, estado READY y destino production. [URL del despliegue](https://juzt-4ni233slr-josegaviria1515-1828s-projects.vercel.app). Build remoto correcto; diez comprobaciones E2E de tarjetas, CTA, recarga y entrada/salida/retorno verificadas contra producción en Chromium y Pixel 7. Los primeros tiempos de espera locales se ampliaron únicamente en la configuración temporal de verificación remota para las cargas de red. Sin errores de página en las pruebas de entrada. La subida excluye archivos temporales, logs y la implementación histórica mediante `.vercelignore`.

## Distribución actualizada — 2026-10-05

Por instrucción del usuario, `/proyectos` reúne ahora los tres paneles de `Home_7_slide_2.pdf`, `Home_7_slide_3.pdf` y `Home_7_slide_4.pdf`, en ese orden y como secciones consecutivas. El botón «Conoce nuestros proyectos» del primer slide apunta a `/proyectos`. Las tres tarjetas de Líneas estratégicas apuntan a `/proyectos#linea-proyectos`, `/proyectos#linea-equipos` y `/proyectos#linea-financiera`, respectivamente: el fragmento conserva el destino al recargar y se respeta el desplazamiento global del header. Se conserva un único h1 y los otros paneles usan h2 con la misma presentación visual. Las rutas individuales de Equipos y Gestión financiera siguen disponibles. El contacto común aparece al terminar los tres paneles.

## Entradas de Proyectos — 2026-10-05

`ProjectEntrance.tsx` añade una apertura diagonal de fotografía desde la unión con el texto, alternando la dirección según cada panel. La fotografía interior se asienta en su encuadre original; los títulos se despliegan por líneas y los bloques de descripción e inclusión esperan individualmente a entrar en pantalla. Duración de la apertura: 1250 ms en escritorio y 950 ms en móvil. Se usa IntersectionObserver y Web Animations, sin librerías adicionales, listeners continuos de scroll ni cambios de altura. La entrada se ejecuta una vez por visita. Sin JavaScript y con movimiento reducido, los tres paneles se muestran completos. La preferencia también se aplica cuando cambia con la página abierta. Las rutas individuales mantienen MotionScene.

Base técnica consultada: [Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) y [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path). Verificación de las entradas en `tests/e2e/project-entrance.spec.ts` y navegación/adaptación en `tests/e2e/service-navigation.spec.ts`.

Petición posterior: las mismas formas tienen salida y retorno. Un segundo observador arma cada bloque cuando se ha visto al menos el 34 %; el cierre se activa cuando queda como máximo el 24 % visible. La fotografía cierra su apertura, las líneas del título se repliegan y el texto acompaña la dirección del scroll. Duración: 650 ms en escritorio y 520 ms en móvil. Al volver se restaura desde el fotograma actual, incluyendo cambios rápidos de dirección. Las animaciones persistentes de salida se cancelan al volver o activar movimiento reducido. Se evita cerrar un bloque que contenga el foco. El área observada permanece estable: las máscaras de foto e inclusiones se animan dentro del contenedor, para que su recorte no altere el cálculo de intersección en Chromium.

## Antecedente de distribución — 2026-10-02

La instrucción posterior del usuario reemplaza el orden inicial: el inicio conserva Home_1–8 excepto los paneles de servicio. Las tres tarjetas completas de Home_6 tienen hover y llevan a `/proyectos`, `/equipos-e-insumos` y `/gestion-financiera`. Cada ruta muestra su panel de referencia, sin carrusel ni etiquetas de línea.

Home_9 vive en `/casos-de-exito`; Home_10 vive en `/nosotros`. El navbar y el menú móvil abren las rutas propias de Nosotros y Equipos. Los componentes `ServiceDetails`, `TourismCases` y `TeamSection` comparten el CSS module de la reforma. El footer común sigue en las rutas interiores.

## Contrato inicial (superado en distribución)

- Conservar Home_1, Home_2 y Home_3, incluido el video y las cifras.
- Presentar las referencias en orden numérico. El usuario decidió revisar el orden después de ver la implementación.
- Texto HTML seleccionable con la Pitagon Sans local existente; las guías completas no se usan como imágenes de sección.
- Home_7.jpeg muestra aliados; sus variantes slide_2, slide_3 y slide_4 se presentan a continuación como paneles de servicio, en ese orden. No se presupone una rotación automática.
- Home_8 es contacto, seguido de Home_9 (turismo y cuatro tarjetas) y Home_10 (equipo). El footer anterior sigue en las rutas interiores, sin duplicarse en inicio.

## Archivos

- `src/components/sections/HomeReform.tsx`: composición y textos de las referencias.
- `src/components/sections/HomeReform.module.css`: estilos aislados y adaptación móvil.
- `src/components/layout/InteriorFooter.tsx`: conserva el footer compartido en las rutas interiores.
- `ContactForm.tsx`: variante visual opcional que reutiliza la validación y el envío existentes.
- `public/img/reform/`: derivados WebP; originales sin cambios.
- `tests/e2e/home-reform.spec.ts`: orden, texto real, imágenes, tamaños de pantalla, formulario con API simulada y navegación entre rutas.

## Procedencia de imágenes

| Recurso | Fuente |
|---|---|
| Papel de Home_5 y aliados | Home_5-01.png |
| Foto de introducción | Home_5-02.png, eliminando únicamente el margen transparente |
| Fotos de tarjetas de Home_6 | Fotografías incrustadas en Home_6.pdf; incluye la feria exacta del centro |
| Paneles de servicios | Home_6_img1.png, Home_6_img2.png, Home_6_img3.png |
| Aliados | Home_7-02.png a Home_7-07.png |
| Wordmark de contacto | Región del logotipo de Home_8-02.png, sin el texto rasterizado inferior |
| Turismo y tarjetas | Home_9-02.png a Home_9-06.png |
| Retratos del equipo | Home_10-02.png a Home_10-06.png |
| Textura de secciones largas | Home_10-07.png |

## Contenido pendiente de revisión del usuario

- Los cuatro casos conservan literalmente «Título» y el texto provisional de la guía; sus botones llevan al índice existente `/casos-de-exito`, no a casos individuales inventados.
- Nosotros conserva el texto provisional y «Cargo» para los cinco integrantes.
- Home_8 reproduce `300 247 86 01` y `901.767.156-0`. Los bloques anteriores y las rutas interiores mantienen sus datos existentes. Unificar el teléfono en otra revisión, sin alterar Home_1–3 en esta entrega.
- Home_8 conserva la autorización de tratamiento de datos y los estados de error/envío del formulario existente, aunque no figuren en el arte estático.
- Sin despliegue remoto en esta entrega.

## Entorno local

Windows bloquea el binding nativo SWC. Usar `npm run dev -- --webpack` y `npm run build -- --webpack` en este equipo. No se modificó el stack ni los scripts del proyecto por esta restricción local.
