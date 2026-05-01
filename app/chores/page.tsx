"use client";

import AddActionDialog from "@/components/AddActionDialog";
import SectionIcon from "@/components/SectionIcon";
import SoftCard from "@/components/SoftCard";
import { cn } from "@/lib/utils";
import { choreCheckIns } from "@/src/lib/mock-data";
import type { ChoreCheckIn, UserId } from "@/src/lib/types";
import type { CSSProperties } from "react";
import { useState } from "react";

type ChoreView = "list" | "records";

const choreItems = [
  {
    id: "trash",
    icon: "🗑️",
    name: "倒垃圾",
    description: "保持环境整洁",
    points: 5,
    assignedTo: "user-b" as const,
    done: true,
  },
  {
    id: "dishes",
    icon: "🍽️",
    name: "洗碗",
    description: "饭后清洁碗筷",
    points: 10,
    assignedTo: "user-annie" as const,
  },
  {
    id: "mop",
    icon: "🧹",
    name: "拖地",
    description: "保持地面干净",
    points: 10,
    assignedTo: "user-b" as const,
  },
  {
    id: "cook",
    icon: "🍳",
    name: "做饭",
    description: "准备一顿饭菜",
    points: 15,
    assignedTo: "user-annie" as const,
  },
  {
    id: "laundry",
    icon: "👕",
    name: "洗衣服",
    description: "清洗并整理衣物",
    points: 10,
    assignedTo: "user-annie" as const,
  },
  {
    id: "clean",
    icon: "✨",
    name: "大扫除",
    description: "全面清洁房间",
    points: 30,
    assignedTo: "user-b" as const,
  },
];

function Avatar({ userId, size = "sm" }: { userId: UserId; size?: "sm" | "rank" }) {
  const isB = userId === "user-b";

  if (size === "rank") {
    return (
      <div
        className={cn(
          "mx-auto mb-1.5 grid size-14 place-items-center rounded-full border-[3px] border-white text-[32px] shadow-[var(--shadow-rank-av)]",
          isB ? "bg-[var(--color-partner-b-light)]" : "bg-[var(--color-primary-light)]",
        )}
      >
        {isB ? "🧒" : "👧"}
      </div>
    );
  }

  return (
    <div className={cn("cf-avatar-sm", isB && "cf-avatar-sm-b")}>
      {isB ? "🧒" : "👧"}
    </div>
  );
}

function recordTitle(record: ChoreCheckIn) {
  const user = record.userId === "user-annie" ? "Annie" : "B";
  const chore =
    choreItems.find((item) => record.choreId.includes(item.id))?.name ??
    (record.choreId === "chore-cooking" ? "做饭" : "家务");
  return `${user} 完成了 ${chore}`;
}

export default function ChoresPage() {
  const [activeView, setActiveView] = useState<ChoreView>("list");
  const [checked, setChecked] = useState(new Set(["trash"]));
  const [records, setRecords] = useState<ChoreCheckIn[]>(choreCheckIns);

  const annieScore = 120 + records.filter((r) => r.id.startsWith("local") && r.userId === "user-annie").reduce((sum, r) => sum + r.pointsEarned, 0);
  const bScore = 95 + records.filter((r) => r.id.startsWith("local") && r.userId === "user-b").reduce((sum, r) => sum + r.pointsEarned, 0);
  const anniePercent = Math.round((annieScore / (annieScore + bScore)) * 100);

  function checkIn(item: (typeof choreItems)[number]) {
    setChecked((current) => new Set(current).add(item.id));
    setRecords((current) => [
      {
        id: `local-${item.id}-${Date.now()}`,
        choreId: item.id,
        userId: item.assignedTo,
        checkedInAt: "刚刚",
        pointsEarned: item.points,
        mood: "normal",
      },
      ...current,
    ]);
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <button className="grid size-8 place-items-center rounded-full bg-white text-[16px] shadow-[var(--shadow-back-btn)]" type="button">
          ←
        </button>
        <h1 className="text-[16px] font-black text-[var(--color-text-primary)]">
          家务 PK
        </h1>
        <div className="text-[18px] text-[var(--color-text-secondary)]">···</div>
      </div>

      <div className="mb-[14px] rounded-[var(--radius-hero)] border-[1.5px] border-[var(--color-border)] bg-[var(--gradient-rank-card)] p-[18px]">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-bold text-[var(--color-text-secondary)]">
            本周排行榜
          </span>
          <span className="text-[10px] font-bold text-[var(--color-primary-deep)]">
            本周还剩 2 天
          </span>
        </div>
        <div className="mb-[14px] flex items-center justify-between">
          <div className="text-center">
            <Avatar userId="user-annie" size="rank" />
            <div className="text-[11px] font-bold text-[var(--color-text-secondary)]">
              Annie
            </div>
            <div className="text-[30px] font-black leading-none text-[var(--color-primary)]">
              {annieScore}
              <span className="text-[12px] font-bold">分</span>
            </div>
          </div>
          <div className="text-4xl leading-none">🏆</div>
          <div className="text-center">
            <Avatar userId="user-b" size="rank" />
            <div className="text-[11px] font-bold text-[var(--color-text-secondary)]">
              B
            </div>
            <div className="text-[30px] font-black leading-none text-[var(--color-partner-b)]">
              {bScore}
              <span className="text-[12px] font-bold">分</span>
            </div>
          </div>
        </div>
        <div className="h-2 overflow-hidden rounded bg-[var(--color-border)]">
          <div
            className="h-full bg-[linear-gradient(90deg,var(--color-primary)_0%,var(--color-primary)_var(--annie),var(--color-partner-b)_var(--annie),var(--color-partner-b)_100%)]"
            style={{ "--annie": `${anniePercent}%` } as CSSProperties}
          />
        </div>
      </div>

      <div className="cf-section-hd">
        <div className="cf-section-title">
          <SectionIcon name="award" tone="mint" />
          家务列表
        </div>
        <div className="cf-inner-tabs p-0.5">
          {[
            ["list", "家务列表"],
            ["records", "打卡记录"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setActiveView(value as ChoreView)}
              className={cn(
                "cf-inner-tab px-2.5 py-[3px] text-[10px]",
                activeView === value && "cf-inner-tab-active",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <SoftCard>
        {activeView === "list"
          ? choreItems.map((item) => {
              const isDone = checked.has(item.id) || item.done;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b border-[var(--color-border)] py-3 last:border-b-0"
                >
                  <div className="grid size-[42px] shrink-0 place-items-center rounded-[var(--radius-icon-box-lg)] bg-[var(--color-primary-light)] text-[22px]">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-extrabold text-[var(--color-text-primary)]">
                      {item.name}
                    </div>
                    <div className="mt-px text-[10px] text-[var(--color-text-secondary)]">
                      {item.description}
                    </div>
                  </div>
                  <span className="rounded-[var(--radius-chip)] bg-[var(--color-primary-light)] px-[9px] py-[3px] text-[11px] font-extrabold text-[var(--color-primary-deep)]">
                    +{item.points}分
                  </span>
                  <Avatar userId={item.assignedTo} />
                  <button
                    type="button"
                    onClick={() => checkIn(item)}
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full border-2 border-[var(--color-border)] text-[14px] transition duration-150 active:scale-110",
                      isDone &&
                        "border-[var(--color-partner-b)] bg-[var(--color-partner-b)] text-white",
                    )}
                    aria-label={`打卡 ${item.name}`}
                  >
                    {isDone ? "✓" : ""}
                  </button>
                </div>
              );
            })
          : records.slice(0, 6).map((record) => (
              <div
                key={record.id}
                className="flex items-center gap-3 border-b border-[var(--color-border)] py-3 last:border-b-0"
              >
                <Avatar userId={record.userId} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-bold text-[var(--color-text-primary)]">
                    {recordTitle(record)}
                  </div>
                  <div className="text-[10px] text-[var(--color-text-secondary)]">
                    {record.checkedInAt === "刚刚" ? "刚刚" : "今天"}
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-[var(--color-accent-orange)]">
                  +{record.pointsEarned}分
                </span>
              </div>
            ))}
      </SoftCard>

      <AddActionDialog
        trigger={
          <button type="button" className="cf-primary-btn mt-1">
            + 添加家务
          </button>
        }
      />
    </section>
  );
}
