import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import Button from "./Button";
import { ChevronDownIcon } from "./icons";

/**
 * Action menu (menu-button pattern) with keyboard support.
 *
 * <Dropdown
 *   label="Actions"
 *   items={[
 *     { label: "Edit", onSelect: () => {} },
 *     { type: "separator" },
 *     { label: "Delete", onSelect: () => {}, danger: true },
 *   ]}
 * />
 */
function Dropdown({
  label = "Menu",
  items,
  variant = "secondary",
  size = "md",
  align = "right",
  triggerContent,
  triggerAriaLabel,
  className,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);
  const menuId = useId();

  const actionIndexes = items
    .map((item, i) => (item.type === "separator" || item.disabled ? -1 : i))
    .filter((i) => i >= 0);

  const focusItem = (index) => itemRefs.current[index]?.focus();

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Focus first item when opened
  useEffect(() => {
    if (open && actionIndexes.length) itemRefs.current[actionIndexes[0]]?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onTriggerKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onMenuKeyDown = (e) => {
    const current = actionIndexes.indexOf(Number(document.activeElement?.dataset.index));
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(actionIndexes[(current + 1) % actionIndexes.length]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(actionIndexes[(current - 1 + actionIndexes.length) % actionIndexes.length]);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(actionIndexes[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(actionIndexes[actionIndexes.length - 1]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative inline-block text-left", className)}>
      <Button
        ref={triggerRef}
        variant={variant}
        size={size}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={triggerAriaLabel}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        rightIcon={<ChevronDownIcon className="h-4 w-4" />}
      >
        {triggerContent ?? label}
      </Button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          className={cn(
            "absolute z-30 mt-2 min-w-48 rounded-md border border-slate-200 bg-white py-1 shadow-lg",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {items.map((item, i) =>
            item.type === "separator" ? (
              <div key={`sep-${i}`} role="separator" className="my-1 h-px bg-slate-200" />
            ) : (
              <button
                key={item.label}
                ref={(el) => (itemRefs.current[i] = el)}
                data-index={i}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                tabIndex={-1}
                onClick={() => {
                  close();
                  item.onSelect?.();
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm",
                  "focus-visible:outline-none focus-visible:bg-slate-100",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  item.danger
                    ? "text-red-700 hover:bg-red-50 focus-visible:bg-red-50"
                    : "text-slate-700 hover:bg-slate-100",
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
