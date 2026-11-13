"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { allowRequest } from "@/lib/rate-limit";
import { enquirySchema, farmerSignupSchema, newsletterSchema, fieldErrors } from "@/lib/validation";
import { routeEnquiry, routeFarmerSignup } from "@/lib/routing";
import { saveEnquiry } from "@/lib/gateways/enquiries";
import { saveFarmerSignup } from "@/lib/gateways/farmer-signups";
import { saveSubscriber } from "@/lib/gateways/newsletter";
import { SupabaseNotConfiguredError } from "@/lib/supabase/server";
import { MAIN_EMAIL, MAIN_PHONE } from "@/content/site";

// Server actions: every public form posts here. Each action runs the same steps:
// honeypot check, rate limit, validation, routing, save, then a redirect or a message.

export type FormState = {
  status: "idle" | "error" | "subscribed";
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const MSG_FAILED = `Something went wrong and your message was not sent. Please try again, or call us on ${MAIN_PHONE} or email ${MAIN_EMAIL}.`;
const MSG_RATE = `We have received several requests from your connection. Please try again later, or call us on ${MAIN_PHONE} or email ${MAIN_EMAIL}.`;

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
}

async function userAgent(): Promise<string | undefined> {
  return (await headers()).get("user-agent") ?? undefined;
}

function toValues(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of formData.entries()) if (typeof v === "string") out[k] = v;
  return out;
}

function failureMessage(err: unknown): string {
  if (err instanceof SupabaseNotConfiguredError) {
    console.error(err.message);
  }
  return MSG_FAILED;
}

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = toValues(formData);
  const ip = await clientIp();
  if (!allowRequest(`enquiry:${ip}`, 5, HOUR)) return { status: "error", message: MSG_RATE, values };

  // A filled honeypot means a bot. Show the normal thank-you, but save nothing.
  if (values.website) redirect(`/en/thank-you?kind=${values.type ?? "general"}`);

  const parsed = enquirySchema.safeParse({ ...values, consent: values.consent ?? undefined });
  if (!parsed.success) return { status: "error", errors: fieldErrors(parsed.error), values };

  try {
    const result = await saveEnquiry(parsed.data, {
      routedTo: routeEnquiry(parsed.data),
      sourcePage: values.sourcePage,
      userAgent: await userAgent(),
    });
    if (!result.ok) return { status: "error", message: MSG_FAILED, values };
  } catch (err) {
    return { status: "error", message: failureMessage(err), values };
  }

  redirect(`/en/thank-you?kind=${parsed.data.type}`);
}

export async function submitFarmerSignup(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = toValues(formData);
  const ip = await clientIp();
  if (!allowRequest(`signup:${ip}`, 3, DAY)) return { status: "error", message: MSG_RATE, values };

  if (values.website) redirect("/en/thank-you?kind=farmer");

  const crops = formData.getAll("crops").filter((c): c is string => typeof c === "string");
  const kept = { ...values, crops: crops.join("|") };
  const parsed = farmerSignupSchema.safeParse({ ...values, crops, consent: values.consent ?? undefined });
  if (!parsed.success) return { status: "error", errors: fieldErrors(parsed.error), values: kept };

  try {
    const result = await saveFarmerSignup(parsed.data, {
      routedTo: routeFarmerSignup(parsed.data.country),
      sourcePage: values.sourcePage,
      userAgent: await userAgent(),
    });
    if (!result.ok) return { status: "error", message: MSG_FAILED, values };
  } catch (err) {
    return { status: "error", message: failureMessage(err), values };
  }

  redirect("/en/thank-you?kind=farmer");
}

export async function submitNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = toValues(formData);
  const ip = await clientIp();
  if (!allowRequest(`newsletter:${ip}`, 5, HOUR)) return { status: "error", message: MSG_RATE, values };

  if (values.website) return { status: "subscribed", message: "Thank you. You are on the list." };

  const parsed = newsletterSchema.safeParse({ ...values, consent: values.consent ?? undefined });
  if (!parsed.success) return { status: "error", errors: fieldErrors(parsed.error), values };

  try {
    const result = await saveSubscriber(parsed.data);
    if (!result.ok) return { status: "error", message: MSG_FAILED, values };
    return {
      status: "subscribed",
      message: result.alreadySubscribed
        ? "You are already subscribed. Thank you for your interest in AAAN."
        : "Thank you. You are subscribed to the monthly harvest update.",
    };
  } catch (err) {
    return { status: "error", message: failureMessage(err), values };
  }
}
