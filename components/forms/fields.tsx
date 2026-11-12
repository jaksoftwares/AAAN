import { useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";

// Form controls. Every control has a visible label, an optional hint, and an error message linked by id.

export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[14px] font-bold text-ink">
        {label}
        {required ? <span className="ml-1 font-normal text-ink-muted">(required)</span> : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-[13px] leading-5 text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-[14px] font-semibold text-status-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlBase =
  "block w-full rounded-md border border-line-strong bg-surface px-4 py-3 text-[16px] text-ink placeholder:text-ink-muted/70 focus:border-forest focus:outline-2 focus:outline-offset-0 focus:outline-focus aria-[invalid=true]:border-status-danger";

export function TextInput({
  id,
  error,
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string; hint?: string }) {
  return (
    <input
      id={id}
      className={controlBase}
      aria-invalid={error ? true : undefined}
      aria-describedby={[hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined}
      {...props}
    />
  );
}

export function SelectInput({
  id,
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { id: string; error?: string; children: ReactNode }) {
  return (
    <select
      id={id}
      className={controlBase}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    >
      {children}
    </select>
  );
}

export function TextArea({
  id,
  error,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string; error?: string }) {
  return (
    <textarea
      id={id}
      rows={5}
      className={controlBase}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  );
}

export function CheckboxField({
  id,
  name,
  defaultChecked,
  error,
  children,
}: {
  id: string;
  name: string;
  defaultChecked?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 accent-forest"
        />
        <label htmlFor={id} className="text-[15px] leading-6 text-ink">
          {children}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-[14px] font-semibold text-status-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

// Honeypot: hidden from people and screen readers, ignored by the server.
// The id is unique per form, because several forms can appear on one page (the footer and a page both have one).
export function Honeypot() {
  const id = useId();
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

// Shown above a form after a failed submit. Focus moves here (or to the first invalid field) by useFocusFirstError.
export function FormErrorSummary({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div
      role="alert"
      tabIndex={-1}
      data-error-summary
      className="rounded-md border border-status-danger/40 bg-surface px-4 py-3 text-[15px] font-semibold leading-6 text-status-danger focus:outline-2 focus:outline-focus"
    >
      {count === 1 ? "Please check the field highlighted below." : `Please check the ${count} fields highlighted below.`}
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-md border border-status-danger/40 bg-surface px-4 py-3 text-[15px] leading-6 text-status-danger">
      {message}
    </div>
  );
}
