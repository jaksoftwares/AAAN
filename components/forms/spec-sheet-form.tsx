"use client";

import { useActionState, useRef } from "react";
import { submitEnquiry, type FormState } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Field, TextInput, CheckboxField, Honeypot, FormError, FormErrorSummary } from "@/components/forms/fields";
import { useFocusFirstError } from "@/components/forms/use-focus-first-error";

const initial: FormState = { status: "idle" };

// Specification sheet requests are saved as general enquiries, so they use the same checks and storage.
export function SpecSheetForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const formRef = useRef<HTMLFormElement>(null);
  useFocusFirstError(formRef, state);
  const values = state.values ?? {};
  const errors = state.errors ?? {};

  return (
    <form ref={formRef} action={action} noValidate className="relative space-y-6" aria-label="Specification sheet request">
      <input type="hidden" name="type" value="general" />
      <input type="hidden" name="sourcePage" value="/en/quality" />
      <input type="hidden" name="message" value="Please send the specification sheet for the product named above." />
      <Honeypot />
      <div aria-live="polite">
        <FormError message={state.message} />
      </div>
      <FormErrorSummary count={Object.keys(errors).length} />

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="spec-product" label="Product" required error={errors.product}>
          <TextInput id="spec-product" name="product" required error={errors.product} defaultValue={values.product ?? ""} />
        </Field>
        <Field id="spec-name" label="Name" required error={errors.name}>
          <TextInput id="spec-name" name="name" autoComplete="name" required error={errors.name} defaultValue={values.name ?? ""} />
        </Field>
        <Field id="spec-company" label="Company" error={errors.company}>
          <TextInput id="spec-company" name="company" autoComplete="organization" error={errors.company} defaultValue={values.company ?? ""} />
        </Field>
        <Field id="spec-email" label="Email" required error={errors.email}>
          <TextInput id="spec-email" name="email" type="email" autoComplete="email" required error={errors.email} defaultValue={values.email ?? ""} />
        </Field>
      </div>

      <CheckboxField id="spec-consent" name="consent" error={errors.consent}>
        I agree that AAAN may contact me about my enquiry. See our{" "}
        <a href="/en/privacy" className="font-bold text-ink-brand underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </CheckboxField>

      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Sending…" : "Send me the sheet"}
      </Button>
    </form>
  );
}
