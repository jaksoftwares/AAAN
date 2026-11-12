"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { submitEnquiry, type FormState } from "@/app/actions/forms";
import { enquiryReasons, type EnquiryType } from "@/content/site";
import { crops } from "@/content/crops";
import { Button } from "@/components/ui/button";
import { Field, TextInput, SelectInput, TextArea, CheckboxField, Honeypot, FormError, FormErrorSummary } from "@/components/forms/fields";
import { useFocusFirstError } from "@/components/forms/use-focus-first-error";

const initial: FormState = { status: "idle" };

const quoteUnits = ["tonnes", "kilograms", "bags", "cartons", "containers"];
const countries = ["Kenya", "Ghana", "Côte d'Ivoire", "Other"];

// One enquiry form for every contact reason. Quote requests show the trade fields.
// Farmers and cooperatives are sent to the Join the network form instead of this one.
export function EnquiryForm({
  allowedTypes,
  lockedType,
  defaultType,
  sourcePage,
  submitLabel = "Send your enquiry",
}: {
  allowedTypes?: EnquiryType[];
  lockedType?: EnquiryType;
  defaultType?: EnquiryType;
  sourcePage: string;
  submitLabel?: string;
}) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const formRef = useRef<HTMLFormElement>(null);
  useFocusFirstError(formRef, state);
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const [type, setType] = useState<string>(lockedType ?? values.type ?? defaultType ?? "");

  const reasons = enquiryReasons.filter((r) => !allowedTypes || allowedTypes.includes(r.value));
  const isQuote = (lockedType ?? type) === "quote";
  const isFarmer = !lockedType && type === "farmer";

  return (
    <form ref={formRef} action={action} noValidate className="relative space-y-6" aria-describedby="form-status">
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <Honeypot />
      <div id="form-status" aria-live="polite">
        <FormError message={state.message} />
      </div>
      <FormErrorSummary count={Object.keys(errors).length} />

      {lockedType ? (
        <input type="hidden" name="type" value={lockedType} />
      ) : (
        <Field id="type" label="What can we help you with?" required error={errors.type}>
          <SelectInput
            id="type"
            name="type"
            required
            error={errors.type}
            defaultValue={values.type ?? defaultType ?? ""}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Choose a reason
            </option>
            {reasons.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </SelectInput>
        </Field>
      )}

      {isFarmer ? (
        <div className="rounded-xl border border-line bg-surface-ivory p-6">
          <p className="text-[16px] leading-7 text-ink">Farmers and cooperatives join the network through our sign-up form.</p>
          <div className="mt-5">
            <Link href="/en/join#sign-up" className="font-bold text-ink-brand underline underline-offset-4">
              Go to the Join the network form
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <Field id="name" label="Full name" required error={errors.name}>
              <TextInput id="name" name="name" autoComplete="name" required error={errors.name} defaultValue={values.name ?? ""} />
            </Field>
            <Field id="email" label="Email" required error={errors.email} hint="For example name@company.com">
              <TextInput id="email" name="email" type="email" autoComplete="email" required error={errors.email} defaultValue={values.email ?? ""} />
            </Field>
            <Field id="phone" label="Phone" error={errors.phone} hint="Include your country code, for example +254, +233 or +225.">
              <TextInput id="phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} defaultValue={values.phone ?? ""} />
            </Field>
            <Field id="company" label="Company or organisation" error={errors.company}>
              <TextInput id="company" name="company" autoComplete="organization" error={errors.company} defaultValue={values.company ?? ""} />
            </Field>
          </div>

          {isQuote ? (
            <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-2">
              <Field id="crop" label="Crop" error={errors.crop}>
                <SelectInput id="crop" name="crop" error={errors.crop} defaultValue={values.crop ?? ""}>
                  <option value="">Choose a crop</option>
                  {crops.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                  <option value="Other">Something else</option>
                </SelectInput>
              </Field>
              <Field id="product" label="Product" hint="For example cocoa liquor, raw cashew nuts or fresh pineapples" error={errors.product}>
                <TextInput id="product" name="product" error={errors.product} defaultValue={values.product ?? ""} />
              </Field>
              <Field id="quantity" label="Quantity" error={errors.quantity}>
                <TextInput id="quantity" name="quantity" inputMode="decimal" error={errors.quantity} defaultValue={values.quantity ?? ""} />
              </Field>
              <Field id="unit" label="Unit" error={errors.unit}>
                <SelectInput id="unit" name="unit" error={errors.unit} defaultValue={values.unit ?? ""}>
                  <option value="">Choose a unit</option>
                  {quoteUnits.map((u) => (
                    <option key={u} value={u}>
                      {u[0].toUpperCase() + u.slice(1)}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field id="country" label="Destination country" error={errors.country}>
                <SelectInput id="country" name="country" error={errors.country} defaultValue={values.country ?? ""}>
                  <option value="">Choose a country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field id="destination" label="Port or city of delivery" error={errors.destination}>
                <TextInput id="destination" name="destination" error={errors.destination} defaultValue={values.destination ?? ""} />
              </Field>
              <Field id="deliveryPeriod" label="Delivery period" hint="For example June to August 2027" error={errors.deliveryPeriod}>
                <TextInput id="deliveryPeriod" name="deliveryPeriod" error={errors.deliveryPeriod} defaultValue={values.deliveryPeriod ?? ""} />
              </Field>
            </div>
          ) : null}

          <Field id="message" label={isQuote ? "Details and specification" : "Message"} required error={errors.message}>
            <TextArea id="message" name="message" required error={errors.message} defaultValue={values.message ?? ""} />
          </Field>

          <CheckboxField id="consent" name="consent" error={errors.consent}>
            I agree that AAAN may contact me about my enquiry. See our{" "}
            <a href="/en/privacy" className="font-bold text-ink-brand underline underline-offset-4">
              Privacy Policy
            </a>
            .
          </CheckboxField>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button type="submit" disabled={pending} aria-disabled={pending}>
              {pending ? "Sending…" : submitLabel}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
