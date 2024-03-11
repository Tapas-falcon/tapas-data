import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';

import {KeyboardDisplayBox, NumberKeyboard} from '@tapas/ui/NumberKeyboard'
import { DiversityIcon } from '@tapas/ui/icons';
import React, { useState } from 'react';
import {Box, Button, Radio, RadioGroup} from '@mui/joy';
type ModalDialogCloseCallback = (state:number) => void;

let valueState:any=null;

export default function InfoDepositDialog() {
  const [open, setOpen] = useState(false);


  const [modalCallback, setmodalCallback] = useState({
    onClose: (state:number) => { },
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
        gap: 0,
        width: '45rem',
        height:"34rem"
      }}
    >
      <Box className={` infoDepositDialog`}>
        <DialogTitle className="text-black text-opacity-90 text-base font-bold font-['Bricolage Grotesque'] mb-4 flex items-center">
          Cash Withdrawal / deposit
        </DialogTitle>
        <Box className={`flex row justify-between `}>
          <div>1</div>
          <div>2</div>
        </Box>
        <DialogTitle className="text-black text-opacity-90 text-base font-bold font-['Bricolage Grotesque'] mb-4 flex items-center">
          Reason
        </DialogTitle>
        <RadioGroup defaultValue="outlined" name="radio-buttons-group">
          <Radio value="A" label="Break a bill" variant="outlined" className={`radio-item h-6`}/>
          <Radio value="B" label="Buy materials" variant="outlined" className={`radio-item h-6`} />
          <Radio value="C" label="Store operating expenses" variant="outlined" className={`radio-item h-6`}/>
          <Radio value="D" label="Change" variant="outlined" className={`radio-item h-6`}/>
          <Radio value="E" label="Others" variant="outlined" className={`radio-item h-6`}/>
        </RadioGroup>

        <Box className={`footer-dialog flex row justify-end items-center`}>
          <Button
            variant="plain"
            color="neutral"
            className='rounded-[360px] h-12'
            onClick={() => onDialogClose(0)}
          >Close</Button>
        </Box>
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
    setmodalCallback({onClose, onCancel});
    setOpen(true);
  };

  const onDialogClose: ModalDialogCloseCallback = (state) => {
    modalCallback.onClose(state);
  }

  return {
    modal,
    openModal,
    setModelOpen: setOpen,
  }
}
