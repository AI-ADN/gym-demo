"use client";

import { formatPrice, site, type PlanId } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { focusContactHeading, useRequest } from "@/components/providers/RequestProvider";
import { SectionIntro } from "@/components/ui/SectionIntro";

function Check({ included, label }: { included: boolean; label: string }) {
  return included ? (
    <svg role="img" aria-label={label} viewBox="0 0 20 20" className="mx-auto size-5 text-pulse-deep">
      <path d="M4.5 10.5 8.5 14l7-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <span role="img" aria-label={label} className="mx-auto block h-px w-3 bg-ink/30" />
  );
}

export function Plans() {
  const { t, locale } = useLanguage();
  const { values, startRequest } = useRequest();

  const choose = (plan: PlanId) => {
    startRequest("paquetes", plan);
    focusContactHeading();
  };

  return (
    <section
      id="paquetes"
      aria-labelledby="paquetes-title"
      data-tone="light"
      className="relative bg-paper py-24 text-ink md:py-32"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            index="06"
            eyebrow={t.plans.eyebrow}
            title={t.plans.title}
            titleId="paquetes-title"
            lead={t.plans.lead}
            tone="light"
          />
          <p className="type-label max-w-[20rem] text-graphite md:text-right">{t.plans.note}</p>
        </div>

        <ol className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 md:mt-16 lg:grid-cols-3 lg:gap-0">
          {site.plans.map((plan, i) => {
            const copy = t.plans.items[plan.id];
            const selected = values.plan === plan.id;
            return (
              <li
                key={plan.id}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className={`relative flex flex-col rounded-sm border p-7 transition-[border-color,background-color] duration-300 lg:rounded-none lg:border-y-0 lg:border-r-0 lg:px-8 lg:py-4 lg:first:border-l-0 ${
                  selected ? "border-pulse-deep bg-paper-2 lg:border-l-ink/15" : "border-ink/15"
                }`}
              >
                {selected ? (
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-pulse-deep lg:-top-4" />
                ) : null}
                <div className="mb-3 flex items-start empty:hidden lg:min-h-10 lg:items-end lg:empty:flex">
                  {selected ? (
                    <span className="type-label rounded-full bg-pulse-deep px-2.5 py-1 text-paper">{t.plans.selected}</span>
                  ) : copy.tag ? (
                    <span className="type-label rounded-full border border-ink/20 px-2.5 py-1 text-graphite">{copy.tag}</span>
                  ) : null}
                </div>
                <h3 className="type-display text-[2.6rem] uppercase">{copy.name}</h3>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                  <span className="type-display text-[3.4rem] tabular-nums tracking-tight">{formatPrice(plan.price, locale)}</span>
                  <span className="whitespace-nowrap text-sm font-medium text-graphite">{t.plans.perMonth}</span>
                </p>
                <p className="mt-3 min-h-[3rem] text-graphite">{copy.summary}</p>

                <h4 className="type-label mt-8 text-ink/60">{t.plans.includes}</h4>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {copy.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 size-4 shrink-0 text-pulse-deep">
                        <path d="M4.5 10.5 8.5 14l7-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="type-label mt-7 text-ink/60">{t.plans.limits}</h4>
                <p className="mt-2 text-sm text-graphite">{copy.limits}</p>

                <div className="mt-auto pt-9">
                  <a
                    href="#contacto"
                    onClick={() => choose(plan.id)}
                    className={`group inline-flex min-h-12 w-full items-center justify-between rounded-full pl-6 pr-2 font-semibold transition-colors duration-200 ${
                      selected ? "bg-pulse-deep text-paper hover:bg-ink" : "bg-ink text-paper hover:bg-pulse-deep"
                    }`}
                  >
                    {t.plans.cta}
                    <span className="flex size-8 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5">
                        <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </a>
                </div>
              </li>
            );
          })}
        </ol>

        <details className="group mt-14 border-t border-ink/15">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 font-semibold">
            {t.plans.compareShow}
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-full border border-ink/20 transition-transform duration-300 group-open:rotate-45"
            >
              <svg viewBox="0 0 16 16" className="size-3.5">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
          </summary>
          <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">{t.plans.compareCaption}</caption>
              <thead>
                <tr className="border-b border-ink/15">
                  <th scope="col" className="type-label py-4 pr-4 font-semibold text-ink/60">
                    {t.plans.feature}
                  </th>
                  {site.plans.map((plan) => (
                    <th key={plan.id} scope="col" className="type-label w-[18%] py-4 text-center font-semibold">
                      {t.plans.items[plan.id].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {site.comparison.map((row) => (
                  <tr key={row.id} className="border-b border-ink/10">
                    <th scope="row" className="py-4 pr-4 font-medium">
                      {t.plans.comparison[row.id]}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={i} className="py-4 text-center">
                        {typeof value === "string" ? (
                          <span className="font-semibold text-pulse-deep">{t.plans.comparison[value]}</span>
                        ) : (
                          <Check included={value} label={value ? t.common.included : t.common.notIncluded} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </section>
  );
}
