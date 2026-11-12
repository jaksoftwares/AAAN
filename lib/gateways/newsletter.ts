import "server-only";
import { getServiceClient } from "@/lib/supabase/server";
import { CONSENT_TEXT_VERSION, type NewsletterInput } from "@/lib/validation";
import type { SaveResult } from "@/lib/gateways/enquiries";

// Gateway: saves one newsletter subscriber. Double opt-in emails arrive with the email provider (later phase).

export async function saveSubscriber(input: NewsletterInput): Promise<SaveResult & { alreadySubscribed?: boolean }> {
  const { error } = await getServiceClient()
    .from("newsletter_subscribers")
    .insert({
      email: input.email.toLowerCase(),
      lang: "en",
      consent_text_version: CONSENT_TEXT_VERSION,
      consent_at: new Date().toISOString(),
      status: "subscribed",
    });
  if (error) {
    if (error.code === "23505") return { ok: true, alreadySubscribed: true };
    console.error("[newsletter_subscribers] insert failed", error.code, error.message);
    return { ok: false, reason: "failed" };
  }
  return { ok: true };
}
