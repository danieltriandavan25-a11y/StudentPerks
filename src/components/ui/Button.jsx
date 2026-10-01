import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import Spinner from "./Spinner";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap " +
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60";

const VARIANTS = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800 focus-visible:ring-brand-500",
  secondary:
    "border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 focus-visible:ring-brand-500",
  ghost:
    "text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-brand-500",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
};

const SIZES = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

/**
 * <Button variant="primary" size="md" loading leftIcon={...}>Label</Button>
 *
 * variant: primary | secondary | ghost | danger
 * size:    sm | md | lg
 * as:      render as another element/component, e.g. as={Link} to="/login"
 */
const Button = forwardRef(function Button(
  {
    as: Component = "button",
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    children,
    type,
    ...props
  },
  ref,
) {
  const isButton = Component === "button";
  const isDisabled = disabled || loading;

  return (
    <Component
      ref={ref}
      type={isButton ? (type ?? "button") : type}
      disabled={isButton ? isDisabled : undefined}
      aria-disabled={!isButton && isDisabled ? true : undefined}
      aria-busy={loading || undefined}
      className={cn(
        BASE,
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading ? <Spinner size="sm" label="" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </Component>
  );
});

export default Button;
