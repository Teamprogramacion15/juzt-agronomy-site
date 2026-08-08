import { cn } from "@/lib/utils";

/** Etiqueta técnica (mono, mayúsculas) usada como antetítulo de sección. */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "h2";
}) {
  return <Tag className={cn("eyebrow", className)}>{children}</Tag>;
}
