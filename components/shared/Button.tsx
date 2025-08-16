import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "rounded-lg font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
  secondary:
    "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  outline:
    "border border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-indigo-500",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm", // grows a bit on bigger screens
  md: "px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base", // balanced default
  lg: "px-5 py-3 text-base sm:px-6 sm:py-3.5 sm:text-lg", // more generous on md+
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}
