"use client";

import { usePathname } from "next/navigation";

/** Home supplies the same contact block within its page; interiors use the layout. */
export function InteriorFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname === "/" ? null : children;
}
