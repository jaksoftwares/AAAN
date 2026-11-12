"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "aaan-cookie-choice";

// Clears the saved cookie choice in this browser, so the notice appears again on the next visit.
export function CookieReset() {
  const [status, setStatus] = useState<"idle" | "done" | "unavailable">("idle");

  function reset() {
    try {
      window.localStorage.removeItem(KEY);
      setStatus("done");
    } catch {
      setStatus("unavailable");
    }
  }

  return (
    <div className="space-y-3">
      <Button type="button" variant="ghost" onClick={reset}>
        Reset my cookie choice
      </Button>
      {status === "done" ? (
        <p role="status" className="text-[15px] font-semibold text-ink">
          Done. You will see the cookie notice again on your next visit.
        </p>
      ) : null}
      {status === "unavailable" ? (
        <p role="status" className="text-[15px] font-semibold text-status-danger">
          Your browser does not let this site change saved settings. Clear this site&apos;s data in your browser settings instead.
        </p>
      ) : null}
    </div>
  );
}
