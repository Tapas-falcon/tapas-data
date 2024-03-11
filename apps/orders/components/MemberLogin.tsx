import { NumberKeyboard } from '@tapas/ui/NumberKeyboard'
import { useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Box, Button, Typography } from '@mui/joy';
import { User } from '@/state/type';

const mockMembers = [
  { name: "Ice Liu", photo: "/avatar02.jpg", email: "Bet***.kj@gmail.net", id: '11111111' },
  {
    name: "Spencer Wang",
    photo: "/avatar01.jpg",
    email: "Ada***ysj@outlook.com",
    id: '12345678',
  },
]

export type openModalParams = {
    initialVal?: string,
    onClose?: () => void,
    onCancel?: () => void,
    onSwitched?: (member: User) => void,
}

export default function MemberLogin() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [invalidText, setInvalidText] = useState<string | undefined>();

  const [modalCallback, setmodalCallback] = useState({
    onClose: () => {},
    onCancel: () => {},
    onSwitched: (member: User) => {},
  });

  const clearMId = () => {
    setValue('')
    setInvalidText('')
  }

  const modal = (
    <Modal
      sx={{
        '--spacing-49': '28rem',
      }}
      open={open}
      onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          onCancel();
          return;
        }
        onSwitchLogin();
      }}
    >
        <ModalDialog sx={{
          borderRadius: `var(--radius-radius-rounded, 0.75rem)`,
          background: 'var(--surface-sf-wht, #FFF)',
          '--Card-padding': '1rem',
          display: 'flex',
          flexDirection: 'column',
          height: '37.5rem',
          gap: 0,
          width: 'var(--spacing-49, 24.5rem)'
        }}>
          <Typography level='title-lg'>Membership checkout</Typography>
          <Typography level='body-sm' className="mt-1 mb-4">
            Please enter member’s phone number or ID to continue.
          </Typography>
          <NumberKeyboard
            value={value}
            invalidText={invalidText}
            onChange={(v) => setValue(v)}
            label={'Member ID'} />
          <Box className="flex flex-col gap-2 mt-4">
            <Button
              disabled={value.length < 8}
              variant="solid"
              color="neutral"
              className='rounded-[360px]'
              onClick={() => onSwitchLogin()}
            >Log in</Button>
            <Button
              variant="plain"
              color="neutral"
              className='rounded-[360px]'
              onClick={() => onCancel()}
            >Cancel</Button>
          </Box>
        </ModalDialog>

    </Modal>
  )

  const onSwitchLogin = () => {
    // mock the login process
    const member = mockMembers.find((m) => m.id === value)
    if (!member) {
        setInvalidText('Incorrect ID or it does not exist, please try again')
        return
    }

    modalCallback?.onSwitched(member)
    closeModal()
  };
  const onCancel = () => {
    modalCallback?.onCancel()
    
    closeModal()
  }

  const closeModal = () => {
    clearMId()
    setOpen(false)
  };

  const openModal = ({
      initialVal='',
      onClose=()=>{},
      onCancel=()=>{},
      onSwitched=()=>{},
  }: openModalParams) => {
      setValue(initialVal);
      setmodalCallback({onClose, onCancel, onSwitched});
      setOpen(true);
  };

  return {
    modal,
    openModal,
    closeModal,
    setModelOpen: setOpen,
  }
}