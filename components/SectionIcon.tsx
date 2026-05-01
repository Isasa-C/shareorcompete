import { cn } from "@/lib/utils";

type SectionIconName =
  | "award"
  | "check-square"
  | "dollar-sign"
  | "gift"
  | "shopping-cart";

type SectionIconTone = "gold" | "mint" | "primary";

const iconPaths: Record<SectionIconName, string[]> = {
  "check-square": [
    "M9 11l3 3L22 4",
    "M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  ],
  "shopping-cart": [
    "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z",
    "M3 6h18",
    "M16 10a4 4 0 01-8 0",
  ],
  award: [
    "M12 15a7 7 0 100-14 7 7 0 000 14z",
    "M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  ],
  "dollar-sign": [
    "M12 1v22",
    "M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  ],
  gift: [
    "M20 12v10H4V12",
    "M2 7h20v5H2z",
    "M12 22V7",
    "M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z",
    "M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z",
  ],
};

const toneClassNames: Record<SectionIconTone, string> = {
  primary:
    "bg-[var(--color-primary-light)] text-[var(--color-primary-deep)]",
  mint:
    "bg-[var(--color-partner-b-light)] text-[var(--color-partner-b-deep)]",
  gold:
    "bg-[var(--color-accent-gold-light)] text-[var(--color-accent-gold-deep)]",
};

export default function SectionIcon({
  className,
  name,
  tone = "primary",
}: {
  className?: string;
  name: SectionIconName;
  tone?: SectionIconTone;
}) {
  return (
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-lg",
        toneClassNames[tone],
        className,
      )}
    >
      <svg
        aria-hidden="true"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        {iconPaths[name].map((path) => (
          <path key={path} d={path} />
        ))}
      </svg>
    </span>
  );
}
