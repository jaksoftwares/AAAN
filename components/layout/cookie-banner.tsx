"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

const KEY = "aaan-cookie-choice";

// The notice is shown until a visitor makes a choice. The choice is kept in this browser only, so the
// site stores nothing on the server. If storage is blocked, the notice simply appears again on the next visit.
function hasNoChoice(): boolean {
  try {
    return !window.localStorage.getItem(KEY);
  } catch {
    return true;
  }
}

const subscribe = () => () => {};

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(false);
  // On the server the notice is not rendered; in the browser it appears only if no choice was saved.
  const noChoice = useSyncExternalStore(subscribe, hasNoChoice, () => false);

  function choose(value: "all" | "essential") {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      // Storage unavailable: close the notice for this visit only.
    }
    setDismissed(true);
  }

  if (!noChoice || dismissed) return null;

  return (
    <div role="region" aria-label="Cookie notice" className="fixed inset-x-0 bottom-0 z-50 border-t border-line-strong bg-surface p-4 shadow-[0_-8px_30px_rgba(15,26,20,0.12)] md:p-6">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[70ch] text-[15px] leading-6 text-ink">
          We use cookies to make this site work and, with your permission, to understand how it is used. You can change your choice at any time.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="primary" onClick={() => choose("all")}>
            Accept all
          </Button>
          <Button type="button" variant="ghost" onClick={() => choose("essential")}>
            Reject non-essential
          </Button>
          <Link href="/en/cookies" className="inline-flex items-center px-3 text-[15px] font-bold text-ink-brand underline underline-offset-4">
            Choose settings
          </Link>
        </div>
      </div>
    </div>
  );
}
