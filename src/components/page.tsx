import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {eyebrow && <p className="label-xs text-gold">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-3xl sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-foreground [&_li]:ml-4 [&_li]:list-disc [&_strong]:text-foreground">
      {children}
    </div>
  );
}
