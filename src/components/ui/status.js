import { CheckCircleIcon, ErrorIcon, InfoIcon, WarningIcon } from "./icons";

export const STATUS_ICONS = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  danger: ErrorIcon,
};

/**
 * Shared semantic status styling used by Alert, Toast and Badge.
 * Pink is the brand accent; success / warning / danger / info use their own hues.
 */
export const STATUS_STYLES = {
  info: {
    box: "border-blue-200 bg-blue-50 text-blue-900",
    icon: "text-blue-600",
    bar: "border-l-blue-500",
  },
  success: {
    box: "border-green-200 bg-green-50 text-green-900",
    icon: "text-green-600",
    bar: "border-l-green-500",
  },
  warning: {
    box: "border-amber-200 bg-amber-50 text-amber-900",
    icon: "text-amber-600",
    bar: "border-l-amber-500",
  },
  danger: {
    box: "border-red-200 bg-red-50 text-red-900",
    icon: "text-red-600",
    bar: "border-l-red-500",
  },
};
