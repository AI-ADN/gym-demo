import { site } from "@/content/site";

/** Typographic identification until the definitive logo is delivered. */
export function Wordmark({ className = "", size = "md" }: { className?: string; size?: "md" | "xl" }) {
  if (size === "xl") {
    return (
      <span className={`flex flex-col leading-none ${className}`} aria-hidden="true">
        <span className="type-display text-[clamp(5rem,19vw,17rem)] tracking-[-0.02em]">{site.name}</span>
        <span className="type-label mt-3 text-[0.75rem] tracking-[0.5em]">{site.descriptor}</span>
      </span>
    );
  }
  return (
    <span className={`flex items-baseline gap-2.5 leading-none ${className}`} aria-hidden="true">
      <span className="type-display text-[1.65rem] tracking-[0.01em]">{site.name}</span>
      <span className="type-label hidden whitespace-nowrap text-[0.55rem] tracking-[0.3em] text-bone/70 xs:inline">
        {site.descriptor}
      </span>
    </span>
  );
}
