"use client";

import { useEffect, type RefObject } from "react";

// After a failed submit, move keyboard and screen-reader focus to the first problem:
// the first invalid field, or the error summary when the problem is not a single field (for example, no crop chosen).
export function useFocusFirstError(formRef: RefObject<HTMLFormElement | null>, state: { status: string; errors?: Record<string, string> }) {
  useEffect(() => {
    if (state.status !== "error" || !state.errors || Object.keys(state.errors).length === 0) return;
    const form = formRef.current;
    if (!form) return;
    const target =
      form.querySelector<HTMLElement>('[aria-invalid="true"]') ?? form.querySelector<HTMLElement>("[data-error-summary]");
    target?.focus();
  }, [state, formRef]);
}
