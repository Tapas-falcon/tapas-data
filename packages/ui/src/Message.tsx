import { useCallback } from "react";
import { Alert, Box, Button, Stack, Typography } from "@mui/joy";

import { CheckCircleIcon, DrawerOpenIcon, ErrorIcon, WarningIcon } from "./icons";
import { Root, createRoot } from "react-dom/client";

type MessageType = 'success' | 'fail' | 'warn' | 'info'
export interface MessageOption {
  // show?: boolean;
  title: string;
  type?: MessageType;
  desc?: string;
  position?: 'top-left' | 'top-center' | 'top-right';
  hasView?: boolean;
  duration?: number;
  actionText?: string;
  onAction?: () => void;
}

const list: MessageOption[] = []
const timers: number[] = []
let containerRoot: Root;

const createContainerDom = () => {
  if (containerRoot) {
    return containerRoot
  }

  const div = document.createElement("div");
  document.body.appendChild(div);
  const root = createRoot(div);

  return root;
}

const addMsg = (msg: MessageOption) => {
  list.push(msg)
  renderMessage()
}

const removeMsg = (order: number) => {
  list.splice(order, 1)

  clearTimeout(timers[order])
  timers.splice(order, 1)

  renderMessage()
}

const renderMessage = () => {
  containerRoot = createContainerDom()
  containerRoot.render(<MessageContainer />)
}

const notice = (msg: MessageOption) => {
  addMsg(msg)
  const timer = window?.setTimeout(() => removeMsg(0), msg.duration ?? 3000)
  timers.push(timer)
}

function MessageIcon({type = ''}) {
  switch(type) {
    case 'info':
      return <DrawerOpenIcon color="var(--joy-palette-success-500)" size={32}/>
    case 'warn':
      return <WarningIcon color="var(--joy-palette-warning-500)" size={32}/>
    case 'fail':
      return <ErrorIcon color="var(--joy-palette-danger-500)" size={32}/>
    case 'success':
    default:
      return <CheckCircleIcon color="var(--joy-palette-success-500)" size={32}/>
  }
}

export function Message(option: MessageOption & {id: number}) {
  const close = (idx: number) => {
    removeMsg(idx)
  }

  return (
    <Alert
      variant='solid'
      color='neutral'
      className="shadow-md"
      sx={{
        '--Icon-fontSize': '1.5rem',
      }}
      invertedColors
      startDecorator={<MessageIcon type={option.type} />}
      endDecorator={
        option.actionText && <Button variant='plain' onClick={() => {
          option.onAction?.()
          close(option.id)
        }}>{option.actionText}</Button>
      }
    >
      <Box className="flex flex-col">
        <Typography level="title-sm">{option.title}</Typography>
        {option.desc && <Typography level="body-xs">
            {option.desc}
          </Typography>}
      </Box>
    </Alert>
  )
}

export function MessageContainer() {
  const [first] = list
  const position = first?.position || 'top-right'

  const getPosition = useCallback(() => {
    switch(position) {
      case 'top-left':
        return 'top-6 left-6'
      case 'top-center':
        return 'top-6 left-0 right-0 mx-auto'
      case 'top-right':
      default:
        return 'top-6 right-6'
    }
  }, [position])

  return (
    <Stack
      spacing={1}
      className={`fixed z-[1500] max-w-sm ${getPosition()}`}
    >
      {list.map((msg, i) => <Message key={i} id={i} {...msg}></Message>)}
    </Stack>
  )
}

const MessageService = {
  info: (msg: MessageOption) => {
    notice({
      ...msg,
      type: 'info',
    })
  },
  warn: (msg: MessageOption) => {
    notice({
      ...msg,
      type: 'warn',
    })
  },
  fail: (msg: MessageOption) => {
    notice({
      ...msg,
      type: 'fail',
    })
  },
  success: (msg: MessageOption) => {
    notice({
      ...msg,
      type: 'success',
    })
  },
}
export default MessageService
