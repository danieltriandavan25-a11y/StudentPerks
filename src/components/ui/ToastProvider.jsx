import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import IconButton from "./IconButton";
import { CloseIcon } from "./icons";
import { STATUS_ICONS, STATUS_STYLES } from "./status";
import { ToastContext } from "./toast-context";

const DEFAULT_DURATION = 5000;

function ToastItem({ toast, onDismiss }) {
  const styles = STATUS_STYLES[toast.variant];
  const Icon = STATUS_ICONS[toast.variant];
  return (
    <div
      className={cn(
        "pointer-events-auto flex w-full gap-3 rounded-md border border-slate-200 border-l-4 bg-white p-4 shadow-lg",
        styles.bar,
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", styles.icon)} />
      <div className="min-w-0 flex-1 text-sm text-slate-700">
        {toast.title && <p className="font-semibold text-slate-900">{toast.title}</p>}
        <p>{toast.message}</p>
      </div>
      <IconButton
        label="Dismiss notification"
        size="sm"
        icon={<CloseIcon className="h-4 w-4" />}
        onClick={() => onDismiss(toast.id)}
        className="-m-1"
      />
    </div>
  );
}

/** Wrap the app once: <ToastProvider><App /></ToastProvider> */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());
  const counter = useRef(0);

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    ({ variant = "info", title, message, duration = DEFAULT_DURATION }) => {
      counter.current += 1;
      const id = counter.current;
      setToasts((list) => [...list, { id, variant, title, message }]);
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      }
      return id;
    },
    [dismiss],
  );

  useEffect(() => {
    const active = timers.current;
    return () => active.forEach((t) => clearTimeout(t));
  }, []);

  const api = useMemo(() => {
    const make = (variant) => (message, opts = {}) =>
      show({ variant, message, ...opts });
    return {
      show,
      dismiss,
      info: make("info"),
      success: make("success"),
      warning: make("warning"),
      error: make("danger"),
    };
  }, [show, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        aria-relevant="additions"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:w-96 sm:items-end"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
