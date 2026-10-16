import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { TerrainFallback } from "@/components/ui/TerrainFallback";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-70" aria-hidden="true">
        <TerrainFallback />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-bone)_25%,transparent_80%)]" />
      </div>
      <div className="container-edge">
        <Link href="/" aria-label="JUZT · inicio">
          <Logo />
        </Link>
        <p className="mt-10 font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest text-[var(--color-clay)]">
          Error 404
        </p>
        <h1 className="headline-2 mt-3 max-w-[16ch]">
          Esta ruta no está en el mapa
        </h1>
        <p className="mt-4 max-w-[46ch] text-[var(--step-1)] text-[var(--color-ink-soft)]">
          La página que buscas no existe o cambió de lugar. Volvamos a terreno
          conocido.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/" size="lg" variant="primary">
            Ir al inicio
          </Button>
          <Button href="/#contacto-footer" size="lg" variant="outline">
            Contactar
          </Button>
        </div>
      </div>
    </main>
  );
}
