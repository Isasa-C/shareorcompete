"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "待办", icon: "📋" },
  { href: "/chores", label: "家务PK", icon: "🏆" },
  { href: "/expenses", label: "记账", icon: "📒" },
  { href: "/wishlist", label: "愿望清单", icon: "⭐" },
  { href: "/profile", label: "我的", icon: "👤" },
];

function TabLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex min-w-12 flex-col items-center gap-0.5 text-[10px] font-bold transition-colors",
        isActive
          ? "text-[var(--color-primary-deep)]"
          : "text-[var(--color-text-light)]",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="text-[20px] leading-none">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default function BottomNav() {
  return (
    <nav className="relative flex shrink-0 items-center justify-around border-t-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-card)] px-0 pb-[18px] pt-2.5">
      {navItems.map((item) => (
        <TabLink key={item.href} {...item} />
      ))}
    </nav>
  );
}
