import "server-only";
import { getServiceClient } from "@/lib/supabase/server";
import type { FarmerSignupInput } from "@/lib/validation";
import { CONSENT_TEXT_VERSION } from "@/lib/validation";
import type { SaveResult } from "@/lib/gateways/enquiries";

// Gateway: saves one farmer or cooperative sign-up.

export async function saveFarmerSignup(
  input: FarmerSignupInput,
  meta: { routedTo: string; sourcePage?: string; userAgent?: string },
): Promise<SaveResult> {
  const { error } = await getServiceClient()
    .from("farmer_signups")
    .insert({
      full_name: input.fullName,
      phone: input.phone,
      country: input.country,
      hub: input.hub,
      crops: input.crops,
      farm_size: input.farmSize,
      farm_unit: input.farmUnit,
      cooperative_member: input.cooperativeMember === "yes",
      consent_text_version: CONSENT_TEXT_VERSION,
      consent_at: new Date().toISOString(),
      routed_to: meta.routedTo,
      status: "new",
      source_page: meta.sourcePage ?? null,
      user_agent: meta.userAgent?.slice(0, 300) ?? null,
    });
  if (error) {
    console.error("[farmer_signups] insert failed", error.code, error.message);
    return { ok: false, reason: "failed" };
  }
  return { ok: true };
}
