import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const SIZES = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
};

/**
 * Icon-only button. `label` is required for accessibility (becomes aria-label).
 * <IconButton label="Close" icon={<CloseIcon />} />
 */
const IconButton = forwardRef(function IconButton(
  { label, icon, size = "md", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-slate-500 transition-colors",
        "hover:bg-slate-100 hover:text-slate-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        "disabled:cursor-not-allowed disabled:opacity-60",
        SIZES[size],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
});

export default IconButton;
