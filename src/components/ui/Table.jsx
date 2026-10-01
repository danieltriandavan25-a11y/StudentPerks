import { cn } from "../../utils/cn";

/**
 * Composable table primitives with a horizontally scrollable, keyboard-focusable wrapper
 * so wide tables stay usable on mobile.
 *
 * <Table caption="Recent items">
 *   <TableHead><TableRow><TableHeader>Name</TableHeader></TableRow></TableHead>
 *   <TableBody><TableRow><TableCell>…</TableCell></TableRow></TableBody>
 * </Table>
 */
export function Table({ caption, hideCaption = true, className, children, ...props }) {
  return (
    <div
      role="region"
      aria-label={caption}
      tabIndex={0}
      className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <table
        className={cn("min-w-full divide-y divide-slate-200 text-left text-sm", className)}
        {...props}
      >
        {caption && (
          <caption className={cn(hideCaption ? "sr-only" : "p-4 text-left font-semibold")}>
            {caption}
          </caption>
        )}
        {children}
      </table>
    </div>
  );
}

export function TableHead({ className, ...props }) {
  return <thead className={cn("bg-slate-50", className)} {...props} />;
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn("divide-y divide-slate-200 bg-white", className)} {...props} />;
}

export function TableRow({ className, ...props }) {
  return <tr className={cn("hover:bg-slate-50/70", className)} {...props} />;
}

export function TableHeader({ align = "left", className, ...props }) {
  return (
    <th
      scope="col"
      className={cn(
        "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ align = "left", className, ...props }) {
  return (
    <td
      className={cn(
        "px-4 py-3 text-slate-700",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
      {...props}
    />
  );
}
