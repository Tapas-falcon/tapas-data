import { Button as JoyButton, ButtonProps} from '@mui/joy';

export interface Props {
    text: string,
    subText?: string,
    visible?: boolean,
}

export type IDialButtonProps = Props & ButtonProps;

export const DialButton: React.FC<IDialButtonProps> = function({
    text,
    subText,
    visible=true,
    children=[],
    sx={},
    className='',
    variant='soft',
    ...props
}) {
    return <JoyButton {...props} className={'w-16 h-16 box-border flex justify-center items-center ' + className} variant={variant} sx={{
        '--variant-softBg': 'rgba(0, 0, 0, 0.08)',
        '--variant-softColor': 'rgba(0, 0, 0, 0.87)',
        '--Button-radius': '50%',
        '--variant-softHoverBg': 'rgba(0, 0, 0, 0.12)',
        '--variant-softActiveBg': 'rgba(0, 0, 0, 0.16)',
        visibility: visible ? 'visible' : 'hidden',
        ...sx
    }}>{text} {children}</JoyButton>;
};