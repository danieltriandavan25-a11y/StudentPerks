/** Build stable ids and aria-describedby for a form control. */
export function getFieldIds(id, { hint, error }) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;
  return { hintId, errorId, describedBy };
}

/** Shared control styling for Input / Select / Textarea. */
export function controlClasses(hasError) {
  return [
    "block w-full rounded-md border bg-white px-3 py-2 text-base text-slate-900 shadow-sm sm:text-sm",
    "placeholder:text-slate-400",
    "transition-colors",
    "focus:outline-none focus:ring-2",
    "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
      : "border-slate-300 hover:border-slate-400 focus:border-brand-500 focus:ring-brand-500/30",
  ].join(" ");
}
