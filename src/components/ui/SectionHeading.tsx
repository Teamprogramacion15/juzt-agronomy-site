import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "ink",
  className,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  tone?: "ink" | "bone";
  className?: string;
  id?: string;
}) {
  const titleColor =
    tone === "bone" ? "text-[var(--color-bone)]" : "text-[var(--color-ink)]";
  const introColor =
    tone === "bone"
      ? "text-[color-mix(in_srgb,var(--color-bone)_78%,transparent)]"
      : "text-[var(--color-ink-soft)]";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <SplitReveal>
        <h2 id={id} className={cn("headline-2 max-w-[24ch]", titleColor)}>
          {title}
        </h2>
      </SplitReveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p className={cn("max-w-[52ch] text-[var(--step-1)]", introColor)}>
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
