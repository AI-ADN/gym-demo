"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { PlanId } from "@/content/site";
import { emptyRequest, type Reason, type RequestValues } from "@/lib/request";

export type RequestStatus = "editing" | "prepared";

interface RequestContextValue {
  values: RequestValues;
  status: RequestStatus;
  setValues: (updater: (prev: RequestValues) => RequestValues) => void;
  setStatus: (status: RequestStatus) => void;
  /** Called from CTAs outside the form: keeps the rest of the draft intact. */
  startRequest: (reason: Reason, plan?: PlanId) => void;
  reset: () => void;
}

const RequestContext = createContext<RequestContextValue | null>(null);

/** In-memory only: the demo request is never transmitted or persisted. */
export function RequestProvider({ children }: { children: ReactNode }) {
  const [values, setValuesState] = useState<RequestValues>(emptyRequest);
  const [status, setStatus] = useState<RequestStatus>("editing");

  const setValues = useCallback((updater: (prev: RequestValues) => RequestValues) => {
    setValuesState(updater);
  }, []);

  const startRequest = useCallback((reason: Reason, plan?: PlanId) => {
    setValuesState((prev) => ({ ...prev, reason, plan: plan ?? prev.plan }));
    setStatus("editing");
  }, []);

  const reset = useCallback(() => {
    setValuesState(emptyRequest);
    setStatus("editing");
  }, []);

  const value = useMemo(
    () => ({ values, status, setValues, setStatus, startRequest, reset }),
    [values, status, setValues, startRequest, reset],
  );

  return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>;
}

export function useRequest(): RequestContextValue {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequest must be used inside RequestProvider");
  return ctx;
}

/** Moves keyboard/screen-reader focus to the contact form heading after an in-page CTA. */
export function focusContactHeading() {
  window.setTimeout(() => {
    document.getElementById("contacto-title")?.focus({ preventScroll: true });
  }, 60);
}
