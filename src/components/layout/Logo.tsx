import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logotipo de Juzt.
 * - tone="ink" (fondos claros): logotipo oficial a color (/public/brand).
 * - tone="bone" (fondos oscuros): wordmark en colores de marca, porque el
 *   logotipo oficial tiene placa blanca y no funciona invertido sobre navy.
 *   → Cuando exista una versión blanca/vectorial del logo, usarla también aquí.
 */
export function Logo({
  className,
  tone = "ink",
  priority = false,
}: {
  className?: string;
  tone?: "ink" | "bone";
  priority?: boolean;
}) {
  if (tone === "bone") {
    return (
      <Image
        src="/brand/logo_juzt_home.png"
        alt=""
        width={265}
        height={86}
        priority={priority}
        className={cn("h-12 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]", className)}
      />
    );
  }

  return (
    <Image
      src="/brand/logo_juzt.png"
      alt="Juzt — Gestión de productividad"
      width={364}
      height={115}
      priority={priority}
      className={cn("h-12 w-auto", className)}
    />
  );
}
