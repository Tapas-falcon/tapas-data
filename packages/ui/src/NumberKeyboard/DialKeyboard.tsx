import { DialButton } from "./DialButton";
import IconBackspace from '../icons/Backspace';
import React, {Component, useState} from "react";

export enum DialKeyboardType{
    Text,
    Number
}
export interface IDialKeyboardProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
    value: string;
    keyboard?: string;
    backAsButton?: boolean;
    className?: string;
    keyboardType?:DialKeyboardType;
    onChange: (value: string) => void;
}
export class DialKeyboard extends Component<IDialKeyboardProps>{
    state = {
        value: this.props.value
    };

    componentDidUpdate(prevProps:IDialKeyboardProps) {
        if (prevProps.value !== this.props.value) {
            this.onChange(this.props.value );
        }
    }
    handleNumberClick(val: string){
        let {keyboardType=DialKeyboardType.Text}=this.props;
        let nstr = (this.state.value||"").toString();
        if (val === '.' && nstr.includes('.')) {
            return;
        }
        let v = nstr + val;

        if(keyboardType===DialKeyboardType.Number){
            if(v!=='0.'&&Number(v)===0) {
                v=val;
            }
            v=v.replace(/^0+/,'0');
            if(Number(v)>=1){
                v=v.replace(/^0+/,"");
            }
        }

        this.onChange(v);
    }
    onChange(value:string){
        this.setState({value});
        let {onChange}=this.props;
        onChange&&onChange(value);
    }
    handleBackspaceClick (){
        if (!this.state.value) {
            this.onChange('');
            return;
        }
        let v=this.state.value.toString().slice(0, -1);
        this.onChange(v);
    };
    render() {
        let {
            keyboard = '1,2,3,4,5,6,7,8,9,_,0',
            backAsButton = false,
            className = ""
        }=this.props;
        return (
          <div className={`w-[15rem] grid grid-cols-3 gap-6 justify-center items-center justify-items-center ${className}`}>
              {/* button 1-9 */}
              {keyboard.split(',').map((number, index) =>
                <DialButton key={index} text={number} visible={number !== '_'} onClick={() => this.handleNumberClick(number)}/>)}
              {/* backspace */}
              {backAsButton ? <DialButton text="" onClick={this.handleBackspaceClick.bind(this)}><IconBackspace/></DialButton> :
                <IconBackspace onClick={this.handleBackspaceClick.bind(this)}/>}
          </div>
        );
    }
}
