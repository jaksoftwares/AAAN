import type { ReactNode } from "react";

type Tone = "light" | "ivory" | "forest";

const tones: Record<Tone, string> = {
  light: "bg-surface",
  ivory: "bg-surface-ivory",
  forest: "bg-forest text-ivory",
};

export function Section({
  children,
  tone = "light",
  id,
  className = "",
  bordered = true,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${tones[tone]} ${bordered && tone === "light" ? "border-t border-line" : ""} py-16 md:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">{children}</div>
    </section>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 md:px-8 ${className}`}>{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-12 max-w-[760px] ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-ink-brand">{eyebrow}</p> : null}
      <h2 className="font-display text-[30px] font-semibold leading-[1.15] text-ink md:text-[36px] md:leading-[44px]">{title}</h2>
      {intro ? <p className="mt-5 text-[18px] leading-[30px] text-ink-muted">{intro}</p> : null}
    </div>
  );
}
