# Calidad de fotografías — 2026-10-03

El alcance vigente, aclarado por el usuario, es mejorar únicamente las fotografías de personas. Las texturas, logos, tabla de fases, gráficos del carrusel y banner de turismo conservan sus versiones anteriores.

Las fotografías de personas usan versiones `-hq.webp` codificadas sin pérdidas y calidad 100 donde pasan por Next Image. Se conservan las dimensiones de las fuentes disponibles:

| Uso | Fuente | Ancho |
| --- | --- | ---: |
| Casos de éxito | `Home_9-03.png` a `Home_9-06.png` | 3524 px, antes 1000 px |
| Introducción | `Home_5-02.png` | 3312 px, antes 1500 px |
| Tarjetas y páginas de proyectos y finanzas | `Home_6_img1.png`, `Home_6_img3.png` | 1672 px |
| Tarjeta de equipos | `Home_6_img2.png` | 1024 px |
| Equipo de Nosotros | Imagen embebida de `Nosotro_completa.pdf` | 1024 px |

Los originales de referencia están en `../juzt_reforma/untitled folder`. La introducción mantiene su encuadre mediante CSS, recortando los márgenes blancos del archivo fuente dentro del mismo contenedor.

La foto limpia de Nosotros tiene 1024×768 en la fuente; no se generan rostros ni se inventan detalles. Un original fotográfico de mayor resolución permitiría mejorar ese límite.

El banner de Casos de éxito usa `/img/reform/tourism.webp`, la versión con la cascada. No sustituirla por la primera imagen embebida de `Home_9.pdf`, que no representa el banner completo. Las texturas usan `paper.webp`, `team-paper.webp`, `about-paper.webp` y `home-slide-2-texture.webp`, y los logos conservan los PNG/WebP anteriores.

La configuración global de calidades de Next Image vuelve a `[75, 90, 100]`; solo las fotografías correspondientes seleccionan 100. No ampliar globalmente los tamaños de imagen para este pedido.
