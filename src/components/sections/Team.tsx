"use client";

import { useState } from "react";
import { site, type TeamId } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Picture } from "@/components/ui/Picture";
import { SectionIntro } from "@/components/ui/SectionIntro";

/**
 * Desktop: expanding panels (hover, focus or click). Text always sits below the photo, never over bodies.
 * Mobile: horizontal rail with every caption fully visible.
 */
export function Team() {
  const { t } = useLanguage();
  const [active, setActive] = useState<TeamId>(site.team[0].id);

  return (
    <section id="equipo" aria-labelledby="equipo-title" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-1/3 size-[40rem] rounded-full bg-pulse/8 blur-[140px]"
      />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro index="04" eyebrow={t.team.eyebrow} title={t.team.title} titleId="equipo-title" lead={t.team.lead} />
          <p className="type-label max-w-[22rem] text-bone/55 md:text-right">{t.team.note}</p>
        </div>

        <ul className="snap-rail -mx-[clamp(1.25rem,4.5vw,4.5rem)] mt-12 flex gap-4 overflow-x-auto px-[clamp(1.25rem,4.5vw,4.5rem)] pb-2 md:mx-0 md:mt-16 md:gap-3 md:overflow-visible md:px-0 md:pb-0">
          {site.team.map((member) => {
            const copy = t.team.members[member.id];
            const isActive = member.id === active;
            return (
              <li
                key={member.id}
                data-reveal
                onMouseEnter={() => setActive(member.id)}
                className={`w-[72vw] shrink-0 sm:w-[44vw] md:w-auto md:min-w-0 md:transition-[flex-grow] md:duration-500 md:ease-out-soft ${
                  isActive ? "md:grow-[2.4]" : "md:grow"
                } md:basis-0`}
              >
                <button
                  type="button"
                  onClick={() => setActive(member.id)}
                  onFocus={() => setActive(member.id)}
                  aria-expanded={isActive}
                  aria-controls={`team-${member.id}-focus`}
                  className="group block w-full text-left"
                >
                  <span className="relative block aspect-[3/4] overflow-hidden rounded-sm bg-ink-2 md:aspect-auto md:h-[clamp(26rem,52vh,34rem)]">
                    <Picture
                      image={member.image}
                      alt={copy.alt}
                      sizes="(min-width: 768px) 40vw, 72vw"
                      className={`absolute inset-0 size-full object-cover object-[center_18%] transition-[filter,transform] duration-500 ease-out-soft grade-photo ${
                        isActive ? "md:scale-100" : "md:scale-[1.02] md:[filter:saturate(0.55)_brightness(0.62)]"
                      }`}
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent mix-blend-multiply" />
                  </span>
                  <span className="mt-4 block border-t border-bone/12 pt-4">
                    <span className="type-title block truncate text-[1.5rem]">{member.name}</span>
                    <span className="mt-1 block truncate text-sm font-medium text-pulse">{copy.role}</span>
                  </span>
                </button>
                <p
                  id={`team-${member.id}-focus`}
                  className={`mt-3 text-sm text-mute transition-opacity duration-300 md:min-h-[3rem] ${
                    isActive ? "md:opacity-100" : "md:opacity-0"
                  }`}
                >
                  <span className="type-label mr-2 text-bone/55">{t.team.focusLabel}</span>
                  {copy.focus}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
