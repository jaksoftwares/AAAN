import { z } from "zod";

// Shared schemas: the same rules run in the browser (through the form) and on the server (in the action).
// The server is the authority; the browser check is only a convenience.

const requiredText = (label: string, max = 120) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(1, "This field is required.")
    .max(max, `${label} must be ${max} characters or fewer.`);

const optionalText = (label: string, max = 120) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be ${max} characters or fewer.`)
    .optional()
    .transform((v) => (v ? v : undefined));

const email = z
  .string({ error: "This field is required." })
  .trim()
  .min(1, "This field is required.")
  .pipe(z.email("Please enter a valid email address, for example name@company.com."));

const phone = z
  .string()
  .trim()
  .max(30, "Phone number is too long.")
  .regex(/^[+0-9 ()-]*$/, "Please use digits, spaces, + and brackets only.")
  .optional()
  .transform((v) => (v ? v : undefined));

const consent = z.preprocess(
  (v) => v === "on" || v === true || v === "true",
  z.literal(true, { error: "Please tick the box to agree to be contacted." }),
);

// Honeypot: real visitors never fill this in. Bots often do.
const honeypot = z.string().max(0).optional();

export const CONSENT_TEXT_VERSION = "2026-11-v1";

export const enquirySchema = z.object({
  // Farmers and cooperatives use the Join the network form, so "farmer" is not an enquiry type.
  type: z.enum(["quote", "partnership", "investor", "media", "careers", "general"], {
    error: "Please choose a reason for contacting us.",
  }),
  name: requiredText("Name"),
  email,
  phone,
  company: optionalText("Company"),
  country: optionalText("Country"),
  crop: optionalText("Crop"),
  product: optionalText("Product", 200),
  quantity: optionalText("Quantity", 60),
  unit: optionalText("Unit", 30),
  destination: optionalText("Destination country", 80),
  deliveryPeriod: optionalText("Delivery period", 80),
  message: z.string().trim().min(1, "This field is required.").max(2000, "Your message must be 2,000 characters or fewer."),
  consent,
  website: honeypot,
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const farmerSignupSchema = z.object({
  fullName: requiredText("Full name"),
  phone: z
    .string({ error: "This field is required." })
    .trim()
    .min(1, "This field is required.")
    .max(30, "Phone number is too long.")
    .regex(/^[+0-9 ()-]+$/, "Please use digits, spaces, + and brackets only."),
  country: z.enum(["Kenya", "Ghana", "Côte d'Ivoire"], { error: "Please choose your country." }),
  hub: requiredText("Nearest town or hub", 80),
  crops: z
    .array(z.string())
    .min(1, "Please choose at least one crop you grow.")
    .max(12),
  farmSize: z
    .string({ error: "This field is required." })
    .trim()
    .min(1, "This field is required.")
    .max(20, "Farm size is too long.")
    .regex(/^\d+(\.\d+)?$/, "Please enter a number, for example 2 or 1.5."),
  farmUnit: z.enum(["acres", "hectares"], { error: "Please choose acres or hectares." }),
  cooperativeMember: z.enum(["yes", "no"], { error: "Please answer this question." }),
  consent,
  website: honeypot,
});

export type FarmerSignupInput = z.infer<typeof farmerSignupSchema>;

export const newsletterSchema = z.object({
  email,
  consent,
  website: honeypot,
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// Turn zod issues into a map of field name to message, for display beside each field.
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
