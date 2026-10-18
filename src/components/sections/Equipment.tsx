"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { site, type EquipmentId } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Picture } from "@/components/ui/Picture";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Equipment() {
  const { t } = useLanguage();
  const [active, setActive] = useState<EquipmentId>(site.equipment[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = site.equipment.length;
    const keys: Record<string, number> = {
      ArrowDown: (index + 1) % count,
      ArrowRight: (index + 1) % count,
      ArrowUp: (index - 1 + count) % count,
      ArrowLeft: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = keys[event.key];
    setActive(site.equipment[next].id);
    tabRefs.current[next]?.focus();
  };

  const current = t.equipment.items[active];

  return (
    <section id="equipamiento" aria-labelledby="equipamiento-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionIntro
          index="02"
          eyebrow={t.equipment.eyebrow}
          title={t.equipment.title}
          titleId="equipamiento-title"
          lead={t.equipment.lead}
        />

        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <div
            role="tablist"
            aria-label={t.equipment.tabsLabel}
            className="snap-rail -mx-[clamp(1.25rem,4.5vw,4.5rem)] flex gap-2 overflow-x-auto px-[clamp(1.25rem,4.5vw,4.5rem)] lg:sticky lg:top-28 lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-0 lg:self-start lg:overflow-visible lg:px-0"
          >
            {site.equipment.map((item, i) => {
              const selected = item.id === active;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`eq-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="eq-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(item.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`group relative shrink-0 rounded-full border px-5 py-3 text-left transition-colors duration-200 lg:flex lg:items-baseline lg:gap-5 lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-6 lg:last:border-b ${
                    selected
                      ? "border-bone bg-bone text-ink lg:border-bone/12 lg:bg-transparent lg:text-bone"
                      : "border-bone/20 text-bone/70 hover:text-bone lg:border-bone/12"
                  }`}
                >
                  <span className={`type-label hidden tabular-nums lg:inline ${selected ? "text-pulse" : "text-bone/40"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] font-semibold lg:type-title lg:text-[clamp(1.75rem,2.6vw,2.5rem)] lg:font-[750]">
                    {t.equipment.items[item.id].name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 hidden h-px bg-pulse transition-[width] duration-500 ease-out-soft lg:block ${
                      selected ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div
            id="eq-panel"
            role="tabpanel"
            aria-labelledby={`eq-tab-${active}`}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ink-2">
              {site.equipment.map((item) => (
                <Picture
                  key={item.id}
                  image={item.image}
                  alt={item.id === active ? t.equipment.items[item.id].alt : ""}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className={`grade-photo absolute inset-0 size-full object-cover transition-[opacity,transform] duration-500 ease-out-soft ${
                    item.id === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                  }`}
                />
              ))}
            </div>
            <div className="mt-7 grid gap-6 sm:grid-cols-[1fr_1.1fr] sm:gap-10">
              <p className="text-lg text-bone/85">{current.text}</p>
              <ul className="flex flex-wrap content-start gap-2" aria-label={current.name}>
                {current.list.map((entry) => (
                  <li key={entry} className="rounded-full border border-bone/15 px-3.5 py-1.5 text-sm text-bone/85">
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-sm text-mute">{t.equipment.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
