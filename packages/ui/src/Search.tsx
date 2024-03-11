import { Input, InputProps } from "@mui/joy"
import { ChangeEvent, useState } from "react"
import clsx from 'clsx'

import { ClearAllIcon, SearchIcon } from "./icons"

export default function Search({ className, value = '' }: InputProps) {
  const [searchText, setSearchText] = useState(value)
  const [hideClear, setHideClear] = useState(true)
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)
    if (value && hideClear) {
      setHideClear(false)
    }
  }
  const handleFocus = () => {
    if (searchText) {
      setHideClear(false)
    }
  }
  const handleBlur = () => {
    setTimeout(() => setHideClear(true), 200)
  }
  const handleClear = () => {
    setSearchText('');
  }

  return (
    <Input
      variant="soft"
      className={className}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={searchText}
      sx={{
        '--Input-radius': '22.5rem',
        '--Input-focusedThickness': '0',
        '& input': {
          width: '5.75rem',
        },
      }}
      placeholder="Search"
      startDecorator={<SearchIcon />}
      endDecorator={(<ClearAllIcon
        className={clsx({'invisible': hideClear})}
        onClick={handleClear}
      />)}
    />
  )
}
