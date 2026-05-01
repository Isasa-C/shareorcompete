export default function TodosPage() {
  return (
    <div className="flex flex-1 flex-col p-6">
      <h1 className="mb-4 font-serif text-3xl font-normal tracking-[-0.02em] text-[var(--text-primary)]">
        Shared Todos
      </h1>
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-6">
        <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">
          Manage your shared tasks here.
        </p>
        {/* Placeholder for todo list */}
      </div>
    </div>
  )
}
