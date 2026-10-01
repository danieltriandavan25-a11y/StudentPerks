import Button from "./Button";
import Modal from "./Modal";

/**
 * Generic yes/no confirmation. Caller supplies all wording and handlers.
 *
 * <ConfirmDialog
 *   open={open}
 *   title="Delete item?"
 *   description="This cannot be undone."
 *   confirmLabel="Delete"
 *   variant="danger"
 *   onConfirm={handleDelete}
 *   onCancel={() => setOpen(false)}
 * />
 */
function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onCancel}
      title={title}
      description={description}
      size="sm"
      hideCloseButton
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}

export default ConfirmDialog;
