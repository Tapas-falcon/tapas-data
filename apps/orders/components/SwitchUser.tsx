import { NumberKeyboard } from '@tapas/ui/NumberKeyboard'
import { useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import { Avatar, Box, Button, List, ListItem, ListItemContent, ListItemDecorator, Typography } from '@mui/joy';
import AvatarGroup from '@mui/joy/AvatarGroup';
import { ImageButton } from '@tapas/ui/TableCard';
import { CheckIcon, ExpandMoreIcon } from '@tapas/ui/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { usersState } from '@/state/atoms';
import clsx from 'clsx';
import { User } from '@/state/type';
import { on } from 'events';

export type openModalParams = {
    initialVal?: string,
    onCancel?: () => void,
    onSwitched?: (users: User[]) => void,
}

export default function SwitchUser() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [invalidText, setInvalidText] = useState<string | undefined>();
    const [step, setStep] = useState<'pwd' | 'user'>('pwd');
    const [users, setUsers] = useRecoilState(usersState);
    const [tempUsers, setTempUsers] = useState(users);
    const [modalCallback, setmodalCallback] = useState({
        onCancel: () => {},
        onSwitched: (users: User[]) => {},
    });

    useEffect(() => {
        setTempUsers(users)
    }, [users])

    const chooseUser = (user: User) => {
        setTempUsers(tempUsers.map((u) => {
            const selected = u.name === user.name
            return {
                ...u,
                selected,
            }
        }))
        clearPwd()
        setStep('pwd')
    }

    const getTempSelectedUser = () => {
        return tempUsers.find(u => u.selected) ?? tempUsers[0]
    }

    const clearPwd = () => {
        setValue('')
        setInvalidText('')
    }

    const modal = (
        <Modal open={open}
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
                <div
                    className='rounded-full h-14 pl-2 pr-3 py-2 bg-black bg-opacity-5 justify-between items-center inline-flex mb-4'
                    onClick={() => {setStep('user')}}
                >
                    {/* user name */}
                    <div className="h-10 w-[360px] flex items-center justify-start gap-2">
                        <Avatar size="lg" src={getTempSelectedUser()?.photo}>{getTempSelectedUser()?.name}</Avatar>
                        <div className="text-black text-opacity-90 text-base font-bold font-['Bricolage Grotesque']">
                            {getTempSelectedUser()?.email}
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-1'>
                        {/* avatar group */}
                        <AvatarGroup sx={{
                            flexDirection: 'row-reverse',
                            '--Avatar-ringSize': '1px',
                            "--AvatarGroup-gap": "-20px",
                        }}>
                            {/* mui avatars */}
                            {[...tempUsers].sort((a, b) => a.selected ? -1 : 1).slice(0,3).reverse().map((user) => (
                                <Avatar key={user.name} size="sm" src={user.photo}>{user.name}</Avatar>
                            ))}
                        </AvatarGroup>
                        {/* expand more */}
                        <ExpandMoreIcon size={20} />
                    </div>
                </div>
                {step === 'pwd' && <>
                  <NumberKeyboard
                    displayType='password'
                    value={value}
                    invalidText={invalidText}
                    onChange={(v) => setValue(v)} label={'password'} />
                  <Box className="flex flex-col gap-2 mt-4">
                    <Button
                      disabled={value.length < 6}
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
                </>}
                {step === 'user' && <Box className="border-solid border-0 border-t border-neutral-200">
                  <List
                    sx={{
                      "--List-gap": "16px",
                      "& li:hover": {
                        backgroundColor: "var(--joy-palette-neutral-120)",
                      },
                      "& li.selected": {
                        backgroundColor: "var(--joy-palette-neutral-120)",
                      }
                    }}
                  >
                    {tempUsers.map((user) => <ListItem
                      key={user.name}
                      className={clsx({'selected': user.selected})}
                      sx={{
                        borderRadius: "100px",
                        cursor: "pointer",
                        "--ListItem-paddingY": "0.5rem",
                      }}
                      onClick={() => chooseUser(user)}
                    >
                      <ListItemDecorator
                        sx={{
                        //   marginInlineEnd: "24px"
                        }}
                      >
                        <Avatar src={user.photo} size="sm" />
                      </ListItemDecorator>
                      <ListItemContent>
                        <Typography level="title-md">{user.email}</Typography>
                      </ListItemContent>
                      {user.selected && <ListItemDecorator
                        sx={{ color: 'var(--joy-palette-accent-500)' }}
                      ><CheckIcon /></ListItemDecorator>}
                    </ListItem>)}
                  </List>
                </Box>}
            </ModalDialog>

        </Modal>
    )

    const onSwitchLogin = () => {
        // mock the login process
        if (value !== '000000') {
            setInvalidText('Incorrect password, please try again')
            return
        }

        modalCallback?.onSwitched(tempUsers)
        closeModal()
    };
    const onCancel = () => {
        modalCallback?.onCancel()
        // reset users
        setTempUsers(users)
        
        closeModal()
    }

    const closeModal = () => {
        clearPwd()
        setOpen(false)
    };

    const openModal = ({
        initialVal='',
        onCancel=()=>{},
        onSwitched=()=>{},
    }: openModalParams) => {
        setValue(initialVal);
        setmodalCallback({onCancel, onSwitched});
        setOpen(true);
    };

    return {
        modal,
        openModal,
        closeModal,
        setModelOpen: setOpen,
    }
}