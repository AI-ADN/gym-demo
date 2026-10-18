"use client";

import { useEffect, useRef, useState } from "react";

interface IllustrativeMapProps {
  title: string;
  description: string;
  className?: string;
  idSuffix: string;
  /** City name shown only in the zoomed-out establishing view. */
  cityLabel?: string;
  /** Zoom from a city-wide view into the pin the first time the map is mostly on screen. */
  zoomOnView?: boolean;
}

/** The visible frame is 600×420; the world extends past it so the zoomed-out view stays filled. */
const WORLD = { x: -800, y: -560, width: 2200, height: 1540 };
const PIN = { x: 370, y: 174 };

const MINOR_STREETS_V = [-730, -640, -560, -470, -385, -300, -210, -125, -40, 70, 150, 235, 330, 420, 505, 590, 680, 765, 850, 940, 1025, 1110, 1200, 1290];
const MINOR_STREETS_H = [-500, -420, -335, -255, -170, -90, -15, 60, 135, 215, 300, 370, 450, 530, 610, 690, 770, 850, 930];
/** Slopes of the original diagram: vertical streets drift 18 units right over 420, horizontal ones rise 14 over 600. */
const V_SLOPE = 18 / 420;
const H_SLOPE = -14 / 600;

const ARTERIALS = [
  "M-800 40 C -300 -20, 200 -40, 1400 -120",
  "M-200 -560 C -220 0, -260 500, -320 980",
  "M-800 820 C -100 700, 600 640, 1400 560",
];

const BLOCKS = [
  { x: -620, y: -380, w: 260, h: 180 },
  { x: 760, y: -420, w: 300, h: 210 },
  { x: -560, y: 520, w: 320, h: 220 },
  { x: 880, y: 640, w: 280, h: 200 },
];

/** Purely decorative street diagram. It does not represent any real geography. */
export function IllustrativeMap({ title, description, className, idSuffix, cityLabel, zoomOnView = false }: IllustrativeMapProps) {
  const titleId = `map-title-${idSuffix}`;
  const descId = `map-desc-${idSuffix}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState<"out" | "in">(zoomOnView ? "out" : "in");

  useEffect(() => {
    if (!zoomOnView) return;
    const svg = svgRef.current;
    if (!svg || !("IntersectionObserver" in window)) {
      setZoom("in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setZoom("in");
          observer.disconnect();
        }
      },
      { threshold: 0.55 },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, [zoomOnView]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 420"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      data-map-zoom={zoom}
      style={{ ["--map-pin-x" as string]: `${PIN.x}px`, ["--map-pin-y" as string]: `${PIN.y}px` }}
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{description}</desc>
      <rect width="600" height="420" fill="#16130f" />

      <g className="map-world">
        <rect x={WORLD.x} y={WORLD.y} width={WORLD.width} height={WORLD.height} fill="#16130f" />
        {BLOCKS.map((b) => (
          <rect key={`${b.x}:${b.y}`} x={b.x} y={b.y} width={b.w} height={b.h} rx="6" fill="#c9a66b" fillOpacity="0.05" />
        ))}
        <g stroke="#f2ece2" strokeOpacity="0.08" strokeWidth="10">
          {MINOR_STREETS_V.map((x) => (
            <line
              key={`v${x}`}
              x1={x + V_SLOPE * WORLD.y}
              y1={WORLD.y}
              x2={x + V_SLOPE * (WORLD.y + WORLD.height)}
              y2={WORLD.y + WORLD.height}
            />
          ))}
          {MINOR_STREETS_H.map((y) => (
            <line
              key={`h${y}`}
              x1={WORLD.x}
              y1={y + H_SLOPE * WORLD.x}
              x2={WORLD.x + WORLD.width}
              y2={y + H_SLOPE * (WORLD.x + WORLD.width)}
            />
          ))}
        </g>
        <g fill="none" stroke="#f2ece2" strokeOpacity="0.14" strokeWidth="30">
          {ARTERIALS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <path d="M440 300 L560 286 L575 400 L452 412 Z" fill="#c9a66b" fillOpacity="0.07" />
        <path d="M-820 627 L-20 360 C 160 300, 300 250, 620 120 L1420 -205" stroke="#f2ece2" strokeOpacity="0.22" strokeWidth="22" fill="none" />
        <path d="M-820 627 L-20 360 C 160 300, 300 250, 620 120 L1420 -205" stroke="#16130f" strokeWidth="1.5" strokeDasharray="10 10" fill="none" />
        <text x="96" y="296" fill="#f2ece2" fillOpacity="0.55" fontSize="11" letterSpacing="3" transform="rotate(-17 96 296)" style={{ fontFamily: "var(--font-display)" }}>
          AV. IMPULSO
        </text>
        <text x="470" y="360" fill="#f2ece2" fillOpacity="0.35" fontSize="9" letterSpacing="2" style={{ fontFamily: "var(--font-display)" }}>
          DISTRITO ACTIVO
        </text>
        {cityLabel && (
          <text
            className="map-city"
            x={PIN.x}
            y={PIN.y - 120}
            textAnchor="middle"
            fill="#f2ece2"
            fontSize="64"
            fontWeight="700"
            letterSpacing="22"
            style={{ fontFamily: "var(--font-display)" }}
            aria-hidden="true"
          >
            {cityLabel.toUpperCase()}
          </text>
        )}
        <rect x="338" y="148" width="64" height="52" rx="3" fill="#c9a66b" fillOpacity="0.18" stroke="#c9a66b" strokeOpacity="0.7" />
        <circle className="map-pin-ring" cx={PIN.x} cy={PIN.y} r="34" fill="none" stroke="#c9a66b" strokeOpacity="0.25" />
        <circle cx={PIN.x} cy={PIN.y} r="7" fill="#c9a66b" />
        <circle cx={PIN.x} cy={PIN.y} r="3" fill="#0e0c0a" />
        <g className="map-label" transform="translate(392 120)">
          <rect width="118" height="30" rx="15" fill="#f2ece2" />
          <text x="59" y="19.5" textAnchor="middle" fill="#0e0c0a" fontSize="11" fontWeight="700" letterSpacing="1.5" style={{ fontFamily: "var(--font-display)" }}>
            PULSO CENTRAL
          </text>
        </g>
      </g>

      <g transform="translate(560 36)" fill="none" stroke="#f2ece2" strokeOpacity="0.5">
        <circle r="14" />
        <path d="M0 -9 L4 3 L0 0 L-4 3 Z" fill="#f2ece2" fillOpacity="0.6" stroke="none" />
      </g>
    </svg>
  );
}
