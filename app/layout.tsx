import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

// Brand typefaces, from the AAAN Brand Kit. Fraunces is limited to two weights.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AAAN · From African Soil to Global Tables",
    // Page titles come from the approved SEO table, which already includes "AAAN" where it belongs.
    template: "%s",
  },
  description:
    "African Agricultural Advancement Network grows, processes and exports quality produce from Kenya, Ghana and Côte d'Ivoire.",
};

// Setup placeholder. The bilingual routes and layout are added in the build phase.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
