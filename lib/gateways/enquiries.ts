import "server-only";
import { getServiceClient } from "@/lib/supabase/server";
import type { EnquiryInput } from "@/lib/validation";
import { CONSENT_TEXT_VERSION } from "@/lib/validation";

// Gateway: saves one enquiry. Pages and actions never write to Supabase directly.

export type SaveResult = { ok: true } | { ok: false; reason: "failed" };

export async function saveEnquiry(
  input: EnquiryInput,
  meta: { routedTo: string; sourcePage?: string; userAgent?: string },
): Promise<SaveResult> {
  const { error } = await getServiceClient()
    .from("enquiries")
    .insert({
      type: input.type,
      lang: "en",
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      company: input.company ?? null,
      country: input.country ?? null,
      crop: input.crop ?? null,
      product: input.product ?? null,
      quantity: input.quantity ?? null,
      unit: input.unit ?? null,
      destination: input.destination ?? null,
      delivery_period: input.deliveryPeriod ?? null,
      message: input.message,
      consent_text_version: CONSENT_TEXT_VERSION,
      consent_at: new Date().toISOString(),
      routed_to: meta.routedTo,
      status: "new",
      source_page: meta.sourcePage ?? null,
      user_agent: meta.userAgent?.slice(0, 300) ?? null,
    });
  if (error) {
    console.error("[enquiries] insert failed", error.code, error.message);
    return { ok: false, reason: "failed" };
  }
  return { ok: true };
}
