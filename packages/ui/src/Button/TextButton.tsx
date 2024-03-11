import { ButtonProps, Button as JoyButton} from '@mui/joy';
import React from 'react';

export interface IAdditionalTextButtonProps {
    text: string,
}

export type ITextButtonProps = IAdditionalTextButtonProps & ButtonProps;

export const TextButton: React.FC<ITextButtonProps> = function Button({
    text,
    ...props
}) {

  return <JoyButton {...props} variant='plain' sx={{
    '--variant-plainColor': 'rgba(0, 0, 0, 0.87)',
    '--Button-radius': '22.5rem',
    '--variant-plainHoverBg': 'rgba(0, 0, 0, 0.08)',
  }}>{text}</JoyButton>;
}
