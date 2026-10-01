import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";
import Field from "./Field";
import { controlClasses, getFieldIds } from "./field-utils";

/**
 * <Input label="Email" type="email" hint="We never share it" error={errors.email} required />
 */
const Input = forwardRef(function Input(
  {
    id,
    label,
    hint,
    error,
    required,
    hideLabel,
    leftIcon,
    className,
    wrapperClassName,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const { hintId, errorId, describedBy } = getFieldIds(inputId, { hint, error });

  return (
    <Field
      id={inputId}
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
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(controlClasses(!!error), leftIcon && "pl-10", className)}
          {...props}
        />
      </div>
    </Field>
  );
});

export default Input;
