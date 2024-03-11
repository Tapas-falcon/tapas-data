import { useEffect, useState } from "react";

import { Box, Button, DialogContent, FormControl, FormLabel, Input, Modal, ModalDialog, Radio, RadioGroup, Typography } from "@mui/joy";
import { DialKeyboard, KeyboardDisplayBox, NumberKeyboard } from "@tapas/ui/NumberKeyboard";
import { useResponsive } from "ahooks/lib";
import MessageService from "@tapas/ui/Message";
import { useTranslations } from "next-intl";

type Props = { 
  className?: string,
  open: boolean,
  t: ReturnType<typeof useTranslations<string>>,
  onClose: () => void,
  onDrawerOpen?: () => void,
}

export default function CashDrawerModal({
  open,
  t,
  onClose,
  onDrawerOpen,
}: Props) {
  const [show, setShow] = useState(open)
  const [withdraw, setWithdraw] = useState('')
  const [desposit, setDesposit] = useState('')
  const [code, setCode] = useState('')
  const responsive = useResponsive()

  useEffect(() => {
    setShow(open)
  }, [open])

  const closeSelf = () => {
    setShow(false)
    onClose()
  }

  const tryOpenDraw = () => {
    // check input. TODO fake pwd
    if (code !== '123') {
      MessageService.fail({
        title: 'Invalid inout',
        // duration: 600000,
      })
      setCode('')
      return
    }

    onDrawerOpen && onDrawerOpen()
    closeSelf()
  }

  return (
    <Modal
      open={show}
      onClose={closeSelf}
    >
        <ModalDialog 
          layout="center"
          sx={{
            "--Card-padding": 0,
            "--joy-palette-background-surface": "var(--joy-palette-common-white)",
          }}
        >
          <DialogContent>
            <Box className="w-[720px] h-[554px] flex flex-col">
              <Box className="flex flex-grow">
                <Box className="flex flex-grow flex-col p-4">
                  <Typography level="title-lg">{`${t('CashWithdrawal')} / ${t('deposit')}`}</Typography>
                  <Box className="flex gap-1 my-8">
                    <KeyboardDisplayBox
                      className="flex-1"
                      value={withdraw}
                      type="input"
                      label="Withdrawal amount"
                      onChange={(val) => {
                        setWithdraw(val)
                      }}
                    />
                    <KeyboardDisplayBox
                      className="flex-1"
                      value={desposit}
                      type="input"
                      label="Deposit amount"
                      onChange={(val) => {
                        setDesposit(val)
                      }}
                    />
                  </Box>
                  <FormControl>
                    <FormLabel>
                    <Typography level="title-md" fontWeight="bold">{t('SelectReason')}</Typography></FormLabel>
                    <RadioGroup
                      color="neutral"
                      size="sm"
                      defaultValue=""
                      name="radio-buttons-group"
                      sx={{
                        "--RadioGroup-gap": 0,
                        "& .MuiRadio-root": {
                          paddingY: "0.75rem",
                        }
                      }}
                    >
                      <Radio value="Break a bill" label="Break a bill" />
                      <Radio value="Buy materials" label="Buy materials" />
                      <Radio value="Store operating expenses" label="Store operating expenses" />
                      <Radio value="Change" label="Change" />
                      <Radio value="None of the above" label="None of the above" />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box className="flex-grow-0 w-[272px] px-4 py-20 bg-black bg-opacity-5 border-0 border-l border-solid border-black border-opacity-10">
                  <DialKeyboard
                    value={code}
                    onChange={(v) => setCode(v as string)} />
                </Box>
              </Box>
              <Box className="h-16 p-4 border-0 border-t border-solid border-black border-opacity-10 flex justify-end items-center gap-2">
                <Button
                  variant="plain"
                  color="neutral"
                  className="rounded-[360px]"
                  onClick={closeSelf}
                >{t('Cancel')}</Button>
                <Button
                  variant="solid"
                  color="neutral"
                  className="rounded-[100px]"
                  onClick={tryOpenDraw}
                >{t('OpenCashDrawer')}</Button>
              </Box>
            </Box>
          </DialogContent>
        </ModalDialog>
      </Modal>
  )
}