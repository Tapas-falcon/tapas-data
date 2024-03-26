import React, {useEffect, useRef, useState} from "react";
import {FxModalProps} from "@/components/OrderData/type";
import {BaseModalProps} from "@/components/base/types";
import BaseModal from "@/components/base/BaseModal";
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import {FormControl, FormLabel, RadioGroup} from "@mui/joy";
import {FxOptionsData} from "@/components/OrderData/data/FilterData";
import {DEFAULT} from "@/define";

export const FxModalChildren:React.FC<FxModalProps>=(props)=>{
  let {value=null,onChange=(value)=>{},modal}=props;
  const _onChange=(value:string)=>{
    modal.setOkDisabled(!value);
    onChange(value);
  }
  useEffect(() => {
    modal.setOkDisabled(!value);
  }, []);
  return (
    <Box className={`w-[30rem] h-48`}>
      <h1 className={`m-0 text-base`}>To continue, please select a function f(x) type first</h1>
      <div className="w-full mt-4">
        <FormControl>
          <RadioGroup  defaultValue={value} onChange={(ev)=>_onChange(ev.target.value)} name="radio-buttons-group">
            {
              FxOptionsData.filter(item=>item.key!==DEFAULT).map(item=>(
                <div  key={item.key}  className={`w-full h-10 flex items-center`}><Radio value={item.key} className={`m-0`} label={item.desc2} size="sm" /></div>
              ))
            }
          </RadioGroup>
        </FormControl>
      </div>
    </Box>
  );
}
export const FxModal=(props:BaseModalProps<FxModalProps>={})=>{

  let modalProps={
    children:FxModalChildren,
    textOk:"Done",
    textCancel:"Close",
    ref:props.modalRef,
    ...props
  };
  return <BaseModal {...modalProps}/>
}
export default FxModal;
