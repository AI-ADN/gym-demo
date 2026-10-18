"use client";

import { locales } from "@/content/i18n";
import { useLanguage } from "@/components/providers/LanguageProvider";

const LABELS = { es: { short: "ES", long: "Español" }, en: { short: "EN", long: "English" } } as const;

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div role="group" aria-label={t.common.languageLabel} className={`flex items-center ${className}`}>
      {locales.map((code, i) => {
        const active = code === locale;
        return (
          <span key={code} className="flex items-center">
            {i > 0 ? <span aria-hidden="true" className="mx-1 h-3 w-px bg-current opacity-30" /> : null}
            <button
              type="button"
              lang={code}
              aria-pressed={active}
              aria-label={LABELS[code].long}
              onClick={() => setLocale(code)}
              className={`type-label min-h-11 min-w-9 px-1.5 transition-opacity duration-200 ${
                active ? "opacity-100" : "opacity-55 hover:opacity-100"
              }`}
            >
              <span className={active ? "border-b border-current pb-0.5" : "pb-0.5"}>{LABELS[code].short}</span>
            </button>
          </span>
        );
      })}
    </div>
  );
}
