# Optimización de rendimiento — 2026-10-02

Requisito: acelerar navegación y funcionamiento en dispositivos modestos sin reducir calidad de imágenes o video. Verificado contra el servidor de producción local de Next.js 16.3.1, no contra `next dev`.

## Cambios

- `Reveal` utiliza IntersectionObserver y Web Animations en lugar de GSAP/ScrollTrigger. EPSEA pasa a Server Component con dos pequeñas islas de animación. Sin JavaScript, sin APIs de animación o con movimiento reducido, el contenido permanece visible.
- El menú móvil usa `<details>` y `<summary>`: se abre antes de la hidratación. Sin transición del panel, también funciona sin JavaScript en WebKit. React conserva cierre por enlace/Escape, bloqueo de scroll y ocultamiento del header.
- El navbar prepara las rutas internas en tiempo ocioso; la preparación adicional se omite si `saveData` está activo. Los enlaces internos conservan navegación cliente y la opción Equipos del menú mantiene su destino externo.
- Zod y su resolver se importan al validar el formulario; campos, mensajes y validación del servidor no cambian.
- Las cuatro fuentes Pitagon se convierten de OTF a WOFF2 sin pérdida ni recorte de caracteres. Se precargan Regular y ExtraBold. Los originales siguen disponibles.
- El video comienza con `preload=none`; prepara metadatos a 200 px de la pantalla y reproduce cuando es visible. Conserva el archivo original, la pausa manual, el sonido y la pausa al salir de pantalla. Su contenedor ya tiene `moov` al principio y permite rangos HTTP.
- La imagen del segundo slide conserva calidad 100 y recibe prioridad de red baja para dejar pasar el retrato inicial.
- Imágenes, marcas y fuentes públicas usan caché de una hora y revalidación en segundo plano. No se marcan como inmutables porque sus nombres no contienen hash; reemplazar un archivo no deja una caché perpetua.

## Medición local

Chromium, contexto nuevo, viewport 390×844, servidor localhost:3100, dos segundos después de `page.goto`:

| Recurso | Antes | Después | Ahorro |
|---|---:|---:|---:|
| JavaScript descargado, incluida precarga | 285.459 bytes | 175.760 bytes | 38,4 % |
| Archivos de las cuatro fuentes | 208.868 bytes OTF | 114.064 bytes WOFF2 | 45,4 % |

La comparación de todas las formas de glifos con RecordingPen, mapas Unicode y métricas hmtx confirma equivalencia exacta de las fuentes. No se modificaron archivos de fotos o video ni sus ajustes de calidad. Estos valores son una medición local, no una puntuación Lighthouse ni una garantía de tiempo en producción.

## Verificación

- `npm run build` y ESLint correctos.
- 60 pruebas correctas y cuatro omisiones por perfil en Chromium y móvil: rutas, portada, EPSEA, carrusel de ocho segundos, reproducción, validación, contacto y distribución de 320 a 1907 px.
- Pruebas adicionales de precarga, formulario, reproducción y rangos HTTP en Firefox y WebKit.
- Menú sin JavaScript y navegación nativa comprobados en Chromium, Firefox y WebKit.
- Ruta Nosotros precargada abre incluso poniendo el contexto sin conexión después de la hidratación.
- Simulación Chromium móvil con CPU 6× más lenta, latencia 150 ms y descarga 1,6 Mbps: menú y navegación correctos, cero errores de página y cero desbordamiento horizontal.

El catálogo externo depende de su propio servidor y de la conexión. Las optimizaciones están en el proyecto local; no se realizó despliegue remoto.

## Extensión de movimiento editorial solicitada después

`MotionScene.tsx` añade entradas variadas a objetivos seleccionados y salidas leves en el borde, con IntersectionObserver/Web Animations. No hay motor externo ni bucle de scroll; se cancela la animación al cambiar la preferencia a movimiento reducido. Escenas anidadas aíslan sus objetivos. El video, métricas y formulario mantienen su interacción anterior. Las cifras de red de la tabla corresponden a la optimización previa a esta ampliación; no representan una medición nueva del pequeño componente adicional.
