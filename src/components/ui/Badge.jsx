import { cn } from "../../utils/cn";

const VARIANTS = {
  neutral: { box: "bg-slate-100 text-slate-700 ring-slate-200", dot: "bg-slate-500" },
  brand: { box: "bg-brand-50 text-brand-700 ring-brand-200", dot: "bg-brand-600" },
  success: { box: "bg-green-50 text-green-800 ring-green-200", dot: "bg-green-600" },
  warning: { box: "bg-amber-50 text-amber-800 ring-amber-200", dot: "bg-amber-500" },
  danger: { box: "bg-red-50 text-red-800 ring-red-200", dot: "bg-red-600" },
  info: { box: "bg-blue-50 text-blue-800 ring-blue-200", dot: "bg-blue-600" },
};

/**
 * Status/label pill. Always renders text so status is never conveyed by color alone.
 * <Badge variant="success" dot>Approved</Badge>
 */
function Badge({ variant = "neutral", dot = false, className, children, ...props }) {
  const v = VARIANTS[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        v.box,
        className,
      )}
      {...props}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", v.dot)} aria-hidden="true" />}
      {children}
    </span>
  );
}

export default Badge;
