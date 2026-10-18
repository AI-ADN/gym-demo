"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { PulseLine } from "@/components/ui/PulseLine";

export function PrivacyContent() {
  const { t } = useLanguage();
  return (
    <article className="container-x pb-24 pt-32 md:pt-40">
      <DocumentTitle page="privacy" />
      <div className="max-w-3xl">
        <div className="flex items-center gap-4">
          <span className="type-label rounded-full border border-pulse/50 px-2 py-0.5 text-pulse">{t.common.demoBadge}</span>
          <PulseLine className="h-4 w-28 text-bone/35" />
        </div>
        <h1 className="type-display mt-6 text-[clamp(3rem,8vw,6rem)] uppercase">{t.privacy.title}</h1>
        <p className="mt-4 text-mute">{t.privacy.updated}</p>

        <div className="mt-14 space-y-12">
          {t.privacy.sections.map((section) => (
            <section key={section.h} className="border-t border-bone/12 pt-6">
              <h2 className="type-title text-[1.75rem]">{section.h}</h2>
              <div className="mt-4 space-y-3 text-lg text-bone/85">
                {section.p.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Link
          href="/"
          className="mt-16 inline-flex min-h-12 items-center rounded-full bg-bone px-6 font-semibold text-ink transition-colors hover:bg-white"
        >
          {t.common.backHome}
        </Link>
      </div>
    </article>
  );
}
