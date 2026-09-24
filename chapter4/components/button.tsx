import { cn } from "@/util";
import { ReactNode } from "react";

export default function Button({
  children,
  action,
  className,
  disabled = false,
  type = "button",
}: {
  children: ReactNode;
  action?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      onClick={action}
      type={type}
      className={cn(
        "bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm",
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
