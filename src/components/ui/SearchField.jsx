import { useId, useState } from "react";
import { cn } from "../../utils/cn";
import { CloseIcon, SearchIcon } from "./icons";

/**
 * Search input with icon + clear button.
 * Works controlled (value + onChange(string)) or uncontrolled.
 * onSearch(value) fires on Enter / submit.
 */
function SearchField({
  value,
  onChange,
  onSearch,
  placeholder = "Search",
  label = "Search",
  size = "md",
  className,
  ...props
}) {
  const id = useId();
  const [internal, setInternal] = useState("");
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const update = (next) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(current);
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("w-full", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <SearchIcon className="h-5 w-5" />
        </span>
        <input
          id={id}
          type="search"
          value={current}
          onChange={(e) => update(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            "block w-full rounded-md border border-slate-300 bg-white pl-10 pr-10 text-base text-slate-900 shadow-sm sm:text-sm",
            "placeholder:text-slate-400 hover:border-slate-400",
            "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30",
            "[&::-webkit-search-cancel-button]:appearance-none",
            size === "lg" ? "h-12" : "h-10",
          )}
          {...props}
        />
        {current && (
          <button
            type="button"
            onClick={() => update("")}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 text-slate-400 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchField;
