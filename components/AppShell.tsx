import type { ReactNode } from "react";
import BottomNav from "@/components/BottomNav";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-5 bg-[linear-gradient(160deg,var(--color-primary-light)_0%,var(--color-partner-b-light)_100%)] px-4 py-8 text-[var(--color-text-primary)]">
      <header className="text-center">
        <h1 className="text-[22px] font-black tracking-[-0.02em]">
          🩵 CoupleFlow
        </h1>
        <p className="mt-0.5 text-[12px] text-[var(--color-text-secondary)]">
          Sky & Mint · 一起打理生活，让爱更有温度
        </p>
      </header>

      <div className="relative flex min-h-[680px] w-[340px] max-w-full flex-col overflow-hidden rounded-[40px] bg-[var(--color-bg-page)] shadow-[0_0_0_8px_var(--color-phone-frame),0_0_0_10px_var(--color-phone-frame-edge),var(--shadow-phone)]">
        <div className="absolute left-1/2 top-0 z-20 h-6 w-[90px] -translate-x-1/2 rounded-b-[14px] bg-[var(--color-phone-frame)]" />
        <div className="flex items-center justify-between px-5 pt-8 text-[11px] font-extrabold text-[var(--color-text-primary)]">
          <span>11:54</span>
          <span className="text-[10px] tracking-[1px]">●●● ▴ ▮</span>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
