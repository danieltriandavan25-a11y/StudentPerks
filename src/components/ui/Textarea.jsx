import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";
import Field from "./Field";
import { controlClasses, getFieldIds } from "./field-utils";

/** <Textarea label="Description" rows={4} hint="Max 500 characters" /> */
const Textarea = forwardRef(function Textarea(
  {
    id,
    label,
    hint,
    error,
    required,
    hideLabel,
    rows = 4,
    className,
    wrapperClassName,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const { hintId, errorId, describedBy } = getFieldIds(textareaId, {
    hint,
    error,
  });

  return (
    <Field
      id={textareaId}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
      errorId={errorId}
      required={required}
      hideLabel={hideLabel}
      className={wrapperClassName}
    >
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(controlClasses(!!error), "resize-y", className)}
        {...props}
      />
    </Field>
  );
});

export default Textarea;
