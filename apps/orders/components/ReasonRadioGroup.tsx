import {useRecoilValue} from "recoil";
import {getWithdrawQueryTypesOptions} from "@/state/withdraw/withdraw.selectors";
import React, {useState} from "react";
import {Radio, RadioGroup} from "@mui/joy";
export interface ReasonRadioGroupProps{
  value:string;
  disabled?:boolean;
  onChange?(value:string):void;
}
export const ReasonRadioGroup:React.FC<ReasonRadioGroupProps>=({value='default', onChange=(value:string)=>{},disabled=false}) => {
  const types = useRecoilValue(getWithdrawQueryTypesOptions({}));
  let [reason,setReason]=useState<string>(value);
  let reasonChange=(event:any)=>{
    setReason(event.target.value);
    onChange(event.target.value);
    //setReason(reason);
  };
  return (
    <RadioGroup  value={reason}  onChange={(event)=>reasonChange(event)} name="radio-buttons-group">
      {
        types.map(t=>(<Radio value={t.key} label={t.text} key={t.key} disabled={disabled} variant="outlined" className={`radio-item h-6`}/>))
      }
    </RadioGroup>
  )
}
