"use client";

import AddActionDialog from "@/components/AddActionDialog";
import SectionIcon from "@/components/SectionIcon";
import SoftCard from "@/components/SoftCard";
import { cn } from "@/lib/utils";
import { rewards, wishlistItems } from "@/src/lib/mock-data";
import type { WishlistItem } from "@/src/lib/types";
import { useState } from "react";

type WishTab = "annie" | "b" | "rewards";

const productEmoji: Record<string, string> = {
  "AirPods Pro 2": "🎧",
  "Tennis racket": "🎾",
  Camera: "📷",
  Perfume: "🌸",
  "Weekend cabin stay": "🏡",
};

function price(value: number) {
  return `€${value.toFixed(2)}`;
}

function stars(priority: WishlistItem["priority"]) {
  const count = priority === "high" ? 5 : priority === "medium" ? 3 : 2;
  return "⭐".repeat(count) + "☆".repeat(5 - count);
}

function WishRow({ item }: { item: WishlistItem }) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--color-border)] py-3 last:border-b-0">
      <div className="grid size-[52px] shrink-0 place-items-center rounded-[var(--radius-icon-box-lg)] bg-[var(--color-primary-light)] text-[28px]">
        {productEmoji[item.title] ?? "🎁"}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-extrabold text-[var(--color-text-primary)]">
          {item.title === "Camera" ? "拍立得相机" : item.title === "Perfume" ? "Dior 香水" : item.title}
        </div>
        <div className="mt-px truncate text-[10px] text-[var(--color-text-secondary)]">
          {item.notes ?? "记录我们的日常"}
        </div>
        <div className="mt-0.5 text-[12px]">{stars(item.priority)}</div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <div className="text-[13px] font-extrabold text-[var(--color-text-primary)]">
          {price(item.estimatedPrice)}
        </div>
        <button
          type="button"
          className="min-h-8 rounded-[var(--radius-btn-sm)] bg-[var(--gradient-button)] px-3 py-1.5 text-[11px] font-extrabold text-white"
        >
          🎁 送给她
        </button>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const [active, setActive] = useState<WishTab>("annie");
  const savingGoal =
    wishlistItems.find((item) => item.title === "Tennis racket") ??
    wishlistItems[0];
  const goalProgress = Math.min(
    100,
    Math.round((savingGoal.savedAmount / savingGoal.estimatedPrice) * 100),
  );
  const wishItems =
    active === "b"
      ? wishlistItems.filter((item) => item.requestedBy === "user-b")
      : wishlistItems.filter((item) => item.requestedBy !== "user-b");

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <button className="grid size-8 place-items-center rounded-full bg-white text-[16px] shadow-[var(--shadow-back-btn)]" type="button">
          ←
        </button>
        <h1 className="text-[16px] font-black text-[var(--color-text-primary)]">
          愿望清单
        </h1>
        <div className="text-[18px] text-[var(--color-text-secondary)]">···</div>
      </div>

      <div className="mb-[14px] flex gap-2.5">
        {[
          ["annie", "Annie 的愿望", "4 个愿望", "👧"],
          ["b", "B 的愿望", "3 个愿望", "🧒"],
        ].map(([value, name, count, emoji]) => (
          <button
            key={value}
            type="button"
            onClick={() => setActive(value as WishTab)}
            className={cn(
              "flex min-h-16 flex-1 items-center gap-2 rounded-2xl border-2 border-transparent bg-white p-3 text-left shadow-[var(--shadow-card)]",
              active === value && "border-[var(--color-primary)]",
            )}
          >
            <span className="text-[26px]">{emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-extrabold text-[var(--color-text-primary)]">
                {name}
              </span>
              <span className="block text-[10px] text-[var(--color-text-secondary)]">
                {count}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="cf-hero mb-[14px] p-4">
        <div className="mb-2.5 flex items-start justify-between">
          <div>
            <div className="text-[10px] font-bold text-white/80">
              共同存钱目标 🎯
            </div>
            <div className="mt-px text-[16px] font-black text-white">
              网球拍
            </div>
          </div>
          <div className="text-[32px]">🎾</div>
        </div>
        <div className="mb-1.5 h-2 overflow-hidden rounded bg-white/30">
          <div
            className="h-full rounded bg-white"
            style={{ width: `${goalProgress}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-bold text-white/90">
          <span>已存 {price(savingGoal.savedAmount)}</span>
          <span>{goalProgress}%</span>
          <span>目标 {price(savingGoal.estimatedPrice)}</span>
        </div>
      </div>

      <div className="cf-section-hd">
        <div className="cf-section-title">
          <SectionIcon name="gift" tone="gold" />
          {active === "rewards" ? "奖励列表" : "愿望列表"}
        </div>
        <AddActionDialog
          trigger={
            <button
              type="button"
              className="min-h-11 text-[12px] font-bold text-[var(--color-partner-b)]"
            >
              + 添加愿望
            </button>
          }
        />
      </div>

      <div className="mb-[14px] flex border-b-[1.5px] border-[var(--color-border)]">
        {[
          ["annie", "Annie"],
          ["b", "B"],
          ["rewards", "奖励"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setActive(value as WishTab)}
            className={cn(
              "mb-[-1.5px] min-h-11 flex-1 border-b-[2.5px] text-[12px] font-bold",
              active === value
                ? "border-[var(--color-primary-deep)] text-[var(--color-primary-deep)]"
                : "border-transparent text-[var(--color-text-secondary)]",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <SoftCard>
        {active === "rewards"
          ? rewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center gap-3 border-b border-[var(--color-border)] py-3 last:border-b-0"
              >
                <div className="grid size-[42px] shrink-0 place-items-center rounded-[var(--radius-icon-box-lg)] bg-[var(--color-primary-light)] text-[22px]">
                  🎁
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-extrabold text-[var(--color-text-primary)]">
                    {reward.title}
                  </div>
                  <div className="text-[10px] text-[var(--color-text-secondary)]">
                    {reward.pointsCost}分 · 有效 {reward.validityDays} 天
                  </div>
                </div>
                <button className="rounded-[var(--radius-btn-sm)] bg-[var(--gradient-button)] px-3 py-1.5 text-[11px] font-extrabold text-white" type="button">
                  Redeem
                </button>
              </div>
            ))
          : wishItems.map((item) => <WishRow key={item.id} item={item} />)}
      </SoftCard>

      <div className="mb-[14px] flex items-center gap-3 rounded-[var(--radius-card-sm)] bg-[var(--gradient-pill)] px-4 py-[14px]">
        <div className="text-4xl">🥰</div>
        <div>
          <div className="text-[13px] font-extrabold text-[var(--color-text-primary)]">
            一起努力实现愿望吧 💕
          </div>
          <div className="mt-px text-[11px] text-[var(--color-text-secondary)]">
            Complete chores to earn points and redeem rewards or achieve your wishlist.
          </div>
        </div>
      </div>
    </section>
  );
}
