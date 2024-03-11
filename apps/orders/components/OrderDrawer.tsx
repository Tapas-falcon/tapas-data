import { Box, DialogContent, Drawer, ModalClose, Typography } from "@mui/joy";
import { CelebrationIcon } from "@tapas/ui/icons";
import { useResponsive } from "ahooks/lib";
import { ReactNode, useEffect, useState } from "react";

type Props = { 
  className?: string,
  open: boolean,
  title: string,
  secondaryTopRight?: ReactNode,
  summary?: ReactNode,
  children: ReactNode,
  detail?: ReactNode,
  promoMessage?: string,
  bottom: ReactNode,
  onClose: () => void,
}

export default function OrderDrawer({
  open,
  title,
  secondaryTopRight,
  summary,
  children,
  detail,
  promoMessage,
  bottom,
  onClose,
}: Props) {
  const [drawerOpen, setDrawerOpen] = useState(open)
  const responsive = useResponsive()

  useEffect(() => {
    setDrawerOpen(open)
  }, [open])

  return (
    <Drawer
      size="md"
      anchor={responsive?.['md'] ? 'right' : 'bottom'}
      open={drawerOpen}
      sx={{
        '--Drawer-horizontalSize': 'clamp(300px, 40%, 100%)',
        '--Drawer-verticalSize': 'clamp(400px, 80%, 100%)',
        '--ModalClose-inset': '0.8rem',
      }}
      onClose={() => {
        setDrawerOpen(false)
        onClose()
      }}
    >
      <ModalClose sx={{'--IconButton-size': '2.25rem'}} />
      <Box className="flex justify-between py-3 pl-4 pr-12">
        <Typography level='h3'>{title}</Typography>
        {secondaryTopRight}
      </Box>
      <Box className="flex justify-between px-4 py-3 border-solid border-0 border-y border-black border-opacity-10">
        {summary}
      </Box>
      <DialogContent>
        {children}
      </DialogContent>
      {detail && <Box>
          {detail}
        </Box>}
      {promoMessage && <Box
          className="flex gap-2 h-7 px-4 py-1 bg-orange-600 text-white"
          sx={{
            '& svg': { fontSize: '1rem' },
          }}
        >
          <CelebrationIcon size={18} />
          <Typography level='title-sm' textColor="rgba(255, 255, 255, 1)">
            {promoMessage}
          </Typography>
        </Box>}
      <Box className="px-4 py-6 border-solid border-0 border-t border-black border-opacity-10 text-center">
        {bottom}
      </Box>
    </Drawer>
  )
}