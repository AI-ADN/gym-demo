import type { PlanId } from "@/content/site";

export type Reason = "visita" | "paquetes" | "general";
export const reasons: Reason[] = ["visita", "paquetes", "general"];

export interface RequestValues {
  name: string;
  email: string;
  reason: Reason;
  plan: PlanId | "";
  message: string;
}

export type FieldError = "required" | "tooShort" | "tooLong" | "invalidEmail";
export type RequestErrors = Partial<Record<keyof RequestValues, FieldError>>;

export const LIMITS = { nameMin: 2, nameMax: 80, emailMax: 120, messageMax: 500 } as const;

export const emptyRequest: RequestValues = {
  name: "",
  email: "",
  reason: "visita",
  plan: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateRequest(values: RequestValues): RequestErrors {
  const errors: RequestErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();

  if (!name) errors.name = "required";
  else if (name.length < LIMITS.nameMin) errors.name = "tooShort";
  else if (name.length > LIMITS.nameMax) errors.name = "tooLong";

  if (!email) errors.email = "required";
  else if (email.length > LIMITS.emailMax) errors.email = "tooLong";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "invalidEmail";

  if (!reasons.includes(values.reason)) errors.reason = "required";

  if (values.message.length > LIMITS.messageMax) errors.message = "tooLong";

  return errors;
}

export function hasErrors(errors: RequestErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Normalizes values for the local summary. Nothing is transmitted or persisted. */
export function prepareRequest(values: RequestValues): RequestValues {
  return {
    ...values,
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };
}
