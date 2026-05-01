"use client";

import AddActionDialog from "@/components/AddActionDialog";

export default function AddHeaderButton({ label = "Add" }: { label?: string }) {
  return (
    <AddActionDialog
      trigger={
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-1.5 text-[12px] font-bold text-[var(--color-primary-deep)]"
        >
          <span className="text-[16px] font-black leading-none">+</span>
          {label}
        </button>
      }
    />
  );
}
