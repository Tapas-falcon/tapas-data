import React from 'react';
import { KeyboardDisplayBox } from './KeyboardDisplayBox';
import {DialKeyboard, DialKeyboardType, IDialKeyboardProps} from './DialKeyboard';

export type NumberKeyboardProps = IDialKeyboardProps & {
    label: string, 
    inputClassName?: string, 
    keyboardClassName?: string, 
    displayType?: 'text'|'password',
    invalidText?: string,
    inputVisible?:boolean
};

export const NumberKeyboard: React.FC<NumberKeyboardProps> = function({
    value,
    label,
    keyboard,
    backAsButton,
    onChange,
    inputClassName='',
    keyboardClassName='',
    displayType='text',
    invalidText,
    inputVisible=true,
    keyboardType=DialKeyboardType.Text

}) {
    return (<>
          {inputVisible&&(
            <KeyboardDisplayBox
              displayType={displayType}
              className={inputClassName}
              value={value}
              label={label}
              invalidText={invalidText}
              onChange={onChange}
            />
          )}
        <div className={'flex justify-center pt-10'}>
            <DialKeyboard className={keyboardClassName} value={value} keyboard={keyboard} backAsButton={backAsButton} onChange={onChange} keyboardType={keyboardType}  />
        </div>
    </> 
    )
}
