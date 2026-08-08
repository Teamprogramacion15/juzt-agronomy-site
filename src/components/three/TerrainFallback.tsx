/**
 * Alternativa estática de calidad para la escena de territorio.
 * Se usa como fallback de carga, cuando no hay WebGL, en dispositivos muy
 * limitados y con prefers-reduced-motion. No depende de JavaScript.
 */
export function TerrainFallback() {
  // Curvas de nivel estilizadas.
  const contours = Array.from({ length: 9 }, (_, i) => {
    const y = 130 + i * 46;
    const amp = 10 + i * 5;
    return `M -20 ${y} C 140 ${y - amp}, 300 ${y + amp}, 460 ${y - amp * 0.6} S 720 ${y + amp}, 820 ${y - amp * 0.4}`;
  });

  const dots = [
    [180, 210],
    [330, 300],
    [520, 250],
    [610, 360],
    [420, 430],
    [250, 470],
    [700, 300],
  ] as const;

  return (
    <svg
      viewBox="0 0 800 600"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Representación abstracta de territorio productivo con curvas de nivel y puntos de datos"
    >
      <defs>
        <linearGradient id="terra" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f0e4" />
          <stop offset="100%" stopColor="#e6ddc7" />
        </linearGradient>
        <radialGradient id="fade" cx="50%" cy="45%" r="65%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.06" />
        </radialGradient>
      </defs>

      <rect width="800" height="600" fill="url(#terra)" />

      {/* Retícula de parcelas */}
      <g stroke="#9aa08d" strokeOpacity="0.18" strokeWidth="1">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="600" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 75} x2="800" y2={i * 75} />
        ))}
      </g>

      {/* Curvas de nivel */}
      <g fill="none" stroke="#1f4a37" strokeOpacity="0.5" strokeWidth="1.5">
        {contours.map((d, i) => (
          <path key={i} d={d} strokeOpacity={0.18 + i * 0.045} />
        ))}
      </g>

      {/* Puntos de datos */}
      <g>
        {dots.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="#c7d64a" fillOpacity="0.18" />
            <circle cx={x} cy={y} r="3.5" fill="#1f4a37" />
          </g>
        ))}
      </g>

      <rect width="800" height="600" fill="url(#fade)" />
    </svg>
  );
}
