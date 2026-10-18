"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { site } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Picture } from "@/components/ui/Picture";
import { SectionIntro } from "@/components/ui/SectionIntro";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{word}</motion.span>{" "}
    </>
  );
}

function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="type-title max-w-[22ch] text-[clamp(2rem,4.4vw,4rem)] leading-[1.04] text-bone md:max-w-[24ch]"
    >
      {reduced
        ? text
        : words.map((word, i) => (
            <Word key={`${word}-${i}`} word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
    </p>
  );
}

export function About() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="relative overflow-hidden py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 size-[38rem] rounded-full bg-pulse/10 blur-[120px]"
      />
      <div className="container-x relative">
        <SectionIntro index="01" eyebrow={t.about.eyebrow} />
        <h2 id="nosotros-title" className="sr-only">
          {t.about.eyebrow}
        </h2>
        <div className="mt-10">
          <Manifesto key={t.about.manifesto} text={t.about.manifesto} />
        </div>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-10">
          <figure data-reveal className="relative md:col-span-6 lg:col-span-5">
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 border border-pulse/60 md:translate-x-4 md:translate-y-4" />
            <Picture
              image={site.aboutImage}
              alt={t.about.imageAlt}
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
              className="grade-photo relative aspect-[4/5] w-full object-cover object-[40%_center]"
            />
          </figure>

          <ol className="flex flex-col justify-end md:col-span-6 lg:col-span-6 lg:col-start-7">
            {t.about.principles.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-bone/12 py-7 last:border-b"
              >
                <span className="type-label pt-1.5 tabular-nums text-pulse">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="type-title text-[1.6rem]">{item.title}</h3>
                  <p className="mt-2 max-w-md text-mute">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
