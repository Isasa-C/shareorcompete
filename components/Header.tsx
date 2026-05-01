import type { ReactNode } from "react";

type HeaderProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
};

export default function Header({ eyebrow, title, children }: HeaderProps) {
  return (
    <header className="mb-10 flex items-start justify-between gap-4">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--text-secondary)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-1 font-serif text-[34px] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
          {title}
        </h1>
      </div>
      {children ? <div className="shrink-0 pt-1">{children}</div> : null}
    </header>
  );
}
