"use client";

import Header from "@/components/Header";
import { useTheme } from "@/components/ThemeProvider";
import { themes, type ThemeDefinition, type ThemeId } from "@/src/lib/themes";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

function ThemePreviewCard({
  theme,
  selected,
  onSelect,
}: {
  theme: ThemeDefinition;
  selected: boolean;
  onSelect: (themeId: ThemeId) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(theme.id)}
      className="relative min-h-[184px] rounded-xl border p-4 text-left transition-colors duration-200"
      style={{
        backgroundColor: theme.tokens.bgPage,
        borderColor: selected ? theme.tokens.textPrimary : theme.tokens.borderHairline,
        color: theme.tokens.textPrimary,
      }}
    >
      {selected ? (
        <span
          className="absolute left-3 top-3 grid size-6 place-items-center rounded-full"
          style={{
            backgroundColor: theme.tokens.textPrimary,
            color: theme.tokens.bgCard,
          }}
        >
          <Check size={14} strokeWidth={1.5} />
        </span>
      ) : null}

      <div className="absolute right-3 top-3 flex gap-1.5">
        <span
          className="size-3 rounded-full"
          style={{ backgroundColor: theme.tokens.partnerA }}
        />
        <span
          className="size-3 rounded-full"
          style={{ backgroundColor: theme.tokens.partnerB }}
        />
      </div>

      <div className="mt-9 rounded-lg border p-3" style={{
        backgroundColor: theme.tokens.bgCard,
        borderColor: theme.tokens.borderHairline,
      }}>
        <div className="mb-3 flex items-center justify-between">
          <span
            className="text-[10px] font-medium uppercase tracking-[0.08em]"
            style={{ color: theme.tokens.textSecondary }}
          >
            SCORE
          </span>
          <span className="h-px w-8" style={{ backgroundColor: theme.tokens.borderHairline }} />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2">
          <div>
            <p className="text-[10px]" style={{ color: theme.tokens.textSecondary }}>
              Annie
            </p>
            <p className="font-serif text-2xl leading-none">20</p>
          </div>
          <span className="w-px" style={{ backgroundColor: theme.tokens.borderHairline }} />
          <div className="text-right">
            <p className="text-[10px]" style={{ color: theme.tokens.textSecondary }}>
              B
            </p>
            <p className="font-serif text-2xl leading-none">26</p>
          </div>
        </div>
        <div className="mt-3 h-1" style={{ backgroundColor: theme.tokens.borderHairline }}>
          <div
            className="h-full"
            style={{
              width: "44%",
              backgroundColor: theme.tokens.accentAction,
            }}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="font-serif text-xl font-normal tracking-[-0.02em]">
          {theme.name}
        </p>
        <p
          className="mt-1 text-[10px] font-medium uppercase tracking-[0.08em]"
          style={{ color: theme.tokens.textSecondary }}
        >
          {theme.tagline}
        </p>
      </div>
    </button>
  );
}

export default function AppearancePage() {
  const { themeId, setThemeId } = useTheme();
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef<number | null>(
    null,
  );

  function handleSelect(nextThemeId: ThemeId) {
    setThemeId(nextThemeId);
    setToastVisible(true);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(
      () => setToastVisible(false),
      1600,
    );
  }

  return (
    <section className="space-y-8">
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--text-secondary)]"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        Profile
      </Link>

      <Header eyebrow="APPEARANCE" title="Choose your palette" />

      <p className="-mt-5 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Set the mood for your shared space.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <ThemePreviewCard
            key={theme.id}
            theme={theme}
            selected={theme.id === themeId}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div
        className={`fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-lg bg-[var(--accent-action)] px-4 py-3 text-[13px] font-medium text-[var(--bg-card)] transition duration-200 ${
          toastVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        Palette updated.
      </div>
    </section>
  );
}
