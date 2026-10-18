"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { focusContactHeading, useRequest } from "@/components/providers/RequestProvider";
import { IllustrativeMap } from "@/components/ui/IllustrativeMap";
import { SectionIntro } from "@/components/ui/SectionIntro";

function HoursList({ title, rows }: { title: string; rows: readonly { days: "weekdays" | "saturday" | "sunday"; open: string; close: string }[] }) {
  const { t } = useLanguage();
  return (
    <div>
      <h3 className="type-label text-bone/60">{title}</h3>
      <dl className="mt-3">
        {rows.map((row) => (
          <div key={row.days} className="flex items-baseline justify-between gap-4 border-b border-bone/10 py-2.5">
            <dt className="text-bone/85">{t.location.days[row.days]}</dt>
            <dd className="tabular-nums text-bone">
              {row.open}–{row.close}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Location() {
  const { t } = useLanguage();
  const { startRequest } = useRequest();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);
  const [whatsappNote, setWhatsappNote] = useState(false);

  return (
    <section id="ubicaciones" aria-labelledby="ubicaciones-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionIntro index="07" eyebrow={t.location.eyebrow} title={t.location.title} titleId="ubicaciones-title" lead={t.location.lead} />

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <figure data-reveal className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-sm border border-bone/10">
              <IllustrativeMap
                idSuffix="inline"
                title={t.location.mapLabel}
                description={t.location.mapAlt}
                cityLabel={site.city.split(",")[0]}
                zoomOnView
                className="block aspect-[10/7] w-full"
              />
              <button
                ref={expandRef}
                type="button"
                onClick={() => dialogRef.current?.showModal()}
                className="absolute bottom-4 right-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-bone px-4 text-sm font-semibold text-ink transition-colors hover:bg-white"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5">
                  <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {t.location.mapExpand}
              </button>
            </div>
            <figcaption className="type-label mt-4 flex items-center gap-3 text-bone/60">
              <span aria-hidden="true" className="inline-block h-px w-6 bg-pulse" />
              {t.location.mapLabel}
            </figcaption>
          </figure>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <h3 className="type-label text-bone/60">{t.location.addressLabel}</h3>
              <address className="mt-3 text-xl not-italic leading-snug">
                {t.location.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-2 text-sm text-mute">{t.location.addressNote}</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <HoursList title={t.location.gymHours} rows={site.hours.gym} />
              <HoursList title={t.location.receptionHours} rows={site.hours.reception} />
            </div>

            <div>
              <h3 className="type-label text-bone/60">{t.location.channels}</h3>
              <dl className="mt-3 grid grid-cols-[6rem_1fr] gap-y-2 text-bone/85">
                <dt className="text-mute">{t.location.email}</dt>
                <dd>{site.contact.email}</dd>
                <dt className="text-mute">{t.location.phone}</dt>
                <dd className="tabular-nums">{site.contact.phone}</dd>
              </dl>
              <p className="mt-2 text-sm text-mute">{t.location.channelsNote}</p>
              <button
                type="button"
                aria-expanded={whatsappNote}
                aria-controls="whatsapp-demo-note"
                onClick={() => setWhatsappNote((v) => !v)}
                className="mt-5 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-bone/25 px-5 text-sm font-semibold transition-colors hover:border-bone"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4">
                  <path d="M10 2.5a7.5 7.5 0 0 0-6.4 11.4L2.5 17.5l3.7-1A7.5 7.5 0 1 0 10 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
                {t.location.whatsappButton}
                <span className="type-label rounded-full bg-bone/10 px-2 py-0.5 text-[0.6rem]">{t.common.demoBadge}</span>
              </button>
              <div id="whatsapp-demo-note" hidden={!whatsappNote} role="status" className="mt-4 rounded-sm border-l-2 border-pulse bg-ink-2 p-4 text-sm text-bone/85">
                <p>{t.location.whatsappDemo}</p>
                <a
                  href="#contacto"
                  onClick={() => {
                    startRequest("visita");
                    focusContactHeading();
                  }}
                  className="mt-3 inline-flex min-h-11 items-center font-semibold text-pulse underline-offset-4 hover:underline"
                >
                  {t.location.whatsappGoForm}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="map-dialog-title"
        className="m-auto w-[min(64rem,calc(100vw-2rem))] max-w-none rounded-md border border-bone/15 bg-ink p-0 text-bone"
        onClose={() => expandRef.current?.focus()}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-bone/10 px-5 py-3">
          <h2 id="map-dialog-title" className="type-label">
            {t.location.mapDialogTitle}
          </h2>
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            className="flex size-11 items-center justify-center rounded-full border border-bone/15"
          >
            <span className="sr-only">{t.common.close}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <IllustrativeMap idSuffix="dialog" title={t.location.mapLabel} description={t.location.mapAlt} className="block aspect-[10/7] max-h-[75vh] w-full" />
        <p className="px-5 py-4 text-sm text-mute">{t.location.mapNote}</p>
      </dialog>
    </section>
  );
}
