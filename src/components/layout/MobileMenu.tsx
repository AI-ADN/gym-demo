"use client";

import { useEffect, useRef, useState } from "react";
import { site, type SectionId } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

interface MobileMenuProps {
  prefix: string;
  active: string | null;
  onVisit: () => void;
}

export function MobileMenu({ prefix, active, onVisit }: MobileMenuProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };

  const close = () => {
    dialogRef.current?.close();
    document.documentElement.style.overflow = "";
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex size-11 items-center justify-center rounded-full text-bone"
      >
        <span className="sr-only">{t.nav.menuOpen}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
          <path d="M4 8h16M4 16h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={t.nav.label}
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-bone"
      >
        <div className="flex h-full flex-col">
          <div className="container-x flex h-16 items-center justify-between">
            <span className="type-label text-mute">{t.common.demoConcept}</span>
            <button
              type="button"
              onClick={close}
              className="flex size-11 items-center justify-center rounded-full border border-bone/15"
            >
              <span className="sr-only">{t.nav.menuClose}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav aria-label={t.nav.label} className="container-x flex-1 overflow-y-auto pb-6 pt-4">
            <ol className="flex flex-col">
              {site.sections.map((id: SectionId, i) => (
                <li key={id} className="border-b border-bone/8">
                  <a
                    href={`${prefix}#${id}`}
                    onClick={close}
                    aria-current={active === id ? "location" : undefined}
                    className="flex items-baseline gap-4 py-3.5"
                  >
                    <span className="type-label w-6 tabular-nums text-pulse">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`type-title text-[2rem] ${active === id ? "text-bone" : "text-bone/80"}`}>
                      {t.nav.sections[id]}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="container-x flex items-center justify-between gap-4 border-t border-bone/10 py-5">
            <LanguageToggle />
            <a
              href={`${prefix}#contacto`}
              onClick={() => {
                close();
                onVisit();
              }}
              className="inline-flex min-h-12 items-center rounded-full bg-pulse px-6 font-semibold text-ink"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
