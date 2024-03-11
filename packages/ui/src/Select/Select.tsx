import { Select as JoySelect, Option as JoyOption, SelectProps as JoySelectProps} from '@mui/joy';
import React, { useEffect, useState } from 'react';
import IconArrowDropDown from '../icons/ArrowDropDown';
import IconArrowDropUp from '../icons/ArrowDropUp';
import IconCheck from '../icons/Check';
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

export interface ISelectItem {
    key: string|number;
    text: string;
}

export interface IAdditionalSelectProps {
    items: ISelectItem[]|JSX.Element;
}

export type ISelectProps = IAdditionalSelectProps & JoySelectProps<string, false>;

export const Select: React.FC<ISelectProps> = function({
    items,
    onChange=() => {},
    value,

    ...props
}) {
    const [isListOpen, setListOpen] = useState(false);

    const colorStyle = {
        dark: {
            backgroundColor: 'rgba(0, 0, 0, 0.87)',
            textColor: '#FFF',
        },
        light: {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            textColor: 'rgba(0, 0, 0, 0.87)',
        }
    };
    const [colorType, setColorType] = useState<keyof typeof colorStyle>('light');

    // set background color and text color when change state
    useEffect(() => {
        if (isListOpen || value !== 'default') {
            setColorType('dark');
            return;
        }
        setColorType('light');
    }, [isListOpen, value]);

    let itemsFc=(items instanceof Array)?items.map((item) => {
        return <JoyOption key={item.key} value={item.key} className='flex justify-between'>
            {item.text} {value === item.key ? <IconCheck color='#F55523'/> : <div></div>}
        </JoyOption>
    }):items;
    return (
        <JoySelect
            {...props}
            value={value}
            defaultValue="default" variant="plain" indicator={ isListOpen? <IconArrowDropUp color={colorStyle[colorType].textColor}/> : <IconArrowDropDown color={colorStyle[colorType].textColor}/>}
            sx={{
                '--Select-radius': '22.5rem', // radius of select box
                '--variant-plainHoverBg': 'rgba(0, 0, 0, 0.12)', // hover background of select box
                '--joy-palette-background-surface': colorStyle[colorType].backgroundColor, // background of select box
                '--variant-plainColor': colorStyle[colorType].textColor, // text color
                '--variant-plainHoverColor': 'rgba(0, 0, 0, 0.87)', // hover text color
            }}
            slotProps={{
                listbox: {
                    sx: {
                        '--List-radius': '0.75rem', // radius of select-listbox
                        '--variant-plainHoverBg': 'rgba(0, 0, 0, 0.12)', // hover background of select-listbox
                        boxShadow: '0px 12px 40px 0px rgba(0, 0, 0, 0.12), 0px 8px 24px 0px rgba(0, 0, 0, 0.08)', // shadow of select-listbox
                    }
                }
            }}
            onListboxOpenChange={(v) => setListOpen(v)}
            onChange={(e, newVal) => {
                onChange(e, newVal);
            }}
            >
            {itemsFc}
        </JoySelect>
    )
}
