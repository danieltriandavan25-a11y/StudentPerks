import { cn } from "../../utils/cn";
import IconButton from "./IconButton";
import { STATUS_ICONS, STATUS_STYLES } from "./status";
import { CloseIcon } from "./icons";

/**
 * Inline message banner.
 * <Alert variant="warning" title="Heads up" onDismiss={fn}>Message</Alert>
 */
function Alert({ variant = "info", title, onDismiss, className, children, ...props }) {
  const styles = STATUS_STYLES[variant];
  const Icon = STATUS_ICONS[variant];
  const urgent = variant === "danger" || variant === "warning";

  return (
    <div
      role={urgent ? "alert" : "status"}
      className={cn("flex gap-3 rounded-md border p-4", styles.box, className)}
      {...props}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", styles.icon)} />
      <div className="min-w-0 flex-1 text-sm">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn(title && "mt-1")}>{children}</div>}
      </div>
      {onDismiss && (
        <IconButton
          label="Dismiss"
          size="sm"
          icon={<CloseIcon className="h-4 w-4" />}
          onClick={onDismiss}
          className="-m-1 text-current opacity-70 hover:bg-black/5 hover:opacity-100"
        />
      )}
    </div>
  );
}

export default Alert;
