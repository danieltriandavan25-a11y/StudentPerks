import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";
import Field from "./Field";
import { controlClasses, getFieldIds } from "./field-utils";
import { ChevronDownIcon } from "./icons";

/**
 * Native select (best accessibility + mobile UX).
 *
 * <Select label="Category" options={[{ value: "food", label: "Food" }]} placeholder="Choose..." />
 * or pass <option> children directly.
 */
const Select = forwardRef(function Select(
  {
    id,
    label,
    hint,
    error,
    required,
    hideLabel,
    options,
    placeholder,
    className,
    wrapperClassName,
    children,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const { hintId, errorId, describedBy } = getFieldIds(selectId, {
    hint,
    error,
  });

  return (
    <Field
      id={selectId}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
      errorId={errorId}
      required={required}
      hideLabel={hideLabel}
      className={wrapperClassName}
    >
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(controlClasses(!!error), "appearance-none pr-10", className)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((o) => (
                <option key={o.value} value={o.value} disabled={o.disabled}>
                  {o.label}
                </option>
              ))
            : children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <ChevronDownIcon className="h-4 w-4" />
        </span>
      </div>
    </Field>
  );
});

export default Select;
