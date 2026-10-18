"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Faq() {
  const { t } = useLanguage();
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="relative bg-ink-2 py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionIntro index="08" eyebrow={t.faq.eyebrow} title={t.faq.title} titleId="preguntas-title" />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {t.faq.items.map((item) => (
            <details key={item.q} className="group border-t border-bone/12 last:border-b">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors hover:text-bone md:text-xl">
                {item.q}
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-bone/20 transition-[transform,background-color,border-color] duration-300 group-open:rotate-45 group-open:border-pulse group-open:bg-pulse group-open:text-ink"
                >
                  <svg viewBox="0 0 16 16" className="size-3.5">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-12 text-mute">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
