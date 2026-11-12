"use client";

import { useActionState, useRef } from "react";
import { submitFarmerSignup, type FormState } from "@/app/actions/forms";
import { crops } from "@/content/crops";
import { Button } from "@/components/ui/button";
import { Field, TextInput, SelectInput, CheckboxField, Honeypot, FormError, FormErrorSummary } from "@/components/forms/fields";
import { useFocusFirstError } from "@/components/forms/use-focus-first-error";

const initial: FormState = { status: "idle" };

export function FarmerSignupForm({ sourcePage }: { sourcePage: string }) {
  const [state, action, pending] = useActionState(submitFarmerSignup, initial);
  const formRef = useRef<HTMLFormElement>(null);
  useFocusFirstError(formRef, state);
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  // The action returns the chosen crops as a "|" separated string, so a re-displayed form keeps them ticked.
  const selectedCrops = new Set<string>((values.crops ?? "").split("|").filter(Boolean));

  return (
    <form ref={formRef} action={action} noValidate className="relative space-y-6" aria-describedby="signup-status">
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <Honeypot />
      <div id="signup-status" aria-live="polite">
        <FormError message={state.message} />
      </div>
      <FormErrorSummary count={Object.keys(errors).length} />

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <TextInput id="fullName" name="fullName" autoComplete="name" required error={errors.fullName} defaultValue={values.fullName ?? ""} />
        </Field>
        <Field id="phone" label="Phone number" required error={errors.phone} hint="Include your country code, for example +254, +233 or +225.">
          <TextInput id="phone" name="phone" type="tel" autoComplete="tel" required error={errors.phone} defaultValue={values.phone ?? ""} />
        </Field>
        <Field id="country" label="Country" required error={errors.country}>
          <SelectInput id="country" name="country" required error={errors.country} defaultValue={values.country ?? ""}>
            <option value="" disabled>
              Choose your country
            </option>
            <option value="Kenya">Kenya</option>
            <option value="Ghana">Ghana</option>
            <option value="Côte d&apos;Ivoire">Côte d&apos;Ivoire</option>
          </SelectInput>
        </Field>
        <Field id="hub" label="Nearest town or hub" required error={errors.hub} hint="For example Ol Kalou, Kumasi or Bouaké">
          <TextInput id="hub" name="hub" required error={errors.hub} defaultValue={values.hub ?? ""} />
        </Field>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-[14px] font-bold text-ink">
          Crops you grow <span className="font-normal text-ink-muted">(required, choose at least one)</span>
        </legend>
        {errors.crops ? (
          <p className="text-[14px] font-semibold text-status-danger">{errors.crops}</p>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-2">
          {crops.map((c) => (
            <label key={c.slug} className="flex min-h-11 items-center gap-3 rounded-md border border-line px-4 py-2 text-[15px] hover:bg-surface-ivory">
              <input type="checkbox" name="crops" value={c.name} className="h-5 w-5 accent-forest" defaultChecked={selectedCrops.has(c.name)} />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 md:grid-cols-3">
        <Field id="farmSize" label="Farm size" required error={errors.farmSize}>
          <TextInput id="farmSize" name="farmSize" inputMode="decimal" required error={errors.farmSize} defaultValue={values.farmSize ?? ""} />
        </Field>
        <Field id="farmUnit" label="Unit" required error={errors.farmUnit}>
          <SelectInput id="farmUnit" name="farmUnit" required error={errors.farmUnit} defaultValue={values.farmUnit ?? ""}>
            <option value="" disabled>
              Choose a unit
            </option>
            <option value="acres">Acres</option>
            <option value="hectares">Hectares</option>
          </SelectInput>
        </Field>
        <Field id="cooperativeMember" label="Member of a cooperative?" required error={errors.cooperativeMember}>
          <SelectInput id="cooperativeMember" name="cooperativeMember" required error={errors.cooperativeMember} defaultValue={values.cooperativeMember ?? ""}>
            <option value="" disabled>
              Choose an answer
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </SelectInput>
        </Field>
      </div>

      <CheckboxField id="consent" name="consent" error={errors.consent}>
        I agree that AAAN may contact me about joining the network. See our{" "}
        <a href="/en/privacy" className="font-bold text-ink-brand underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </CheckboxField>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending} aria-disabled={pending}>
          {pending ? "Sending…" : "Join the network"}
        </Button>
      </div>
    </form>
  );
}
