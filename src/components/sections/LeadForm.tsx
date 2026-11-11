"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/content/dictionaries/types";
import type { Locale } from "@/i18n/config";
import {
  leadLimits,
  leadRoles,
  leadStages,
  type LeadErrorCode,
  type LeadField,
} from "@/lib/lead";

type Props = {
  locale: Locale;
  dict: Dictionary["form"];
  privacyHref: string;
  thanksHref: string;
  /** Откуда пришла заявка — попадёт в письмо менеджеру. */
  page: string;
};

type Errors = Partial<Record<LeadField, LeadErrorCode>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Форма заявки. Отправляет JSON на /api/lead и переводит на «Спасибо за заявку». */
export function LeadForm({
  locale,
  dict,
  privacyHref,
  thanksHref,
  page,
}: Props) {
  const router = useRouter();
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const str = (key: string) => String(fd.get(key) ?? "").trim();

    const data = {
      name: str("name"),
      phone: str("phone"),
      email: str("email"),
      role: str("role"),
      stage: str("stage"),
      city: str("city"),
      message: str("message"),
      consent: fd.get("consent") === "on",
      website: str("website"),
      locale,
      page,
    };

    const found: Errors = {};
    if (!data.name) found.name = "required";
    if (data.phone.replace(/\D/g, "").length < 5) found.phone = "required";
    if (data.email && !EMAIL_RE.test(data.email)) found.email = "email";
    if (!data.role) found.role = "required";
    if (!data.consent) found.consent = "consent";

    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Errors;
      };
      if (res.ok && json.ok) {
        form.reset();
        setStatus("idle");
        router.push(thanksHref);
        return;
      }
      if (json.errors) setErrors(json.errors);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const err = (field: LeadField) =>
    errors[field] ? dict.errors[errors[field]] : undefined;
  const id = (name: string) => `${uid}-${name}`;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field
        id={id("name")}
        label={dict.fields.name}
        required
        error={err("name")}
      >
        <input
          id={id("name")}
          name="name"
          autoComplete="name"
          maxLength={leadLimits.name}
          className={inputClass}
          {...a11y(id("name"), err("name"))}
        />
      </Field>

      <Field
        id={id("phone")}
        label={dict.fields.phone}
        required
        error={err("phone")}
      >
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7"
          maxLength={leadLimits.phone}
          className={inputClass}
          {...a11y(id("phone"), err("phone"))}
        />
      </Field>

      <Field id={id("email")} label={dict.fields.email} error={err("email")}>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={leadLimits.email}
          className={inputClass}
          {...a11y(id("email"), err("email"))}
        />
      </Field>

      <Field id={id("city")} label={dict.fields.city}>
        <input
          id={id("city")}
          name="city"
          autoComplete="address-level2"
          maxLength={leadLimits.city}
          className={inputClass}
        />
      </Field>

      <Field
        id={id("role")}
        label={dict.fields.role}
        required
        error={err("role")}
      >
        <Select id={id("role")} name="role" {...a11y(id("role"), err("role"))}>
          <option value="">{dict.select}</option>
          {leadRoles.map((role) => (
            <option key={role} value={role}>
              {dict.roles[role]}
            </option>
          ))}
        </Select>
      </Field>

      <Field id={id("stage")} label={dict.fields.stage}>
        <Select id={id("stage")} name="stage">
          <option value="">{dict.select}</option>
          {leadStages.map((stage) => (
            <option key={stage} value={stage}>
              {dict.stages[stage]}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        id={id("message")}
        label={dict.fields.message}
        className="sm:col-span-2"
      >
        <textarea
          id={id("message")}
          name="message"
          rows={4}
          maxLength={leadLimits.message}
          placeholder={dict.fields.messagePlaceholder}
          className={`${inputClass} h-auto resize-y py-3`}
        />
      </Field>

      {/* Ловушка для ботов — скрыта от людей и скринридеров. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-5 sm:col-span-2 md:flex-row md:items-start md:justify-between">
        <div>
          <label className="flex max-w-xl cursor-pointer gap-3 text-[15px] leading-snug text-ink-muted">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-brand"
              {...a11y(id("consent"), err("consent"))}
            />
            <span>
              {dict.consentBefore}
              <Link
                href={privacyHref}
                target="_blank"
                className="font-medium text-brand underline underline-offset-2"
              >
                {dict.consentLink}
              </Link>
              {dict.consentAfter}
              <span className="text-brand"> *</span>
            </span>
          </label>
          {err("consent") && (
            <ErrorText id={id("consent")}>{err("consent")}</ErrorText>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClass("primary", "lg", "w-full shrink-0 md:w-auto")}
        >
          {status === "sending" ? dict.sending : dict.submit}
          {status !== "sending" && <Icon name="arrowRight" size={18} />}
        </button>
      </div>

      <div className="sm:col-span-2" aria-live="polite">
        {status === "error" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-[15px] text-red-800">
            {dict.errors.generic}
          </p>
        )}
      </div>
    </form>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-[16px] text-ink placeholder:text-ink-subtle/70 transition-colors outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 aria-[invalid=true]:border-red-500";

function a11y(id: string, error?: string) {
  return error
    ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` }
    : {};
}

function Field({
  id,
  label,
  required,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-[15px] font-semibold text-ink"
      >
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      {children}
      {error && <ErrorText id={id}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
      {children}
    </p>
  );
}

function Select(props: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${inputClass} cursor-pointer appearance-none pr-11`}
      />
      <Icon
        name="chevronDown"
        size={18}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-subtle"
      />
    </div>
  );
}
