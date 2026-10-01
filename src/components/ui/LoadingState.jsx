import { cn } from "../../utils/cn";
import Spinner from "./Spinner";

/**
 * Centered loading indicator for sections or whole pages.
 * <LoadingState label="Loading…" /> · <LoadingState fullPage />
 */
function LoadingState({ label = "Loading…", fullPage = false, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-slate-500",
        fullPage ? "min-h-screen" : "py-12",
        className,
      )}
    >
      <Spinner size="lg" className="text-brand-600" label="" />
      <p role="status" className="text-sm">
        {label}
      </p>
    </div>
  );
}

export default LoadingState;
