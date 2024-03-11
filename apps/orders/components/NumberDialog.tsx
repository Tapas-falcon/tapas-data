import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';

import { NumberKeyboard } from '@tapas/ui/NumberKeyboard'
import { DiversityIcon } from '@tapas/ui/icons';
import { useState } from 'react';
import { Box, Button } from '@mui/joy';

type ModalDialogCloseCallback = (action: 'switch-user'|'order', param?: any) => void;


export default function NumberDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [modalCallback, setmodalCallback] = useState({
    onClose: (action: 'switch-user'|'order', param?: any) => { },
    onCancel: () => { },
  });

  const modal = <Modal open={open} onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown' || reason === 'closeClick') {
        modalCallback.onCancel();
        return;
    }
}}>
    <ModalDialog
      sx={{
        borderRadius: `var(--radius-radius-rounded, 0.75rem)`,
        background: 'var(--surface-sf-wht, #FFF)',
        '--Card-padding': '1rem',
        display: 'flex',
        flexDirection: 'column',
        height: '37.5rem',
        gap: 0,
        width: 'var(--spacing-49, 24.5rem)'
      }}
    >
      <DialogTitle className="text-black text-opacity-90 text-base font-bold font-['Bricolage Grotesque'] mb-4 flex items-center">
        <DiversityIcon className='mr-2' size={20} />
        Table for how many guests?
        <ModalClose />
      </DialogTitle>
      <NumberKeyboard
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        label={'Number of guests'} />
      <Box className="flex flex-col gap-2 mt-4">
        <Button
          disabled={Number(value) <= 0}
          variant="solid"
          color="neutral"
          className='rounded-[360px] h-12'
          onClick={() => onDialogClose('order', value)}
        >Order now</Button>
        <Button
          variant="plain"
          color="neutral"
          className='rounded-[360px] h-12'
          onClick={() => onDialogClose('switch-user')}
        >Switch account</Button>
      </Box>
    </ModalDialog>
  </Modal>
  type openModalParams = {
    initialVal?: string,
    onClose?: ModalDialogCloseCallback,
    onCancel?: () => void,
  }
  const openModal = ({
    initialVal='',
    onClose=()=>{},
    onCancel=()=>{},
  }: openModalParams) => {
    setValue(initialVal);
    setmodalCallback({onClose, onCancel});
    setOpen(true);
  };

  const onDialogClose: ModalDialogCloseCallback = (action, param) => {
    modalCallback.onClose(action, param);
  }

  return {
    modal,
    openModal,
    setModelOpen: setOpen,
  }
}