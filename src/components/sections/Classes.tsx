"use client";

import { useMemo, useState } from "react";
import { site, type ClassId, type Weekday } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionIntro } from "@/components/ui/SectionIntro";

const WEEKDAYS: Weekday[] = [1, 2, 3, 4, 5];

export function Classes() {
  const { t } = useLanguage();
  const [highlight, setHighlight] = useState<ClassId | null>(null);

  const times = useMemo(
    () => Array.from(new Set(site.classes.flatMap((c) => c.slots.map((s) => s.time)))).sort(),
    [],
  );

  const slotAt = (day: Weekday, time: string) =>
    site.classes.filter((c) => c.slots.some((s) => s.day === day && s.time === time));

  const isDim = (id: ClassId) => highlight !== null && highlight !== id;

  return (
    <section id="clases" aria-labelledby="clases-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionIntro index="05" eyebrow={t.classes.eyebrow} title={t.classes.title} titleId="clases-title" lead={t.classes.lead} />

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div role="group" aria-label={t.classes.filterLabel} className="flex flex-col">
              {site.classes.map((item) => {
                const copy = t.classes.items[item.id];
                const pressed = highlight === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setHighlight(pressed ? null : item.id)}
                    className={`group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-t border-bone/12 py-5 text-left transition-[opacity,color] duration-300 last:border-b ${
                      isDim(item.id) ? "opacity-45 hover:opacity-80" : "opacity-100"
                    }`}
                  >
                    <span className="type-title flex items-center gap-3 text-[1.65rem]">
                      <span
                        aria-hidden="true"
                        className={`size-2 rounded-full transition-colors ${pressed ? "bg-pulse" : "bg-bone/25 group-hover:bg-bone/60"}`}
                      />
                      {copy.name}
                    </span>
                    <span className="type-label tabular-nums text-bone/70">
                      {item.minutes} {t.classes.minutes}
                    </span>
                    <span className="col-span-2 pl-5 text-mute">
                      {copy.focus} · <span className="text-bone/75">{copy.level}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-mute">{t.classes.note}</p>
          </div>

          <div className="lg:col-span-7">
            <table className="hidden w-full table-fixed border-collapse sm:table">
              <caption className="sr-only">{t.classes.weekLabel}</caption>
              <thead>
                <tr>
                  <td className="w-16" />
                  {WEEKDAYS.map((d) => (
                    <th key={d} scope="col" className="type-label pb-4 text-left font-semibold text-bone/70">
                      <abbr title={t.classes.days[d - 1]} className="no-underline">
                        {t.classes.daysShort[d - 1]}
                      </abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map((time) => (
                  <tr key={time} className="border-t border-bone/10">
                    <th scope="row" className="type-label py-3 pr-3 text-left align-top font-semibold tabular-nums text-bone/55">
                      {time}
                    </th>
                    {WEEKDAYS.map((d) => {
                      const entries = slotAt(d, time);
                      return (
                        <td key={d} className="p-1.5 align-top">
                          {entries.map((c) => (
                            <span
                              key={c.id}
                              className={`block rounded-md border px-2.5 py-2.5 text-[0.82rem] font-semibold leading-tight transition-[opacity,background-color,border-color] duration-300 ${
                                highlight === c.id
                                  ? "border-pulse bg-pulse/15 text-bone"
                                  : "border-bone/12 bg-ink-2 text-bone/85"
                              } ${isDim(c.id) ? "opacity-25" : "opacity-100"}`}
                            >
                              {t.classes.items[c.id].name}
                              <span className="mt-0.5 block text-[0.72rem] font-medium text-mute">
                                {c.minutes} {t.classes.minutes}
                              </span>
                            </span>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            <ol aria-label={t.classes.weekLabel} className="flex flex-col sm:hidden">
              {WEEKDAYS.map((d) => {
                const entries = site.classes
                  .flatMap((c) => c.slots.filter((s) => s.day === d).map((s) => ({ ...s, cls: c })))
                  .sort((a, b) => a.time.localeCompare(b.time));
                return (
                  <li key={d} className="grid grid-cols-[6.75rem_1fr] gap-3 border-t border-bone/10 py-4">
                    <span className="type-label pt-1 text-bone/70">{t.classes.days[d - 1]}</span>
                    <ul className="flex flex-col gap-1.5">
                      {entries.map((e) => (
                        <li
                          key={`${e.cls.id}-${e.time}`}
                          className={`flex items-baseline justify-between gap-3 transition-opacity ${isDim(e.cls.id) ? "opacity-30" : ""}`}
                        >
                          <span className={`font-semibold ${highlight === e.cls.id ? "text-pulse" : ""}`}>
                            {t.classes.items[e.cls.id].name}
                          </span>
                          <span className="text-sm tabular-nums text-mute">{e.time}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>

            <p className="mt-6 border-t border-bone/10 pt-5 text-sm text-mute">{t.classes.weekend}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
