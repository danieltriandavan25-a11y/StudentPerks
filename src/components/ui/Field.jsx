import { cn } from "../../utils/cn";
import { ErrorIcon } from "./icons";

/**
 * Label + hint + error wrapper shared by Input, Select, Textarea.
 * Generic: no StudentPerks logic.
 */
function Field({
  id,
  label,
  hint,
  hintId,
  error,
  errorId,
  required,
  hideLabel = false,
  className,
  children,
}) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "mb-1.5 block text-sm font-medium text-slate-700",
            hideLabel && "sr-only",
          )}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-600" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-start gap-1.5 text-sm text-red-700"
        >
          <ErrorIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default Field;
