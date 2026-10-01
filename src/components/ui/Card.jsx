import { cn } from "../../utils/cn";

/**
 * Surface container.
 * <Card>
 *   <CardHeader><CardTitle>Title</CardTitle><CardDescription>…</CardDescription></CardHeader>
 *   <CardBody>…</CardBody>
 *   <CardFooter>…</CardFooter>
 * </Card>
 */
export function Card({ as: Component = "div", padded = false, className, ...props }) {
  return (
    <Component
      className={cn(
        "rounded-lg border border-slate-200 bg-white shadow-sm",
        padded && "p-4 sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-b border-slate-200 px-4 py-4 sm:px-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ as: Component = "h3", className, ...props }) {
  return (
    <Component
      className={cn("text-base font-semibold text-slate-900", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-slate-500", className)} {...props} />;
}

export function CardBody({ className, ...props }) {
  return <div className={cn("px-4 py-4 sm:px-6 sm:py-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-6 rounded-b-lg",
        className,
      )}
      {...props}
    />
  );
}
