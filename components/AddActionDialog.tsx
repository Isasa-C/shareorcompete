"use client";

import { FormEvent, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type FormKind = "task" | "chore" | "expense" | "wishlist" | "reward";

type FieldConfig = {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "select";
  placeholder?: string;
  options?: { label: string; value: string }[];
};

const ownerOptions = [
  { label: "Annie", value: "user-annie" },
  { label: "B", value: "user-b" },
  { label: "Shared", value: "both" },
];

const assigneeOptions = [
  { label: "Annie", value: "user-annie" },
  { label: "B", value: "user-b" },
  { label: "Open", value: "open" },
];

const formCopy: Record<
  FormKind,
  {
    title: string;
    description: string;
    submitLabel: string;
    nameKey: string;
    positiveKey: string;
    dateKey: string;
    ownerKey: string;
    fields: FieldConfig[];
  }
> = {
  task: {
    title: "Add an event",
    description: "Create a shared event for today or later.",
    submitLabel: "Add",
    nameKey: "title",
    positiveKey: "",
    dateKey: "date",
    ownerKey: "assignee",
    fields: [
      { key: "title", label: "Title", type: "text", placeholder: "Dental" },
      {
        key: "assignee",
        label: "Who",
        type: "select",
        options: [
          { label: "M", value: "user-annie" },
          { label: "F", value: "user-b" },
          { label: "M&F", value: "both" },
        ],
      },
      { key: "date", label: "Date", type: "date" },
    ],
  },
  chore: {
    title: "Add Chore",
    description: "Add a chore with points for Chore PK.",
    submitLabel: "Add Chore",
    nameKey: "title",
    positiveKey: "points",
    dateKey: "date",
    ownerKey: "assignee",
    fields: [
      {
        key: "title",
        label: "Chore name",
        type: "text",
        placeholder: "Washing dishes",
      },
      { key: "points", label: "Points", type: "number", placeholder: "8" },
      {
        key: "assignee",
        label: "Assignee",
        type: "select",
        options: assigneeOptions,
      },
      { key: "date", label: "Due date", type: "date" },
    ],
  },
  expense: {
    title: "Add Expense",
    description: "Track a shared expense and split it evenly.",
    submitLabel: "Add Expense",
    nameKey: "title",
    positiveKey: "amount",
    dateKey: "date",
    ownerKey: "paidBy",
    fields: [
      {
        key: "title",
        label: "Expense name",
        type: "text",
        placeholder: "Groceries",
      },
      { key: "amount", label: "Amount", type: "number", placeholder: "42.50" },
      {
        key: "paidBy",
        label: "Paid by",
        type: "select",
        options: ownerOptions.slice(0, 2),
      },
      { key: "date", label: "Date", type: "date" },
    ],
  },
  wishlist: {
    title: "Add Wishlist Item",
    description: "Save a gift idea or shared goal.",
    submitLabel: "Add Item",
    nameKey: "title",
    positiveKey: "amount",
    dateKey: "date",
    ownerKey: "owner",
    fields: [
      {
        key: "title",
        label: "Item name",
        type: "text",
        placeholder: "AirPods Pro 2",
      },
      { key: "amount", label: "Target price", type: "number", placeholder: "249" },
      { key: "owner", label: "Owner", type: "select", options: ownerOptions },
      { key: "date", label: "Target date", type: "date" },
    ],
  },
  reward: {
    title: "Add Reward",
    description: "Create a reward that can be redeemed with points.",
    submitLabel: "Add Reward",
    nameKey: "title",
    positiveKey: "points",
    dateKey: "date",
    ownerKey: "owner",
    fields: [
      {
        key: "title",
        label: "Reward name",
        type: "text",
        placeholder: "Movie night pick",
      },
      { key: "points", label: "Required points", type: "number", placeholder: "40" },
      { key: "owner", label: "Owner", type: "select", options: ownerOptions },
      { key: "date", label: "Valid from", type: "date" },
    ],
  },
};

function getFormKind(pathname: string): FormKind {
  if (pathname.startsWith("/chores")) {
    return "chore";
  }

  if (pathname.startsWith("/expenses")) {
    return "expense";
  }

  if (pathname.startsWith("/wishlist")) {
    return "wishlist";
  }

  if (pathname.startsWith("/profile")) {
    return "reward";
  }

  return "task";
}

function getInitialValues(kind: FormKind) {
  return Object.fromEntries(
    formCopy[kind].fields.map((field) => [field.key, ""]),
  ) as Record<string, string>;
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: string;
  onChange: (key: string, value: string) => void;
}) {
  const baseClassName =
    "h-11 w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-card)] px-3 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-action)] focus:ring-2 focus:ring-[var(--accent-action)]";

  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] font-medium text-[var(--text-primary)]">{field.label}</span>
      {field.type === "select" ? (
        <select
          value={value}
          onChange={(event) => onChange(field.key, event.target.value)}
          className={baseClassName}
        >
          <option value="">Choose</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={value}
          type={field.type}
          min={field.type === "number" ? "0.01" : undefined}
          step={field.type === "number" ? "0.01" : undefined}
          placeholder={field.placeholder}
          onChange={(event) => onChange(field.key, event.target.value)}
          className={baseClassName}
        />
      )}
    </label>
  );
}

export default function AddActionDialog({
  trigger,
}: {
  trigger: ReactNode;
}) {
  const pathname = usePathname();
  const kind = getFormKind(pathname);
  const copy = formCopy[kind];
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(() => getInitialValues(kind));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateValue(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setError("");
    setSuccess("");
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setValues(getInitialValues(kind));
      setError("");
      setSuccess("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values[copy.nameKey]?.trim()) {
      setError("Title or name is required.");
      return;
    }

    if (Number(values[copy.positiveKey]) <= 0) {
      setError("Amount or points must be positive.");
      return;
    }

    if (!values[copy.ownerKey]) {
      setError("Choose an owner or assignee.");
      return;
    }

    if (!values[copy.dateKey]) {
      setError("Choose a date.");
      return;
    }

    setSuccess(`${copy.title.replace("Add ", "")} added locally.`);
    setValues(getInitialValues(kind));
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {copy.fields.map((field) => (
            <Field
              key={field.key}
              field={field}
              value={values[field.key] ?? ""}
              onChange={updateValue}
            />
          ))}

          {error ? (
            <p className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3 py-2 text-sm font-medium text-[var(--text-primary)]">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3 py-2 text-sm font-medium text-[var(--text-primary)]">
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            className={cn(
              "mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-[var(--gradient-button)] px-4 text-[14px] font-extrabold text-white shadow-[var(--shadow-fab)] transition opacity-100 hover:opacity-85",
            )}
          >
            <span className="text-[18px] font-black leading-none">+</span>
            {copy.submitLabel}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
