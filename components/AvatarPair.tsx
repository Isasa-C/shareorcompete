export default function AvatarPair() {
  return (
    <div className="flex -space-x-3" aria-label="Couple avatars">
      <div className="grid size-11 place-items-center rounded-full border border-[var(--bg-card)] bg-[var(--partner-a)] text-sm font-medium text-[var(--bg-card)]">
        A
      </div>
      <div className="grid size-11 place-items-center rounded-full border border-[var(--bg-card)] bg-[var(--partner-b)] text-sm font-medium text-[var(--bg-card)]">
        B
      </div>
    </div>
  );
}
