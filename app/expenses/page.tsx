"use client";

import AddActionDialog from "@/components/AddActionDialog";
import SectionIcon from "@/components/SectionIcon";
import SoftCard from "@/components/SoftCard";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Filter = "all" | "annie" | "b";
type Category = "房租" | "餐饮" | "购物" | "日常" | "娱乐";

const euro = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

const categoryMeta: Record<
  Category,
  { icon: string; dot: string; bg: string; amount: number; pct: number }
> = {
  房租: {
    icon: "🏠",
    dot: "var(--chart-1)",
    bg: "var(--color-primary-light)",
    amount: 600,
    pct: 46.9,
  },
  餐饮: {
    icon: "🍜",
    dot: "var(--chart-2)",
    bg: "var(--color-category-food-bg)",
    amount: 256,
    pct: 20,
  },
  购物: {
    icon: "🛒",
    dot: "var(--chart-3)",
    bg: "var(--color-partner-b-light)",
    amount: 189,
    pct: 14.8,
  },
  日常: {
    icon: "📅",
    dot: "var(--chart-4)",
    bg: "var(--color-category-daily-bg)",
    amount: 124,
    pct: 9.7,
  },
  娱乐: {
    icon: "🎭",
    dot: "var(--chart-5)",
    bg: "var(--color-category-fun-bg)",
    amount: 110,
    pct: 8.6,
  },
};

const transactions = [
  {
    id: "dinner",
    name: "晚餐",
    sub: "一起吃日料",
    amount: 25,
    paidBy: "user-annie",
    category: "餐饮" as Category,
  },
  {
    id: "rent",
    name: "房租",
    sub: "3月房租",
    amount: 600,
    paidBy: "user-b",
    category: "房租" as Category,
  },
  {
    id: "groceries",
    name: "买菜",
    sub: "超市采购",
    amount: 18.4,
    paidBy: "user-annie",
    category: "购物" as Category,
  },
  {
    id: "cinema",
    name: "电影票",
    sub: "周末约会",
    amount: 28,
    paidBy: "user-b",
    category: "娱乐" as Category,
  },
];

export default function ExpensesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const filteredTransactions = transactions.filter((item) => {
    if (filter === "annie") return item.paidBy === "user-annie";
    if (filter === "b") return item.paidBy === "user-b";
    return true;
  });
  const totalExpense = 1279.2;
  const totalIncome = 1800;
  const balance = totalIncome - totalExpense;
  const paidByB = transactions
    .filter((item) => item.paidBy === "user-b")
    .reduce((sum, item) => sum + item.amount, 0);
  const settlement = Math.abs(paidByB - totalExpense / 2);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xl">📅</div>
        <h1 className="text-[16px] font-black text-[var(--color-text-primary)]">
          记账
        </h1>
        <div className="text-[18px] text-[var(--color-text-secondary)]">···</div>
      </div>

      <div className="cf-hero mb-[14px] p-5">
        <div className="mb-[14px] flex items-center justify-center gap-1">
          <div className="grid size-10 place-items-center rounded-full border-2 border-white/50 bg-white/20 text-[22px]">
            🧒
          </div>
          <div className="mx-0.5 text-[16px]">💗</div>
          <div className="grid size-10 place-items-center rounded-full border-2 border-white/50 bg-white/20 text-[22px]">
            👧
          </div>
        </div>
        <div className="text-center">
          <div className="mb-1 text-[11px] font-bold text-white/80">
            本月共同余额 (3月) 👁
          </div>
          <div className="text-[36px] font-black leading-none tracking-[-0.02em]">
            {euro.format(balance)}
          </div>
          <div className="mt-1 text-[10px] text-white/75">
            总收入 {euro.format(totalIncome)} &nbsp;·&nbsp; 总支出{" "}
            {euro.format(totalExpense)}
          </div>
        </div>
        <div className="mt-[14px] grid grid-cols-3 gap-2">
          {[
            ["总收入", totalIncome],
            ["总支出", totalExpense],
            ["余额", balance],
          ].map(([label, value]) => (
            <div
              key={label as string}
              className="rounded-xl border-[1.5px] border-white/35 bg-white/20 p-2.5 backdrop-blur"
            >
              <div className="text-[10px] font-semibold text-white/80">
                {label as string}
              </div>
              <div className="mt-px text-[14px] font-black">
                {euro.format(value as number).replace(".00", "")}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cf-section-hd">
        <div className="cf-section-title">
          <SectionIcon name="dollar-sign" />
          收支概览
        </div>
        <span className="cf-section-link">本月 ›</span>
      </div>
      <SoftCard>
        <div className="flex items-center gap-4">
          <svg className="shrink-0" width="100" height="100" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--chart-1)" strokeWidth="3.2" strokeDasharray="46.9 53.1" strokeDashoffset="25" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--chart-2)" strokeWidth="3.2" strokeDasharray="20 80" strokeDashoffset="-21.9" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--chart-3)" strokeWidth="3.2" strokeDasharray="14.8 85.2" strokeDashoffset="-41.9" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--chart-4)" strokeWidth="3.2" strokeDasharray="9.7 90.3" strokeDashoffset="-56.7" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--chart-5)" strokeWidth="3.2" strokeDasharray="8.6 91.4" strokeDashoffset="-66.4" />
            <text x="18" y="16.5" textAnchor="middle" fontSize="3.5" fill="var(--color-text-primary)" fontWeight="800">支出</text>
            <text x="18" y="21" textAnchor="middle" fontSize="3.8" fill="var(--color-text-primary)" fontWeight="800">€1,279</text>
          </svg>
          <div className="min-w-0 flex-1">
            {(Object.keys(categoryMeta) as Category[]).map((category) => {
              const meta = categoryMeta[category];
              return (
                <div key={category} className="mb-1.5 flex items-center gap-2 last:mb-0">
                  <span className="size-2 rounded-full" style={{ backgroundColor: meta.dot }} />
                  <span className="flex-1 text-[11px] font-semibold text-[var(--color-text-primary)]">
                    {category}
                  </span>
                  <span className="text-[11px] font-bold text-[var(--color-text-secondary)]">
                    {meta.pct.toFixed(1)}%
                  </span>
                  <span className="min-w-[52px] text-right text-[11px] font-extrabold text-[var(--color-text-primary)]">
                    €{meta.amount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </SoftCard>

      <SoftCard>
        <div className="mb-3 flex border-b-[1.5px] border-[var(--color-border)]">
          {[
            ["all", "全部账单"],
            ["annie", "我支付的"],
            ["b", "对方支付的"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value as Filter)}
              className={cn(
                "mb-[-1.5px] min-h-11 flex-1 border-b-[2.5px] pb-2 text-center text-[12px] font-bold",
                filter === value
                  ? "border-[var(--color-primary-deep)] text-[var(--color-primary-deep)]"
                  : "border-transparent text-[var(--color-text-secondary)]",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mb-2 text-[10px] font-bold text-[var(--color-text-secondary)]">
          3月24日 星期二
        </div>
        {filteredTransactions.map((item) => {
          const meta = categoryMeta[item.category];
          const isAnnie = item.paidBy === "user-annie";

          return (
            <div
              key={item.id}
              className="flex items-center gap-3 border-b border-[var(--color-border)] py-2.5 last:border-b-0"
            >
              <div
                className="grid size-[38px] shrink-0 place-items-center rounded-[var(--radius-icon-box)] text-xl"
                style={{ backgroundColor: meta.bg }}
              >
                {meta.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-bold text-[var(--color-text-primary)]">
                  {item.name}
                </div>
                <div className="mt-px text-[10px] text-[var(--color-text-secondary)]">
                  {item.sub}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-extrabold text-[var(--color-text-primary)]">
                  -{euro.format(item.amount)}
                </div>
                <div
                  className="mt-px text-[10px] font-bold"
                  style={{
                    color: isAnnie
                      ? "var(--color-primary-deep)"
                      : "var(--color-partner-b-deep)",
                  }}
                >
                  {isAnnie ? "Annie 付" : "B 付"}
                </div>
              </div>
            </div>
          );
        })}
      </SoftCard>

      <SoftCard>
        <div className="cf-section-hd mb-2">
          <div className="cf-section-title">
            <SectionIcon name="dollar-sign" />
            结算建议
          </div>
          <span className="cf-section-link">平分</span>
        </div>
        <div className="flex items-center justify-between rounded-[var(--radius-card-sm)] bg-[var(--gradient-pill)] px-4 py-3 text-[12px] font-extrabold text-[var(--color-text-primary)]">
          <span>Annie</span>
          <span>→</span>
          <span>B</span>
          <span className="text-[var(--color-primary-deep)]">
            {euro.format(settlement)}
          </span>
        </div>
      </SoftCard>

      <AddActionDialog
        trigger={
          <button type="button" className="cf-primary-btn mb-[14px]">
            + 记一笔
          </button>
        }
      />
    </section>
  );
}
