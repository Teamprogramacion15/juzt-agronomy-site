import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "light" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-[0.08em] transition-[transform,background-color,color,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-clay)] active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.78rem]",
  lg: "px-7 py-3.5 text-[0.82rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-pine)] text-[var(--color-bone)] hover:bg-[var(--color-pine-700)] hover:-translate-y-0.5",
  light:
    "bg-[var(--color-bone)] text-[var(--color-pine-900)] hover:bg-[var(--color-clay)] hover:-translate-y-0.5",
  outline:
    "border border-current text-inherit hover:bg-[color-mix(in_srgb,currentColor_12%,transparent)]",
  ghost: "text-inherit hover:text-[var(--color-clay)] px-2 normal-case tracking-normal",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string };
type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };
type ButtonAsLink = CommonProps &
  ComponentPropsWithoutRef<"a"> & { href: string };

export function Button(props: ButtonAsButton): React.ReactElement;
export function Button(props: ButtonAsLink): React.ReactElement;
export function Button({
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest;
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {rest.children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorRest}
      >
        {rest.children}
      </a>
    );
  }

  return <button className={classes} {...(rest as ButtonAsButton)} />;
}
