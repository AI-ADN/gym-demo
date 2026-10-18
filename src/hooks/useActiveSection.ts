"use client";

import { useEffect, useState } from "react";

/** Returns the id of the section currently crossing the middle band of the viewport. */
export function useActiveSection(ids: readonly string[], rootMargin = "-45% 0px -50% 0px"): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!elements.length || !("IntersectionObserver" in window)) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const current = ids.find((id) => visible.get(id));
        setActive(current ?? null);
      },
      { rootMargin },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
