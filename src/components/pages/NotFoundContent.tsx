"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { PulseLine } from "@/components/ui/PulseLine";

export function NotFoundContent() {
  const { t } = useLanguage();
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pb-20 pt-32">
      <DocumentTitle page="notFound" />
      <p className="type-display text-[clamp(6rem,22vw,16rem)] leading-none text-bone/10">404</p>
      <PulseLine className="mt-2 h-6 w-48 text-pulse" />
      <h1 className="type-title mt-6 text-[clamp(2.25rem,5vw,4rem)]">{t.notFound.title}</h1>
      <p className="mt-4 max-w-lg text-lg text-mute">{t.notFound.text}</p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 w-fit items-center rounded-full bg-bone px-6 font-semibold text-ink transition-colors hover:bg-white"
      >
        {t.common.backHome}
      </Link>
    </section>
  );
}
