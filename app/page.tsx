import { redirect } from "next/navigation";

// The site is English-only in Phase 1. Visitors to the root go to /en.
export default function RootPage() {
  redirect("/en");
}
