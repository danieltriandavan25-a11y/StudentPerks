import { useEffect, useId, useRef } from "react";
import { cn } from "../../utils/cn";
import IconButton from "./IconButton";
import { CloseIcon } from "./icons";

const SIZES = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

/**
 * Accessible modal built on the native <dialog> element
 * (focus trapping, Escape handling and inert background come from the browser).
 *
 * <Modal open={open} onClose={() => setOpen(false)} title="Edit" footer={<Button>Save</Button>}>
 *   …content…
 * </Modal>
 */
function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  hideCloseButton = false,
  className,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  // Sync the `open` prop with the native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Prevent the page behind the modal from scrolling
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const handleBackdropMouseDown = (e) => {
    // Clicking the ::backdrop targets the <dialog> itself
    if (closeOnBackdrop && e.target === dialogRef.current) onClose?.();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      onCancel={(e) => {
        e.preventDefault(); // parent owns the open state
        onClose?.();
      }}
      onMouseDown={handleBackdropMouseDown}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-lg bg-white p-0 text-left text-slate-900 shadow-xl",
        "backdrop:bg-slate-900/50",
        SIZES[size],
        className,
      )}
    >
      {open && (
        <div>
          <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
            <div className="min-w-0">
              {title && (
                <h2 id={titleId} className="text-lg font-semibold text-slate-900">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="mt-1 text-sm text-slate-500">
                  {description}
                </p>
              )}
            </div>
            {!hideCloseButton && (
              <IconButton
                label="Close dialog"
                size="sm"
                icon={<CloseIcon className="h-5 w-5" />}
                onClick={onClose}
                className="-mr-2 -mt-1 shrink-0"
              />
            )}
          </div>
          {children && <div className="px-5 py-4 sm:px-6">{children}</div>}
          {footer && (
            <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3 sm:flex-row sm:justify-end sm:px-6">
              {footer}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}

export default Modal;
