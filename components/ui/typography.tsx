import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-4 text-xs font-bold uppercase tracking-[0.14em] text-ink-brand ${className}`}>{children}</p>
  );
}

export function H1({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={`font-display text-[44px] font-semibold leading-[1.1] text-forest md:text-[64px] md:leading-[68px] ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-[30px] font-semibold leading-[1.15] text-ink md:text-[36px] md:leading-[44px] ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-[20px] font-bold leading-7 text-ink md:text-[22px] ${className}`}>{children}</h3>;
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`max-w-[66ch] text-[18px] leading-[30px] text-ink-muted ${className}`}>{children}</p>;
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[68ch] space-y-5 text-[16px] leading-[26px] text-ink ${className}`}>{children}</div>;
}
