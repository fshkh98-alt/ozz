import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-accent text-[color:var(--accent-contrast)] shadow-[0_10px_30px_var(--glow)] hover:-translate-y-0.5 hover:brightness-105",
  secondary: "border border-border bg-surface-2 text-text hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface",
  ghost: "bg-transparent text-text-muted hover:bg-surface-2 hover:text-text",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return cn(
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
    variantStyles[variant],
    className
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
