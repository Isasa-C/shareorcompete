import Link from "next/link";

const features = [
  ["📋", "共享待办", "重要事情不再遗漏"],
  ["🏆", "家务PK", "完成家务赢积分"],
  ["🎁", "积分奖励", "赢的人有奖励哦"],
  ["📅", "日历视图", "日程一目了然"],
];

const settingGroups = [
  {
    title: "提醒 & 纪念日",
    rows: [
      ["🔔", "Date reminders", ""],
      ["🎂", "Anniversary", ""],
    ],
  },
  {
    title: "个性化",
    rows: [
      ["🎨", "Appearance", "/profile/appearance"],
      ["🔒", "Privacy", ""],
    ],
  },
  {
    title: "账号",
    rows: [["💔", "Disconnect partner", ""]],
  },
];

export default function ProfilePage() {
  return (
    <section>
      <div className="cf-hero mb-[14px] p-[22px] text-center">
        <div className="mb-3 flex justify-center">
          <div className="grid size-[60px] place-items-center rounded-full border-[3px] border-white/70 bg-white/25 text-[34px]">
            🧒
          </div>
          <div className="-ml-[14px] grid size-[60px] place-items-center rounded-full border-[3px] border-white/70 bg-white/25 text-[34px]">
            👧
          </div>
        </div>
        <div className="text-[18px] font-black text-white">Alex & Annie</div>
        <div className="mt-1 text-[11px] text-white/80">
          Together since 2022 💗
        </div>
      </div>

      <div className="mb-[14px] grid grid-cols-2 gap-2.5">
        {features.map(([icon, name, desc]) => (
          <div
            key={name}
            className="rounded-[var(--radius-card-sm)] bg-white p-[14px] text-center shadow-[var(--shadow-card)]"
          >
            <div className="mb-1.5 text-[28px]">{icon}</div>
            <div className="text-[12px] font-extrabold text-[var(--color-text-primary)]">
              {name}
            </div>
            <div className="mt-px text-[10px] text-[var(--color-text-secondary)]">
              {desc}
            </div>
          </div>
        ))}
      </div>

      {settingGroups.map((group) => (
        <div key={group.title} className="mb-[14px]">
          <div className="mb-1.5 pl-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
            {group.title}
          </div>
          <div>
            {group.rows.map(([icon, label, href], index) => {
              const destructive = label === "Disconnect partner";
              const row = (
                <div
                  className={[
                    "flex min-h-[58px] items-center gap-3 border-b border-[var(--color-border)] bg-white px-4 py-[13px]",
                    index === 0 ? "rounded-t-2xl" : "",
                    index === group.rows.length - 1 ? "rounded-b-2xl border-b-0" : "",
                    group.rows.length === 1 ? "rounded-2xl" : "",
                  ].join(" ")}
                >
                  <div
                    className="grid size-8 shrink-0 place-items-center rounded-[var(--radius-icon-box-sm)] text-[16px]"
                    style={{
                      background: destructive
                        ? "var(--color-error-light)"
                        : "var(--color-primary-light)",
                    }}
                  >
                    {icon}
                  </div>
                  <div
                    className="min-w-0 flex-1 text-[13px] font-bold"
                    style={{
                      color: destructive
                        ? "var(--color-error)"
                        : "var(--color-text-primary)",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    className="text-[14px]"
                    style={{
                      color: destructive
                        ? "var(--color-error)"
                        : "var(--color-text-light)",
                    }}
                  >
                    ›
                  </div>
                </div>
              );

              return href ? (
                <Link key={label} href={href} className="block">
                  {row}
                </Link>
              ) : (
                <button key={label} type="button" className="block w-full text-left">
                  {row}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="px-2 pb-3 pt-2 text-center text-[12px] font-bold text-[var(--color-text-secondary)]">
        💙 一起打理生活，让爱更有温度 💚
      </div>
    </section>
  );
}
