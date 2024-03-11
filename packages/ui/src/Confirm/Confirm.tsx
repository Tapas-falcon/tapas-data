import { Modal, ModalDialog, DialogTitle, Divider, DialogContent, DialogActions, Button } from "@mui/joy"
import { useState, useEffect } from "react"
import { WarningIcon } from "../icons"

export type ConfirmProps = {
  className?: string,
  open: boolean,
  message?: string,
  cancelText?: string,
  confirmText?: string,
  onCancel?: () => void,
  onConfirm?: () => void,
  onClose: () => void,
}
export const Confirm = ({
  open,
  message,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  onClose,
}: ConfirmProps) => {
  const [show, setShow] = useState(open)

  useEffect(() => {
    setShow(open)
  }, [open])

  const closeSelf = () => {
    setShow(false)
    onClose()
  }

  return (
    <Modal open={show} onClose={closeSelf}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningIcon />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>
          {message ?? 'Are you sure?'}
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="neutral" onClick={() => {
            onConfirm && onConfirm()
            closeSelf()
          }}>
            {confirmText ?? 'Confirm'}
          </Button>
          <Button variant="plain" color="neutral" onClick={() => {
            onCancel && onCancel()
            closeSelf()
          }}>
            {cancelText ?? 'Cancel'}
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}
