import { SIMPLEX_NOISE } from "./shaders";

/** Vertex para un triángulo a pantalla completa (drei ScreenQuad). */
export const PHOTO_VERTEX = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/**
 * "Foto viva": una fotografía real como textura, con movimiento natural.
 *  - Viento en el pasto (domain-warp con ruido, más fuerte abajo).
 *  - Nubes que derivan en el cielo.
 *  - Parallax 2.5D con el cursor según profundidad (primer plano se mueve más).
 */
export const PHOTO_FRAGMENT = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform float uTime;
uniform vec2  uMouse;       // -1..1 suavizado
uniform float uImageAspect; // ancho/alto de la imagen
uniform float uViewAspect;  // ancho/alto del viewport
uniform float uIntensity;   // 0..1 (se reduce en móvil / gama baja)
varying vec2 vUv;

${SIMPLEX_NOISE}

// Ajuste tipo object-fit: cover (recorta al centro).
vec2 coverUV(vec2 uv, float imgA, float viewA){
  vec2 s = viewA < imgA ? vec2(viewA / imgA, 1.0) : vec2(1.0, imgA / viewA);
  return (uv - 0.5) * s + 0.5;
}

void main(){
  vec2 uv = coverUV(vUv, uImageAspect, uViewAspect);
  float t = uTime;

  // uv.y: 0 = abajo (primer plano/pasto), 1 = arriba (cielo)
  // 1 en el primer plano y 0 al llegar a la lÃ­nea del horizonte. Mantener
  // los bordes de smoothstep en orden evita comportamiento indefinido en GLSL.
  // Mountains stay in a static depth band between the sky and the foreground.
  float vegetation = 1.0 - smoothstep(0.22, 0.32, uv.y);
  float grass = 1.0 - smoothstep(0.0, 0.28, uv.y);
  float sky   = smoothstep(0.60, 0.80, uv.y);

  // Viento en el pasto — dos octavas de ruido para un vaivén orgánico.
  float w1 = snoise(vec3(uv * vec2(3.0, 7.0), t * 0.33));
  float w2 = snoise(vec3(uv * vec2(9.0, 15.0) + 5.0, t * 0.6));
  vec2 wind = vec2(w1 * 0.011 + w2 * 0.004, w2 * 0.0028)
    * vegetation
    * (0.72 + 0.28 * grass)
    * uIntensity;

  // Nubes — deriva perceptible, todavía suave y natural.
  float c1 = snoise(vec3(uv * 1.4 + vec2(t * 0.036, 0.0), t * 0.028));
  vec2 clouds = vec2(
    c1 * 0.018 + sin(t * 0.08) * 0.0065,
    c1 * 0.0035
  ) * sky * uIntensity;

  // Parallax por profundidad: el primer plano reacciona más al cursor.
  vec2 par = uMouse * 0.020 * uIntensity;
  vec2 parallax = par * vegetation;

  // Keep samples inside the image when motion pushes the UVs beyond its edge.
  vec2 uvS = clamp(uv + wind + clouds + parallax, 0.001, 0.999);
  vec3 col = texture2D(uTex, uvS).rgb;

  // Viñeta suave para dar foco y ayudar a la legibilidad del texto.
  float d = distance(vUv, vec2(0.5));
  col *= smoothstep(1.2, 0.4, d);

  gl_FragColor = vec4(col, 1.0);
}
`;
