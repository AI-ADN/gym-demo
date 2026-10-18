"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SectionId } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { focusContactHeading, useRequest } from "@/components/providers/RequestProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Wordmark } from "@/components/ui/Wordmark";
import { useActiveSection } from "@/hooks/useActiveSection";
import { MobileMenu } from "./MobileMenu";

const PRIMARY: { id: SectionId; className?: string }[] = [
  { id: "nosotros" },
  { id: "instalaciones" },
  { id: "equipo", className: "hidden xl:block" },
  { id: "paquetes" },
  { id: "ubicaciones" },
];
const MORE: { id: SectionId; className?: string }[] = [
  { id: "equipo", className: "xl:hidden" },
  { id: "equipamiento" },
  { id: "clases" },
  { id: "preguntas" },
  { id: "contacto" },
];
const TRACKED = ["nosotros", "equipamiento", "instalaciones", "equipo", "clases", "paquetes", "ubicaciones", "preguntas", "contacto"] as const;

export function SiteHeader() {
  const { t } = useLanguage();
  const { startRequest } = useRequest();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const prefix = onHome ? "" : "/";
  const active = useActiveSection(TRACKED);

  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24 || !onHome);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
        moreButtonRef.current?.focus();
      }
    };
    const onFocusOut = (event: FocusEvent) => {
      if (event.relatedTarget && !moreRef.current?.contains(event.relatedTarget as Node)) setMoreOpen(false);
    };
    const node = moreRef.current;
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    node?.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      node?.removeEventListener("focusout", onFocusOut);
    };
  }, [moreOpen]);

  const handleVisit = () => {
    startRequest("visita");
    if (onHome) focusContactHeading();
  };

  const linkClass = (id: SectionId) =>
    `relative py-2 text-[0.9375rem] font-medium transition-colors duration-200 hover:text-bone ${
      active === id && onHome ? "text-bone" : "text-bone/72"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-bone/10 bg-ink/82 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <a href="#contenido" className="sr-only-focusable rounded bg-bone px-4 py-2 text-ink">
        {t.common.skip}
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" aria-label={t.nav.home} className="-my-2 flex min-h-11 items-center py-2 text-bone">
          <Wordmark />
        </Link>

        <nav aria-label={t.nav.label} className="hidden items-center gap-6 lg:flex xl:gap-8">
          <ul className="flex items-center gap-5 xl:gap-7">
            {PRIMARY.map(({ id, className }) => (
              <li key={id} className={className}>
                <a
                  href={`${prefix}#${id}`}
                  className={linkClass(id)}
                  aria-current={active === id && onHome ? "location" : undefined}
                >
                  {t.nav.sections[id]}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px bg-pulse transition-[width] duration-300 ${
                      active === id && onHome ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              </li>
            ))}
            <li ref={moreRef} className="relative">
              <button
                ref={moreButtonRef}
                type="button"
                aria-expanded={moreOpen}
                aria-controls="nav-more"
                onClick={() => setMoreOpen((open) => !open)}
                className="flex items-center gap-1.5 py-2 text-[0.9375rem] font-medium text-bone/72 transition-colors hover:text-bone"
              >
                {t.nav.more}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 12"
                  className={`size-3 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                >
                  <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <ul
                id="nav-more"
                hidden={!moreOpen}
                className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-bone/10 bg-ink-2/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-md"
              >
                {MORE.map(({ id, className }) => (
                  <li key={id} className={className}>
                    <a
                      href={`${prefix}#${id}`}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[0.9375rem] text-bone/80 transition-colors hover:bg-bone/6 hover:text-bone"
                    >
                      {t.nav.sections[id]}
                      {active === id && onHome ? <span aria-hidden="true" className="size-1.5 rounded-full bg-pulse" /> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <LanguageToggle className="text-bone" />
          <a
            href={`${prefix}#contacto`}
            onClick={handleVisit}
            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-pulse px-5 text-[0.9375rem] font-semibold text-ink transition-colors duration-200 hover:bg-pulse-bright"
          >
            {t.nav.cta}
          </a>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageToggle className="text-bone" />
          <MobileMenu prefix={prefix} active={onHome ? active : null} onVisit={handleVisit} />
        </div>
      </div>
    </header>
  );
}
