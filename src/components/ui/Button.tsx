import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export function buttonStyles(
  variant: ButtonVariant = "primary",
  className = "",
) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "surface-line bg-transparent text-white hover:border-white/25 hover:bg-white/[0.12] focus-visible:outline-[var(--gold)]",
    secondary:
      "surface-line bg-white/[0.08] text-white hover:bg-white/[0.14] focus-visible:outline-[var(--cyan)]",
    ghost:
      "text-white/78 hover:bg-white/[0.08] hover:text-white focus-visible:outline-white",
    danger:
      "border border-[#ff835f]/40 bg-[#ff835f]/12 text-[#ffd7cb] hover:bg-[#ff835f]/22 focus-visible:outline-[#ff835f]",
  };

  return [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-45",
    variants[variant],
    className,
  ].join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", variant = "primary", ...props }, ref) => (
    <button ref={ref} className={buttonStyles(variant, className)} {...props}>
      {children}
    </button>
  ),
);

Button.displayName = "Button";
