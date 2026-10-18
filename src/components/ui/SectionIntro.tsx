import type { ReactNode } from "react";
import { PulseLine } from "./PulseLine";

interface SectionIntroProps {
  index: string;
  eyebrow: string;
  title?: ReactNode;
  titleId?: string;
  lead?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
}

export function SectionIntro({
  index,
  eyebrow,
  title,
  titleId,
  lead,
  tone = "dark",
  className = "",
  titleClassName = "",
}: SectionIntroProps) {
  const light = tone === "light";
  return (
    <header className={className}>
      <div data-reveal className="flex items-center gap-4">
        <span className={`type-label tabular-nums ${light ? "text-pulse-deep" : "text-pulse"}`}>{index}</span>
        <span className={`type-label ${light ? "text-ink" : "text-bone"}`}>{eyebrow}</span>
        <PulseLine className={`h-4 w-24 sm:w-36 ${light ? "text-ink/40" : "text-bone/35"}`} />
      </div>
      {title ? (
        <h2
          id={titleId}
          data-reveal
          style={{ ["--reveal-delay" as string]: "80ms" }}
          className={`type-title mt-6 text-[clamp(2.25rem,4.6vw,4.25rem)] text-balance ${titleClassName}`}
        >
          {title}
        </h2>
      ) : null}
      {lead ? (
        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "160ms" }}
          className={`mt-5 max-w-xl text-lg text-pretty ${light ? "text-graphite" : "text-mute"}`}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
