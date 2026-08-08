/**
 * GLSL compartido para la escena de territorio.
 * Ruido simplex 3D (Ashima / Stefan Gustavson) — dominio público / MIT.
 * Se antepone a los shaders del terreno y de los puntos de datos para que
 * ambos compartan exactamente la misma superficie topográfica.
 */
export const SIMPLEX_NOISE = /* glsl */ `
vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Altura de terreno reutilizable por terreno y puntos.
float terrainHeight(vec2 uvp, float t){
  vec2 q = uvp * 3.0;
  float h = 0.0;
  h += snoise(vec3(q, t)) * 0.62;
  h += snoise(vec3(q * 2.1, t * 1.15)) * 0.26;
  h += snoise(vec3(q * 4.4, t * 0.8)) * 0.12;
  return h;
}
`;

export const TERRAIN_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uScroll;
varying float vHeight;
varying vec2 vUv;

${SIMPLEX_NOISE}

void main(){
  vUv = uv;
  float t = uTime * 0.05;
  float h = terrainHeight(uv, t) * (0.85 + uScroll * 0.55);
  vHeight = h;
  vec3 p = position;
  p.z += h;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

export const TERRAIN_FRAGMENT = /* glsl */ `
precision highp float;
uniform vec3 uLow;
uniform vec3 uHigh;
uniform vec3 uContour;
uniform vec3 uLine;
uniform float uScroll;
varying float vHeight;
varying vec2 vUv;

void main(){
  float hN = smoothstep(-0.85, 0.95, vHeight);
  vec3 col = mix(uLow, uHigh, hN);

  // Curvas de nivel (líneas topográficas).
  float hs = vHeight * 6.0;
  float c = abs(fract(hs - 0.5) - 0.5) / max(fwidth(hs), 1e-4);
  float contour = 1.0 - min(c, 1.0);
  col = mix(col, uContour, contour * (0.28 + uScroll * 0.18));

  // Retícula de parcelas.
  vec2 gg = vUv * 15.0;
  vec2 grid = abs(fract(gg - 0.5) - 0.5) / max(fwidth(gg), 1e-4);
  float line = 1.0 - min(min(grid.x, grid.y), 1.0);
  col = mix(col, uLine, line * 0.10);

  // Fundido radial hacia el fondo (sin borde duro).
  float d = distance(vUv, vec2(0.5));
  float edge = smoothstep(0.72, 0.32, d);

  gl_FragColor = vec4(col, edge);
}
`;

export const POINTS_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform float uSize;
attribute float aSeed;
varying float vPulse;

${SIMPLEX_NOISE}

void main(){
  float t = uTime * 0.05;
  vec3 p = position;
  float h = terrainHeight(p.xy * 0.5 + 0.5, t) * (0.85 + uScroll * 0.55);
  p.z += h + 0.03;

  // Pulso viajero sobre el conjunto de puntos.
  float pulse = 0.5 + 0.5 * sin(uTime * 1.4 + aSeed * 6.2831);
  vPulse = pulse;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * (0.6 + pulse * 0.9) * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const POINTS_FRAGMENT = /* glsl */ `
precision highp float;
uniform vec3 uColor;
uniform vec3 uColorHot;
varying float vPulse;

void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float core = smoothstep(0.5, 0.0, d);
  vec3 col = mix(uColor, uColorHot, vPulse);
  gl_FragColor = vec4(col, core * (0.35 + vPulse * 0.55));
}
`;
