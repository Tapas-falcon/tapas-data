import React, {Component, useEffect, useRef, useState} from "react";
import IconClearAll from "../icons/ClearAll";
import { IDialKeyboardProps } from ".";
import { Typography } from "@mui/joy";

export type IKeyboardDisplayBox = IDialKeyboardProps & {
    label: string, 
    background?: string,
    type?: 'display'|'input',
    visible?: boolean,
    className?: string,
    displayType?: 'text'|'password',
    invalidText?: string,
    isInputing?:boolean,
    onClick?(self:KeyboardDisplayBox):void;

};

export class KeyboardDisplayBox extends Component<IKeyboardDisplayBox>{
    state = {
        value: this.props.value,
        isInputing:false
    };
    inputRef:any;
    constructor(props:IKeyboardDisplayBox) {
        super(props);
    }

    componentDidUpdate(prevProps:IKeyboardDisplayBox) {
        if (prevProps.value !== this.props.value) {
            this.onChange(this.props.value);
        }
    }
    isInputing(isInputing?:boolean){
        if(arguments.length){
            this.setState({isInputing})
        }
        return this.state.isInputing;
    }

    onDisplayBoxClick  () {
        let {
            type='display',
          onClick
        }=this.props;
        this.isInputing(true);
        if (type === 'input') {
            this.inputRef?.focus();
        }
        onClick&&onClick(this);
    };
    onChange(value:string){
        let {
            onChange
        }=this.props;
        this.setState({value});
        onChange&&onChange(value);
    }
    render() {

        /*
todo 这块暂未实现 不知道具体作用
useEffect(() => {
    if (type === 'input') {
        inputRef.current?.focus();
    }
    if (value) {
        setIsInputing(true);
        return;
    }
    setIsInputing(false);
}, [value]);*/
        let {
            label,
            type='display',
            visible=true,
            className='',
            displayType='text',
            invalidText
        }=this.props;
        let {isInputing,value}=this.state;
        if (!visible) {
            return <></>
        }
        return (
          <div
            className={`relative w-full min-w-[168px] box-border h-10 pl-4 pr-3 py-2.5 rounded-xl border-solid border-2 ${invalidText?'border-rose-500':'border-black'} border-opacity-90 justify-start items-center gap-3 inline-flex ${className}`}
            onClick={this.onDisplayBoxClick.bind(this)}
          >
              {/* lable */}
              <div
                className={`absolute h-[17px] flex items-center left-4 ${(!!value || isInputing) ? 'top-[-0.7rem]' : 'top-2.5'} bg-white ${invalidText?"text-rose-500":"text-black"} transition-all`}
              >{label}</div>
              {/* number */}
              <div className="h-[17px] w-full box-border justify-start items-center gap-px flex text-black text-opacity-90 text-sm font-normal font-['Bricolage Grotesque']">
                  <div className="h-full flex justify-start flex-1 relative">
                      {displayType === 'password' ? new Array(value.length).fill('*').join('') : value}
                      {/* orange cursor */}
                      {isInputing &&
                        <div className="h-full w-px bg-orange-600 animate__flash animate__animated animate__infinite  animate__slow"></div>}
                      {type === 'input' &&
                        <input ref={ref=>this.inputRef=ref as HTMLInputElement} className="absolute top-0 left-0 text-transparent bg-transparent border-none focus-visible:outline-none" type="text" value={value} onChange={(e) => this.onChange(e.target.value)}/>}
                  </div>
                  {value && <IconClearAll size={20} color="rgba(0,0,0,0.54)" onClick={() => this.onChange('')}/>}
              </div>
              {invalidText && <Typography
                level="body-md"
                className="text-rose-500 absolute -bottom-6"
              >{invalidText}</Typography>}
          </div>
        );
    }
}


