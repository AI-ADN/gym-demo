interface PulseLineProps {
  className?: string;
}

/** The brand motif: a thin line with a single beat. Draws in when its `[data-reveal]` parent appears. */
export function PulseLine({ className }: PulseLineProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 24"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="pulse-path"
        pathLength={1}
        d="M0 12 H148 L156 3 L166 21 L174 12 H240"
        stroke="currentColor"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
    </svg>
  );
}
