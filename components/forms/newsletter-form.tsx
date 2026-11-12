"use client";

import { useActionState, useId, useRef } from "react";
import { submitNewsletter, type FormState } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { TextInput, CheckboxField, Honeypot } from "@/components/forms/fields";
import { useFocusFirstError } from "@/components/forms/use-focus-first-error";

const initial: FormState = { status: "idle" };

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [state, action, pending] = useActionState(submitNewsletter, initial);
  const formRef = useRef<HTMLFormElement>(null);
  useFocusFirstError(formRef, state);
  // Unique ids: the footer and the news page both show this form.
  const uid = useId();
  const emailId = `${uid}-email`;
  const consentId = `${uid}-consent`;
  const dark = tone === "dark";
  const labelCls = dark ? "text-ivory" : "text-ink";
  const textCls = dark ? "text-ivory" : "text-ink";
  const errorCls = dark ? "text-gold" : "text-status-danger";

  if (state.status === "subscribed") {
    return (
      <p role="status" className={`text-[16px] font-semibold ${textCls}`}>
        {state.message}
      </p>
    );
  }

  return (
    <form ref={formRef} action={action} noValidate className="relative space-y-4" aria-label="Newsletter sign-up">
      <Honeypot />
      <label htmlFor={emailId} className={`block text-[14px] font-bold ${labelCls}`}>
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="min-w-0 flex-1">
          <TextInput
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email"
            required
            error={state.errors?.email}
            defaultValue={state.values?.email ?? ""}
          />
        </div>
        <Button type="submit" variant={dark ? "gold" : "primary"} disabled={pending} aria-disabled={pending} className="w-full sm:w-auto">
          {pending ? "Sending…" : "Subscribe"}
        </Button>
      </div>
      {state.errors?.email ? (
        <p id={`${emailId}-error`} className={`text-[14px] font-semibold ${errorCls}`}>
          {state.errors.email}
        </p>
      ) : null}
      {state.message ? (
        <p role="alert" className={`text-[14px] font-semibold ${errorCls}`}>
          {state.message}
        </p>
      ) : null}
      <CheckboxField id={consentId} name="consent" error={state.errors?.consent}>
        <span className={textCls}>
          I agree that AAAN may send me the monthly harvest update. See our{" "}
          <a href="/en/privacy" className={`font-bold underline underline-offset-4 ${dark ? "text-gold" : "text-ink-brand"}`}>
            Privacy Policy
          </a>
          .
        </span>
      </CheckboxField>
    </form>
  );
}
