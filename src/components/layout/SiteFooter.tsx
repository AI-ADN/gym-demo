"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PulseLine } from "@/components/ui/PulseLine";
import { Wordmark } from "@/components/ui/Wordmark";

export function SiteFooter() {
  const { t } = useLanguage();
  const prefix = usePathname() === "/" ? "" : "/";

  return (
    <footer className="relative border-t border-bone/10 bg-ink pb-10 pt-16 md:pt-24">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="type-title text-[clamp(1.75rem,3vw,2.5rem)] text-bone/90">{t.footer.tagline}</p>
            <PulseLine className="mt-6 h-5 w-40 text-pulse" />
          </div>

          <nav aria-label={t.footer.explore} className="md:col-span-3 md:col-start-7">
            <h2 className="type-label text-bone/55">{t.footer.explore}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 md:grid-cols-1">
              {site.sections.map((id) => (
                <li key={id}>
                  <a href={`${prefix}#${id}`} className="inline-flex min-h-10 items-center text-bone/80 transition-colors hover:text-bone">
                    {t.nav.sections[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="type-label text-bone/55">{t.footer.hours}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {site.hours.gym.map((row) => (
                <div key={row.days} className="flex justify-between gap-4 border-b border-bone/8 pb-2">
                  <dt className="text-bone/70">{t.location.days[row.days]}</dt>
                  <dd className="tabular-nums">
                    {row.open}–{row.close}
                  </dd>
                </div>
              ))}
            </dl>
            <Link href="/privacidad/" className="mt-6 inline-flex min-h-11 items-center underline underline-offset-4 hover:text-white">
              {t.footer.privacy}
            </Link>
          </div>
        </div>

        <Wordmark size="xl" className="mt-16 text-bone md:mt-24" />

        <div className="mt-10 flex flex-col gap-4 border-t border-bone/10 pt-6 text-sm text-mute md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl">
            <span className="type-label mr-2 rounded-full border border-pulse/50 px-2 py-0.5 text-pulse">{t.common.demoBadge}</span>
            {t.footer.demo}
          </p>
          <p className="shrink-0">{t.footer.credits}</p>
        </div>
      </div>
    </footer>
  );
}
