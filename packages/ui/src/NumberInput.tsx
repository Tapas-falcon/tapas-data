import { IconButton, Input } from "@mui/joy"
import { useEffect, useState } from "react"

import { AddIcon, RemoveIcon } from "./icons"

type Props = {
  className?: string,
  value: number,
  onChange: (v: number) => void,
}

export default function NumberInput({ className, onChange, value = 0 }: Props) {
  const [curQuantity, setCurQuantity] = useState(value)
  
  useEffect(() => {
    setCurQuantity(value)
  }, [value])

  const handleChange = (v: number) => {
    setCurQuantity(v)
    onChange(v)
  }

  return (
    <Input
      className={`rounded-xl ${className}`}
      value={curQuantity}
      variant="soft"
      sx={{
        '--Input-focused': 0,
        width: 136,
        '& input': { textAlign: 'center' },
      }}
      onChange={(e) => handleChange(Number(e.target.value))}
      startDecorator={
        <IconButton
          disabled={curQuantity <= 0}
          variant="plain"
          className="rounded-lg"
          onClick={() => handleChange(curQuantity - 1)}
        >
          <RemoveIcon size={20} />
        </IconButton>
      }
      endDecorator={
        <IconButton
          variant='solid'
          color="neutral"
          className="rounded-lg"
          onClick={() => handleChange(curQuantity + 1)}
        >
          <AddIcon size={20} />
        </IconButton>
      }
    />
  )
}
