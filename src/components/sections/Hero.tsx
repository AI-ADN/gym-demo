"use client";

import { useEffect, useRef, useState } from "react";
import { site, type HeroVariant } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { focusContactHeading, useRequest } from "@/components/providers/RequestProvider";
import { Picture } from "@/components/ui/Picture";

/** Delay between the video starting and the headline appearing. */
const CONTENT_DELAY_MS = 1000;

function readVariant(): HeroVariant {
  const param = new URLSearchParams(window.location.search).get("portada");
  if (param === "foto" || param === "photo") return "photo";
  if (param === "video") return "video";
  return site.hero.variant;
}

export function Hero() {
  const { t } = useLanguage();
  const { startRequest } = useRequest();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [variant, setVariant] = useState<HeroVariant>(site.hero.variant);
  const [contentIn, setContentIn] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const chosen = readVariant();
    setVariant(chosen);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const video = videoRef.current;
    if (chosen === "photo" || reduced || !video) {
      setPaused(true);
      setContentIn(true);
      return;
    }
    let timer: number | undefined;
    video
      .play()
      .then(() => {
        timer = window.setTimeout(() => setContentIn(true), CONTENT_DELAY_MS);
      })
      .catch(() => {
        setPaused(true);
        setContentIn(true);
      });
    return () => window.clearTimeout(timer);
  }, []);

  const togglePause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPaused(false), () => setPaused(true));
    } else {
      video.pause();
      setPaused(true);
    }
  };

  const showVideo = variant === "video";

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col bg-ink md:block md:min-h-[max(100svh,40rem)]"
    >
      <div className="relative h-[60svh] min-h-[22rem] overflow-hidden md:absolute md:inset-0 md:h-auto">
        {showVideo ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster={site.hero.video.poster}
            aria-label={t.hero.videoLabel}
            onError={() => {
              setPaused(true);
              setContentIn(true);
            }}
            className="grade-photo absolute inset-0 size-full object-cover object-[55%_center] md:object-center"
          >
            <source src={site.hero.video.webm} type="video/webm" />
            <source src={site.hero.video.mp4} type="video/mp4" />
          </video>
        ) : (
          <Picture
            image={site.hero.photo}
            alt={t.hero.photoAlt}
            sizes="100vw"
            priority
            className="grade-photo absolute inset-0 size-full object-cover object-[30%_center] md:object-center"
          />
        )}

        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/75 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div
          aria-hidden="true"
          data-hero-fade
          data-state={contentIn ? "in" : "out"}
          className="absolute inset-0 hidden bg-gradient-to-r from-ink/90 via-ink/50 to-transparent md:block"
        />
      </div>

      {showVideo ? (
        <div className="container-x pointer-events-none absolute inset-x-0 top-[calc(60svh-4.25rem)] z-20 flex justify-end md:top-auto md:bottom-10">
          <button
            type="button"
            onClick={togglePause}
            className="pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-bone/25 bg-ink/55 px-4 text-sm font-medium backdrop-blur-sm transition-colors hover:border-bone/60"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5">
              {paused ? <path d="M4 2.5v11l9-5.5z" fill="currentColor" /> : <path d="M4 2.5h3v11H4zm5 0h3v11H9z" fill="currentColor" />}
            </svg>
            {paused ? t.hero.play : t.hero.pause}
          </button>
        </div>
      ) : null}

      <div className="container-x relative z-10 flex flex-1 flex-col justify-end pb-10 pt-6 md:absolute md:inset-0 md:pb-[clamp(3rem,9vh,6.5rem)] md:pt-28">
        <div data-hero-content data-state={contentIn ? "in" : "out"} className="max-w-[34rem] lg:max-w-[38rem]">
          <p className="type-label mb-6 flex items-center gap-3 text-bone/70">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-pulse" />
            {t.common.demoConcept}
          </p>
          <h1 id="hero-title" className="type-display text-[clamp(3.1rem,6vw,6.4rem)] uppercase">
            {t.hero.titleLines.map((line, i) => (
              <span key={i} className={`block ${i === t.hero.titleLines.length - 1 ? "text-pulse" : ""}`}>
                {line}{" "}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[28rem] text-base text-bone/80 md:text-lg">{t.hero.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contacto"
              onClick={() => {
                startRequest("visita");
                focusContactHeading();
              }}
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-pulse pl-6 pr-2 font-semibold text-ink transition-colors hover:bg-pulse-bright"
            >
              {t.hero.primary}
              <span className="flex size-8 items-center justify-center rounded-full bg-ink text-bone transition-transform duration-300 group-hover:translate-x-0.5">
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5">
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </a>
            <a
              href="#paquetes"
              className="inline-flex min-h-12 items-center rounded-full border border-bone/30 px-6 font-medium text-bone transition-colors hover:border-bone"
            >
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
