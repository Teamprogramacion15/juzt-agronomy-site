import Image from "next/image";
import { cn } from "@/lib/utils";

/** Variantes optimizadas del logotipo oficial entregado por JUZT. */
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
      <span
        role="img"
        aria-label="JUZT — Gestión de productividad"
        className={cn("logo-footer", className)}
      >
        <span className="logo-footer-mark" aria-hidden="true">
          <Image
            src="/brand/logo_juzt_home.png"
            alt=""
            width={265}
            height={86}
            sizes="72px"
            quality={100}
            priority={priority}
            className="logo-footer-source"
          />
        </span>
        <span className="logo-footer-divider" aria-hidden="true" />
        <span className="logo-footer-descriptor" aria-hidden="true">
          Gestión de
          <br />
          productividad
        </span>
      </span>
    );
  }

  return (
    <Image
      src="/brand/logo_juzt.png"
      alt="JUZT — Gestión de productividad"
      width={364}
      height={115}
      sizes="(max-width: 640px) 180px, 364px"
      quality={100}
      priority={priority}
      className={cn("h-12 w-auto", className)}
    />
  );
}
