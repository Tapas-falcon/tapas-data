import { Chip, Box, Typography } from "@mui/joy"
import { CelebrationIcon } from "@tapas/ui/icons"

type Props = { 
  className?: string,
  text: string,
  secondaryText?: string,
}

export default function ActionBar({text, secondaryText}: Props) {
  return (
    <Chip
      className="flex w-full max-w-none top-6 z-10 rounded-tl-xl rounded-tr-xl rounded-b-none"
      variant="solid"
      color="accent"
      sx={{
        '--Chip-paddingInline': 0,
      }}
    >
      <Box className="flex justify-between pt-2 pb-7 px-6">
        <Box className="flex gap-2">
          <CelebrationIcon size={18} />
          <Typography color="accent" level='title-sm'>
            {text}
          </Typography>
        </Box>
        <Typography level='body-sm' textColor="accent.80">
          {secondaryText}
        </Typography>
      </Box>
    </Chip>
  )
}