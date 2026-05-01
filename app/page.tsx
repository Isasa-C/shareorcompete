"use client";

import SoftCard from "@/components/SoftCard";
import SectionIcon from "@/components/SectionIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Apple,
  BriefcaseBusiness,
  CalendarHeart,
  Carrot,
  CircleDot,
  Coffee,
  Dumbbell,
  Egg,
  Fish,
  Goal,
  Grape,
  Ham,
  Milk,
  Plane,
  Salad,
  Soup,
  Stethoscope,
  UsersRound,
  Volleyball,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

const relationshipStartDate = "2024-11-26";

type ActivityItem = {
  id: string;
  title: string;
  note: string;
  date: string;
  time: string;
  assignedTo: "user-b" | "user-annie";
  Icon: LucideIcon;
  done?: boolean;
};

type AssigneeFilter = "f" | "m" | "mf";

const todoDayOptions = ["今天", "明天", "周末"] as const;
type TodoDay = (typeof todoDayOptions)[number];

type ShoppingItem = {
  id: string;
  title: string;
  note: string;
  assignedTo: "user-b" | "user-annie";
  Icon: LucideIcon;
};

const initialTodoItems: ActivityItem[] = [
  {
    id: "gym",
    title: "Gym",
    note: "力量训练 / 有氧",
    date: "2026-04-30",
    time: "19:00",
    assignedTo: "user-b",
    Icon: Dumbbell,
  },
  {
    id: "tennis",
    title: "Tennis",
    note: "订球场",
    date: "2026-05-02",
    time: "10:00",
    assignedTo: "user-annie",
    Icon: Volleyball,
  },
  {
    id: "dentist",
    title: "Dentist",
    note: "牙医预约",
    date: "2026-04-30",
    time: "12:30",
    assignedTo: "user-b",
    Icon: Stethoscope,
  },
];

const defaultTodoSuggestions: ActivityItem[] = [
  {
    id: "gym",
    title: "Gym",
    note: "力量训练 / 有氧",
    date: "",
    time: "",
    assignedTo: "user-b",
    Icon: Dumbbell,
  },
  {
    id: "tennis",
    title: "Tennis",
    note: "订球场",
    date: "",
    time: "",
    assignedTo: "user-annie",
    Icon: Volleyball,
  },
  {
    id: "football",
    title: "Football",
    note: "和朋友踢球",
    date: "",
    time: "",
    assignedTo: "user-b",
    Icon: Goal,
  },
  {
    id: "swimming",
    title: "Swimming",
    note: "泳池 45 分钟",
    date: "",
    time: "",
    assignedTo: "user-annie",
    Icon: Waves,
  },
  {
    id: "friends-date",
    title: "Date with close friends",
    note: "晚餐 / 咖啡",
    date: "",
    time: "",
    assignedTo: "user-annie",
    Icon: UsersRound,
  },
  {
    id: "meeting",
    title: "Meeting",
    note: "工作会议",
    date: "",
    time: "",
    assignedTo: "user-b",
    Icon: BriefcaseBusiness,
  },
  {
    id: "trip",
    title: "Trip",
    note: "计划周末出行",
    date: "",
    time: "",
    assignedTo: "user-annie",
    Icon: Plane,
  },
  {
    id: "dentist",
    title: "Dentist",
    note: "牙医预约",
    date: "",
    time: "",
    assignedTo: "user-b",
    Icon: Stethoscope,
  },
  {
    id: "date-night",
    title: "Date night",
    note: "一起吃晚餐",
    date: "",
    time: "",
    assignedTo: "user-annie",
    Icon: CalendarHeart,
  },
  {
    id: "physio",
    title: "Physio appointment",
    note: "9:15am",
    date: "",
    time: "",
    assignedTo: "user-b",
    Icon: CircleDot,
  },
];

const initialShoppingItems: ShoppingItem[] = [
  { id: "milk", title: "牛奶", note: "低脂 1L", assignedTo: "user-b", Icon: Milk },
  { id: "eggs", title: "鸡蛋", note: "一盒 12 个", assignedTo: "user-annie", Icon: Egg },
  { id: "fruit", title: "水果", note: "蓝莓 / 香蕉", assignedTo: "user-b", Icon: Apple },
];

const defaultShoppingSuggestions: ShoppingItem[] = [
  { id: "coffee", title: "咖啡豆", note: "早餐用", assignedTo: "user-b", Icon: Coffee },
  { id: "carrots", title: "胡萝卜", note: "晚餐配菜", assignedTo: "user-annie", Icon: Carrot },
  { id: "apples", title: "苹果", note: "一袋", assignedTo: "user-b", Icon: Apple },
  { id: "yogurt", title: "酸奶", note: "无糖", assignedTo: "user-annie", Icon: Milk },
  { id: "salad", title: "沙拉菜", note: "生菜 / 菠菜", assignedTo: "user-annie", Icon: Salad },
  { id: "grapes", title: "葡萄", note: "无籽一盒", assignedTo: "user-b", Icon: Grape },
  { id: "salmon", title: "三文鱼", note: "晚餐蛋白质", assignedTo: "user-b", Icon: Fish },
  { id: "ham", title: "火腿", note: "三明治用", assignedTo: "user-annie", Icon: Ham },
  { id: "soup", title: "汤料", note: "番茄 / 蘑菇", assignedTo: "user-b", Icon: Soup },
  { id: "extra-eggs", title: "鸡蛋", note: "补一盒", assignedTo: "user-annie", Icon: Egg },
];

function getTogetherDay(startDate: string) {
  const start = new Date(`${startDate}T00:00:00`);
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const startOfRelationship = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const dayMs = 1000 * 60 * 60 * 24;

  return Math.max(
    1,
    Math.floor((startOfToday.getTime() - startOfRelationship.getTime()) / dayMs) +
      1,
  );
}

function getTodayDateValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDayDelta(value: string) {
  const date = new Date(`${value}T00:00:00`);
  const today = new Date(`${getTodayDateValue()}T00:00:00`);
  const dayMs = 1000 * 60 * 60 * 24;

  return Math.round((date.getTime() - today.getTime()) / dayMs);
}

function getDateHeaderMeta(value: string) {
  const date = new Date(`${value}T00:00:00`);
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const baseLabel = `${date.getMonth() + 1}月${date.getDate()}号，${weekdays[date.getDay()]}`;
  const dayDelta = getDayDelta(value);

  if (dayDelta < 0) {
    return {
      color: "var(--color-error)",
      fontWeight: 800,
      label: `${baseLabel}（已过期）`,
    };
  }

  if (dayDelta === 0) {
    return {
      color: "var(--color-primary-deep)",
      fontWeight: 800,
      label: `${baseLabel}（今天）`,
    };
  }

  if (dayDelta === 1) {
    return {
      color: "var(--color-partner-b-deep)",
      fontWeight: 800,
      label: `${baseLabel}（明天）`,
    };
  }

  if (dayDelta <= 6) {
    return {
      color: "var(--color-accent-orange)",
      fontWeight: 700,
      label: baseLabel,
    };
  }

  return {
    color: "var(--color-text-secondary)",
    fontWeight: 700,
    label: baseLabel,
  };
}

function formatTimeLabel(value: string) {
  const [hour, minute] = value.split(":").map(Number);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return value;
  }

  const period = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(minute).padStart(2, "0")}${period}`;
}

function groupTodosByDate(items: ActivityItem[]) {
  return [...items]
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .reduce<Record<string, ActivityItem[]>>((groups, item) => {
      groups[item.date] = [...(groups[item.date] ?? []), item];
      return groups;
    }, {});
}

function getPrimaryCategory(note: string) {
  return note.split("·").at(-1)?.split("/")[0]?.trim() ?? note;
}

function AssigneeAvatar({ assignedTo }: { assignedTo: string }) {
  const isB = assignedTo === "user-b";

  return (
    <div className={cn("cf-avatar-sm", isB && "cf-avatar-sm-b")}>
      {isB ? "🧒" : "👧"}
    </div>
  );
}

export default function Home() {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [assigneeFilter, setAssigneeFilter] = useState<AssigneeFilter>("mf");
  const [selectedTodoDay, setSelectedTodoDay] = useState<TodoDay>("今天");
  const [selectedTodoDate, setSelectedTodoDate] = useState(getTodayDateValue);
  const [selectedTodoTime, setSelectedTodoTime] = useState("09:00");
  const [activityTitles, setActivityTitles] = useState<Record<string, string>>({});
  const [shoppingItems, setShoppingItems] = useState(initialShoppingItems);
  const [checkedShoppingIds, setCheckedShoppingIds] = useState<Set<string>>(
    () => new Set(),
  );
  const togetherDay = getTogetherDay(relationshipStartDate);
  const visibleTodos = todoItems.filter((todo) => {
    if (assigneeFilter === "m") {
      return todo.assignedTo === "user-b";
    }

    if (assigneeFilter === "f") {
      return todo.assignedTo === "user-annie";
    }

    return true;
  });
  const todoGroups = groupTodosByDate(visibleTodos);

  return (
    <section>
      <div className="cf-hero mb-[14px] flex items-center gap-[14px] p-[18px]">
        <div className="grid size-[52px] place-items-center rounded-full border-[3px] border-white/60 bg-white/25 text-[28px] backdrop-blur">
          🧒
        </div>
        <div className="min-w-0 flex-1 text-center">
          <div className="text-[16px] font-black text-white">Isa & Longhu</div>
          <div className="mt-1 inline-flex items-center gap-1 rounded-[20px] bg-white/25 px-2.5 py-[3px] text-[10px] font-bold text-white backdrop-blur">
            <span className="size-[5px] rounded-full bg-[var(--color-connected-dot)]" />
            第{togetherDay}天
          </div>
        </div>
        <div className="grid size-[52px] place-items-center rounded-full border-[3px] border-white/60 bg-white/25 text-[28px] backdrop-blur">
          👧
        </div>
      </div>

      <div className="cf-section-hd">
        <div className="cf-section-title">
          <SectionIcon name="check-square" />
          待办
        </div>
        <div className="flex items-center justify-end gap-1">
          {[
            ["m", "M"],
            ["f", "F"],
            ["mf", "M&F"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setAssigneeFilter(value as AssigneeFilter)}
              className={cn(
                "rounded-[20px] px-3.5 py-1 text-[13px] font-bold transition",
                assigneeFilter === value
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-transparent text-[var(--color-text-secondary)]",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {Object.entries(todoGroups).map(([date, items]) => {
          const dateHeader = getDateHeaderMeta(date);

          return (
          <div key={date}>
            <div
              className="mb-2 mt-5 pl-1 text-[13px]"
              style={{
                color: dateHeader.color,
                fontWeight: dateHeader.fontWeight,
              }}
            >
              {dateHeader.label}
            </div>
            <SoftCard className="mb-2 overflow-hidden rounded-2xl p-0">
            {items.map((todo) => {
              const checked = Boolean(todo.done);
              const Icon = todo.Icon;

              return (
                <div
                  key={todo.id}
                  className="grid grid-cols-[20px_36px_minmax(0,1fr)_26px] items-start gap-x-2.5 border-b border-[var(--color-border)] px-4 py-3 last:border-b-0"
                >
                  <button
                    type="button"
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-[var(--radius-checkbox)] border-2 border-[var(--color-border)] text-[11px] font-black transition duration-150 active:scale-110",
                      checked &&
                        "border-[var(--color-partner-b)] bg-[var(--color-partner-b)] text-white",
                    )}
                    aria-label={`完成 ${todo.title}`}
                  >
                    {checked ? "✓" : ""}
                  </button>
                  <span className="grid size-9 shrink-0 place-items-center self-start rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-deep)]">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                        <div
                          className={cn(
                            "mb-1 truncate text-[14px] font-bold text-[var(--color-text-primary)]",
                            checked &&
                              "text-[var(--color-text-light)] line-through",
                          )}
                        >
                          {todo.title}
                        </div>
                        {todo.time ? (
                          <div className="mb-[3px] inline-flex w-fit items-center gap-[3px] rounded-[20px] bg-[var(--color-time-chip-bg)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-error)]">
                            <span>⏰</span>
                            <span>{formatTimeLabel(todo.time)}</span>
                          </div>
                        ) : null}
                        <div className="truncate text-[11px] font-semibold text-[var(--color-text-secondary)]">
                          {getPrimaryCategory(todo.note)}
                        </div>
                  </div>
                  <div className="self-center">
                    <AssigneeAvatar assignedTo={todo.assignedTo} />
                  </div>
                </div>
              );
            })}
            </SoftCard>
          </div>
          );
        })}
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="mt-1 flex min-h-11 w-full items-center gap-2 rounded-2xl bg-white px-4 py-3 text-left text-[12px] font-semibold text-[var(--color-text-secondary)] shadow-[var(--shadow-card)]"
            >
              <span className="grid size-[22px] place-items-center rounded-full bg-[var(--color-primary-light)] text-[16px] font-black text-[var(--color-primary-deep)]">
                +
              </span>
              添加待办
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加活动</DialogTitle>
              <DialogDescription>
                选择常见活动，快速加入待办。
              </DialogDescription>
            </DialogHeader>

            <div className="grid max-h-[420px] gap-2 overflow-y-auto pr-1">
              <div className="mb-1 grid gap-2">
                <div className="flex gap-1.5">
                  {todoDayOptions.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedTodoDay(day)}
                      className={cn(
                        "min-h-8 rounded-full px-3 text-[11px] font-bold transition",
                        selectedTodoDay === day
                          ? "bg-[var(--color-primary)] text-white"
                          : "bg-[var(--color-primary-light)] text-[var(--color-primary-deep)]",
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <label className="grid gap-1 text-[11px] font-bold text-[var(--color-text-secondary)]">
                  选择日期
                  <input
                    type="date"
                    value={selectedTodoDate}
                    onChange={(event) => setSelectedTodoDate(event.target.value)}
                    className="min-h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 text-[13px] font-bold text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary-deep)]"
                  />
                </label>
                <label className="grid gap-1 text-[11px] font-bold text-[var(--color-text-secondary)]">
                  选择时间
                  <input
                    type="time"
                    value={selectedTodoTime}
                    onChange={(event) => setSelectedTodoTime(event.target.value)}
                    className="min-h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 text-[13px] font-bold text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary-deep)]"
                  />
                </label>
              </div>

              {defaultTodoSuggestions.map((item) => {
                const Icon = item.Icon;
                const editedTitle = activityTitles[item.id] ?? item.title;

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex min-h-11 items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-2.5 py-1.5 text-left shadow-[var(--shadow-card)] transition active:scale-[0.98]",
                    )}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-[var(--radius-icon-box-sm)] bg-[var(--color-primary-light)] text-[var(--color-primary-deep)]">
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <input
                        value={editedTitle}
                        onChange={(event) =>
                          setActivityTitles((currentTitles) => ({
                            ...currentTitles,
                            [item.id]: event.target.value,
                          }))
                        }
                        className="block w-full rounded-md bg-transparent text-[12px] font-extrabold text-[var(--color-text-primary)] outline-none focus:bg-[var(--color-primary-light)]"
                        aria-label={`${item.title} title`}
                      />
                      <span className="block text-[10px] text-[var(--color-text-secondary)]">
                        {item.note}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setTodoItems((currentItems) => [
                          ...currentItems,
                          {
                            ...item,
                            id: `${item.id}-${selectedTodoDate}-${Date.now()}`,
                            title: editedTitle.trim() || item.title,
                            date: selectedTodoDate,
                            time: selectedTodoTime,
                            note: `${selectedTodoDay} · ${item.note}`,
                          },
                        ])
                      }
                      className="min-h-8 rounded-full bg-[var(--color-primary-light)] px-2 py-1 text-[10px] font-extrabold text-[var(--color-primary-deep)]"
                    >
                      + 添加
                    </button>
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="cf-section-hd mt-[14px]">
        <div className="cf-section-title">
          <SectionIcon name="shopping-cart" tone="mint" />
          购买清单
        </div>
        <span className="cf-section-link">共 {shoppingItems.length} 件</span>
      </div>

      <SoftCard className="mt-2.5">
        {shoppingItems.map((item) => {
          const Icon = item.Icon;
          const checked = checkedShoppingIds.has(item.id);

          return (
          <div
            key={item.id}
            className="flex items-center gap-2.5 border-b border-[var(--color-border)] py-2.5 last:border-b-0"
          >
            <button
              type="button"
              onClick={() =>
                setCheckedShoppingIds((currentIds) => {
                  const nextIds = new Set(currentIds);

                  if (nextIds.has(item.id)) {
                    nextIds.delete(item.id);
                  } else {
                    nextIds.add(item.id);
                  }

                  return nextIds;
                })
              }
              className={cn(
                "grid size-5 shrink-0 cursor-pointer place-items-center rounded-full border-2 border-[var(--color-border)] bg-transparent text-[11px] font-black transition duration-150 ease-in-out active:scale-110",
                checked &&
                  "border-[var(--color-partner-b)] bg-[var(--color-partner-b)] text-white",
              )}
              aria-label={`买到 ${item.title}`}
              aria-checked={checked}
              role="checkbox"
            >
              {checked ? "✓" : ""}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="grid size-6 shrink-0 place-items-center rounded-[var(--radius-icon-box-sm)] bg-[var(--color-partner-b-light)] text-[var(--color-partner-b-deep)]">
                  <Icon size={14} strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <div
                    className={cn(
                      "truncate text-[12px] font-bold text-[var(--color-text-primary)]",
                      checked && "text-[var(--color-text-light)] line-through",
                    )}
                  >
                    {item.title}
                  </div>
                  <div
                    className={cn(
                      "mt-px text-[10px] text-[var(--color-text-secondary)]",
                      checked && "text-[var(--color-text-light)] opacity-70",
                    )}
                  >
                    {item.note}
                  </div>
                </div>
              </div>
            </div>
            <AssigneeAvatar assignedTo={item.assignedTo} />
          </div>
          );
        })}
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="flex min-h-11 items-center gap-2 pt-2.5 text-[12px] font-semibold text-[var(--color-text-secondary)]"
            >
              <span className="grid size-[22px] place-items-center rounded-full bg-[var(--color-partner-b-light)] text-[16px] font-black text-[var(--color-partner-b-deep)]">
                +
              </span>
              添加物品
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加购买物品</DialogTitle>
              <DialogDescription>
                选择常买物品，快速加入购买清单。
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-2">
              {defaultShoppingSuggestions.map((item) => {
                const Icon = item.Icon;
                const alreadyAdded = shoppingItems.some(
                  (shoppingItem) => shoppingItem.id === item.id,
                );

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={alreadyAdded}
                    onClick={() =>
                      setShoppingItems((currentItems) => [...currentItems, item])
                    }
                    className={cn(
                      "flex min-h-14 items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-2 text-left shadow-[var(--shadow-card)] transition active:scale-[0.98]",
                      alreadyAdded && "opacity-55",
                    )}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-icon-box)] bg-[var(--color-partner-b-light)] text-[var(--color-partner-b-deep)]">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-extrabold text-[var(--color-text-primary)]">
                        {item.title}
                      </span>
                      <span className="block text-[10px] text-[var(--color-text-secondary)]">
                        {item.note}
                      </span>
                    </span>
                    <span className="text-[12px] font-extrabold text-[var(--color-primary-deep)]">
                      {alreadyAdded ? "已添加" : "+ 添加"}
                    </span>
                  </button>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </SoftCard>
    </section>
  );
}
