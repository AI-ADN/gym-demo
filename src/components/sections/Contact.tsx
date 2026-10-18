"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { formatPrice, site, type PlanId } from "@/content/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useRequest } from "@/components/providers/RequestProvider";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  hasErrors,
  LIMITS,
  prepareRequest,
  reasons,
  validateRequest,
  type RequestErrors,
  type RequestValues,
} from "@/lib/request";

const FIELD_ORDER: (keyof RequestValues)[] = ["name", "email", "reason", "plan", "message"];

const inputClass =
  "mt-2 block w-full rounded-md border bg-ink px-4 py-3 text-base text-bone placeholder:text-bone/35 transition-colors duration-200 focus:border-pulse focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pulse";

export function Contact() {
  const { t, locale } = useLanguage();
  const { values, setValues, status, setStatus, reset } = useRequest();
  const [errors, setErrors] = useState<RequestErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (submitted) setErrors(validateRequest(values));
  }, [values, submitted]);

  useEffect(() => {
    if (status === "prepared") summaryRef.current?.focus();
  }, [status]);

  useEffect(() => {
    if (failedAttempts) errorSummaryRef.current?.focus();
  }, [failedAttempts]);

  const update = <K extends keyof RequestValues>(key: K, value: RequestValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const found = validateRequest(values);
    setErrors(found);
    setSubmitted(true);
    if (hasErrors(found)) {
      setFailedAttempts((n) => n + 1);
      return;
    }
    setValues(() => prepareRequest(values));
    setStatus("prepared");
  };

  const edit = () => {
    setStatus("editing");
    window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("#req-name")?.focus(), 30);
  };

  const startOver = () => {
    reset();
    setErrors({});
    setSubmitted(false);
    window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("#req-name")?.focus(), 30);
  };

  const errorText = (key: keyof RequestValues) => (errors[key] ? t.contact.errors[errors[key]!] : null);
  const fieldLabel = (key: keyof RequestValues) => t.contact.fields[key];
  const planLabel = (plan: PlanId | "") =>
    plan ? `${t.plans.items[plan].name} · ${formatPrice(site.plans.find((p) => p.id === plan)!.price, locale)} ${t.plans.perMonth}` : t.contact.fields.planNone;

  const describedBy = (key: keyof RequestValues, extra?: string) =>
    [errors[key] ? `req-${key}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  const borderFor = (key: keyof RequestValues) => (errors[key] ? "border-[#ff8a7a]" : "border-bone/18 hover:border-bone/35");

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 size-[36rem] rounded-full bg-pulse/10 blur-[130px]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro index="09" eyebrow={t.contact.eyebrow} />
          <h2
            id="contacto-title"
            tabIndex={-1}
            className="type-display mt-6 text-[clamp(3rem,6vw,5.5rem)] uppercase focus:outline-none"
          >
            {t.contact.title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-mute">{t.contact.lead}</p>
          <p className="mt-8 flex max-w-md gap-3 rounded-sm border border-pulse/40 bg-pulse/8 p-4 text-sm text-bone/90">
            <span className="type-label h-fit shrink-0 self-start rounded-full bg-pulse px-2 py-1 text-ink">{t.common.demoBadge}</span>
            {t.contact.demoNotice}
          </p>
          <Link href="/privacidad/" className="mt-4 inline-flex min-h-11 items-center text-sm text-bone/70 underline underline-offset-4 hover:text-bone">
            {t.contact.privacyLink}
          </Link>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {status === "prepared" ? (
            <div className="rounded-md border border-bone/12 bg-ink-2 p-6 md:p-8">
              <h3 ref={summaryRef} tabIndex={-1} className="type-title flex items-center gap-3 text-[2rem] focus:outline-none">
                <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-pulse text-ink">
                  <svg viewBox="0 0 20 20" className="size-4">
                    <path d="M4.5 10.5 8.5 14l7-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                {t.contact.summaryTitle}
              </h3>
              <p role="status" className="mt-3 text-bone/85">
                {t.contact.summaryText}
              </p>
              <dl className="mt-6 divide-y divide-bone/10 border-y border-bone/10">
                {FIELD_ORDER.map((key) => (
                  <div key={key} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="type-label pt-1 text-bone/55">{fieldLabel(key)}</dt>
                    <dd className="break-words">
                      {key === "reason"
                        ? t.contact.reasons[values.reason]
                        : key === "plan"
                          ? planLabel(values.plan)
                          : values[key] || t.contact.summaryEmpty}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={edit}
                  className="inline-flex min-h-12 items-center rounded-full bg-bone px-6 font-semibold text-ink transition-colors hover:bg-white"
                >
                  {t.contact.summaryEdit}
                </button>
                <button
                  type="button"
                  onClick={startOver}
                  className="inline-flex min-h-12 items-center rounded-full border border-bone/25 px-6 font-medium transition-colors hover:border-bone"
                >
                  {t.contact.summaryReset}
                </button>
              </div>
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="contacto-title" className="flex flex-col gap-6">
              {submitted && hasErrors(errors) ? (
                <div
                  ref={errorSummaryRef}
                  tabIndex={-1}
                  role="alert"
                  className="rounded-md border border-[#ff8a7a]/60 bg-[#ff8a7a]/8 p-4 focus:outline-none"
                >
                  <p className="font-semibold">{t.contact.errorsTitle}</p>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    {FIELD_ORDER.filter((k) => errors[k]).map((k) => (
                      <li key={k}>
                        <a href={`#req-${k}`} className="underline underline-offset-2">
                          {fieldLabel(k)}: {errorText(k)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="req-name" className="font-medium">
                    {t.contact.fields.name}
                  </label>
                  <input
                    id="req-name"
                    name="name"
                    autoComplete="name"
                    maxLength={LIMITS.nameMax + 20}
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={describedBy("name")}
                    aria-required="true"
                    className={`${inputClass} ${borderFor("name")}`}
                  />
                  {errors.name ? (
                    <p id="req-name-error" className="mt-2 text-sm text-[#ffb4a8]">
                      {errorText("name")}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="req-email" className="font-medium">
                    {t.contact.fields.email}
                  </label>
                  <input
                    id="req-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={describedBy("email")}
                    aria-required="true"
                    className={`${inputClass} ${borderFor("email")}`}
                  />
                  {errors.email ? (
                    <p id="req-email-error" className="mt-2 text-sm text-[#ffb4a8]">
                      {errorText("email")}
                    </p>
                  ) : null}
                </div>
              </div>

              <fieldset id="req-reason">
                <legend className="font-medium">{t.contact.fields.reason}</legend>
                <div className="mt-2 grid grid-cols-1 gap-2 xs:grid-cols-3">
                  {reasons.map((reason) => (
                    <label
                      key={reason}
                      className="relative flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-bone/18 px-3 text-center text-sm font-semibold transition-colors has-[:checked]:border-pulse has-[:checked]:bg-pulse/12 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pulse hover:border-bone/40"
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={reason}
                        checked={values.reason === reason}
                        onChange={() => update("reason", reason)}
                        className="sr-only"
                      />
                      {t.contact.reasons[reason]}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="req-plan" className="font-medium">
                  {t.contact.fields.plan} <span className="font-normal text-mute">({t.contact.fields.planOptional})</span>
                </label>
                <div className="relative">
                  <select
                    id="req-plan"
                    name="plan"
                    value={values.plan}
                    onChange={(e) => update("plan", e.target.value as PlanId | "")}
                    className={`${inputClass} border-bone/18 appearance-none pr-10 hover:border-bone/35`}
                  >
                    <option value="">{t.contact.fields.planNone}</option>
                    {site.plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {planLabel(plan.id)}
                      </option>
                    ))}
                  </select>
                  <svg aria-hidden="true" viewBox="0 0 12 12" className="pointer-events-none absolute right-4 top-1/2 mt-1 size-3 -translate-y-1/2">
                    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </div>
              </div>

              <div>
                <label htmlFor="req-message" className="font-medium">
                  {t.contact.fields.message} <span className="font-normal text-mute">({t.contact.fields.messageOptional})</span>
                </label>
                <textarea
                  id="req-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy("message", "req-message-hint")}
                  className={`${inputClass} resize-y ${borderFor("message")}`}
                />
                <div className="mt-2 flex justify-between gap-4 text-sm">
                  <p id="req-message-hint" className="text-mute">
                    {errors.message ? <span id="req-message-error" className="text-[#ffb4a8]">{errorText("message")} </span> : null}
                    {t.contact.fields.messageHint}
                  </p>
                  <span aria-hidden="true" className={`tabular-nums ${values.message.length > LIMITS.messageMax ? "text-[#ffb4a8]" : "text-mute"}`}>
                    {values.message.length}/{LIMITS.messageMax}
                  </span>
                </div>
              </div>

              <div className="flex border-t border-bone/10 pt-6 sm:justify-end">
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-pulse px-7 font-semibold text-ink transition-colors hover:bg-pulse-bright sm:w-auto"
                >
                  {t.contact.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
