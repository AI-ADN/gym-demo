"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

type Page = "home" | "privacy" | "notFound";

/**
 * Keeps the tab title in the active language. Static metadata only covers the Spanish render,
 * and Next.js writes it after hydration, so the localized title is re-applied whenever it changes.
 */
export function DocumentTitle({ page }: { page: Page }) {
  const { t } = useLanguage();
  useEffect(() => {
    const title =
      page === "home" ? t.meta.title : `${page === "privacy" ? t.privacy.title : t.notFound.title} — PULSO Athletic Club`;
    const apply = () => {
      if (document.title !== title) document.title = title;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [page, t]);
  return null;
}
