import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function SoftCard({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("cf-card mb-[14px]", className)} {...props} />;
}
