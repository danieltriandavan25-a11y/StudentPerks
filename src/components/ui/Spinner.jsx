import { cn } from "../../utils/cn";

const SIZES = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-10 w-10" };

/** Animated loading indicator. Pass label="" to hide the screen-reader text. */
function Spinner({ size = "md", label = "Loading", className }) {
  return (
    <span role={label ? "status" : undefined} className="inline-flex">
      <svg
        className={cn("animate-spin", SIZES[size], className)}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-25"
        />
        <path
          d="M4 12a8 8 0 0 1 8-8"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-90"
        />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </span>
  );
}

export default Spinner;
