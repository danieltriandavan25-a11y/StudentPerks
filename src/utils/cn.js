/**
 * Join class names, skipping falsy values.
 * cn("a", cond && "b", undefined) -> "a b" (when cond is true)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
