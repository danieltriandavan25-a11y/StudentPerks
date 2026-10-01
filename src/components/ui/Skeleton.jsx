import { cn } from "../../utils/cn";

/** Placeholder block for content that is loading. Decorative (aria-hidden). */
function Skeleton({ className, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-slate-200", className)}
      {...props}
    />
  );
}

export default Skeleton;
