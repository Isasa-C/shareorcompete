export type UserId = "user-b" | "user-annie";

export type TodoStatus = "todo" | "in_progress" | "done";

export type Priority = "low" | "medium" | "high";

export type ChoreStatus = "available" | "claimed" | "completed";

export type CheckInMood = "easy" | "normal" | "hard";

export type ExpenseCategory =
  | "food"
  | "home"
  | "health"
  | "transport"
  | "shopping"
  | "fun";

export type ExpenseSplit = "equal" | "paid_by_b" | "paid_by_annie";

export type RewardStatus = "locked" | "available" | "redeemed";

export type WishlistCategory =
  | "tech"
  | "sport"
  | "camera"
  | "beauty"
  | "travel"
  | "home";

export type WishlistStatus = "idea" | "saving" | "ready" | "purchased";

export type User = {
  id: UserId;
  name: string;
  initials: string;
  avatarColor: string;
  role: "partner";
  points: number;
};

export type SharedTodo = {
  id: string;
  title: string;
  notes?: string;
  assignedTo: UserId | "both";
  dueDate: string;
  dueTime?: string;
  status: TodoStatus;
  priority: Priority;
  tags: string[];
};

export type Chore = {
  id: string;
  title: string;
  description: string;
  points: number;
  assignedTo: UserId | "open";
  status: ChoreStatus;
  frequency: "daily" | "weekly" | "as_needed";
  estimatedMinutes: number;
};

export type ChoreCheckIn = {
  id: string;
  choreId: string;
  userId: UserId;
  checkedInAt: string;
  pointsEarned: number;
  mood: CheckInMood;
  note?: string;
};

export type Expense = {
  id: string;
  title: string;
  amount: number;
  currency: "USD";
  paidBy: UserId;
  split: ExpenseSplit;
  category: ExpenseCategory;
  date: string;
  settled: boolean;
  notes?: string;
};

export type MonthlySharedBalance = {
  month: string;
  totalIncome: number;
  currency: "USD";
};

export type Reward = {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  validityDays: number;
  status: RewardStatus;
  createdBy: UserId;
};

export type WishlistItem = {
  id: string;
  title: string;
  category: WishlistCategory;
  estimatedPrice: number;
  currency: "USD";
  requestedBy: UserId | "both";
  priority: Priority;
  status: WishlistStatus;
  savedAmount: number;
  url?: string;
  notes?: string;
};
