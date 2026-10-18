"use client";

import { site } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Picture } from "@/components/ui/Picture";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { useActiveSection } from "@/hooks/useActiveSection";

const SPACE_ANCHORS = site.spaces.map((s) => `espacio-${s.id}`);

export function Spaces() {
  const { t } = useLanguage();
  // Band taller than the gap between articles, so one space is always active.
  const active = useActiveSection(SPACE_ANCHORS, "-35% 0px -40% 0px");

  return (
    <section id="instalaciones" aria-labelledby="instalaciones-title" className="relative bg-ink-2 py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent" />
      <div className="container-x lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionIntro
              index="03"
              eyebrow={t.spaces.eyebrow}
              title={t.spaces.title}
              titleId="instalaciones-title"
              lead={t.spaces.lead}
            />
            <nav aria-label={t.spaces.indexLabel} className="mt-12 hidden lg:block [@media(max-height:860px)]:mt-6">
              <ol className="relative border-l border-bone/12">
                {site.spaces.map((space, i) => {
                  const isActive = active === `espacio-${space.id}`;
                  return (
                    <li key={space.id}>
                      <a
                        href={`#espacio-${space.id}`}
                        aria-current={isActive ? "location" : undefined}
                        className={`relative -ml-px flex items-baseline gap-4 border-l py-2.5 pl-5 transition-colors duration-300 [@media(max-height:860px)]:py-1.5 ${
                          isActive ? "border-pulse text-bone" : "border-transparent text-bone/50 hover:text-bone/85"
                        }`}
                      >
                        <span className="type-label tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[1.05rem] font-semibold">{t.spaces.items[space.id].name}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>

        <div
          role="region"
          aria-label={t.spaces.carouselLabel}
          tabIndex={0}
          className="snap-rail -mx-[clamp(1.25rem,4.5vw,4.5rem)] mt-12 flex gap-4 overflow-x-auto px-[clamp(1.25rem,4.5vw,4.5rem)] pb-2 md:gap-6 lg:col-span-8 lg:mx-0 lg:mt-0 lg:flex-col lg:gap-24 lg:overflow-visible lg:px-0 lg:pb-0 lg:focus-visible:outline-none"
        >
          {site.spaces.map((space, i) => {
            const copy = t.spaces.items[space.id];
            return (
              <article
                key={space.id}
                id={`espacio-${space.id}`}
                data-anchor
                aria-labelledby={`espacio-${space.id}-title`}
                className="w-[82vw] shrink-0 sm:w-[60vw] lg:w-auto"
              >
                <div data-reveal className="overflow-hidden rounded-sm bg-ink">
                  <Picture
                    image={space.image}
                    alt={copy.alt}
                    sizes="(min-width: 1024px) 60vw, 82vw"
                    className="grade-photo aspect-[4/3] w-full object-cover lg:aspect-[16/10]"
                  />
                </div>
                <div className="mt-5 grid gap-2 lg:mt-6 lg:grid-cols-[4rem_1fr_1.3fr] lg:gap-6">
                  <span className="type-label pt-2 tabular-nums text-pulse">{String(i + 1).padStart(2, "0")} / 06</span>
                  <h3 id={`espacio-${space.id}-title`} className="type-title text-[1.75rem] lg:text-[2.1rem]">
                    {copy.name}
                  </h3>
                  <p className="text-mute lg:pt-1.5">{copy.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
