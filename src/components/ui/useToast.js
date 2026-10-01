import { useContext } from "react";
import { ToastContext } from "./toast-context";

/**
 * const toast = useToast();
 * toast.success("Saved");
 * toast.error("Something went wrong", { title: "Error", duration: 8000 });
 * toast.show({ variant: "info", message: "Hello" });
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}
