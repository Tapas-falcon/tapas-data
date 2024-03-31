import React, {useEffect, useRef, useState} from "react";
import {DatePickerFilterProps} from "@/components/OrderData/filter/types";
import {DropDownMenu} from "@/components/DropDownMenu";
import {Select} from "@tapas/ui/Select";
import {DatePicker, TabsValues} from "@tapas/ui/DatePicker";
import {CheckIcon} from "@tapas/ui/icons"
import {useRecoilState} from "recoil";
import {orderDataParamsState} from "@/state/order/order.atoms";
import {isValid} from "date-fns";
import moment from "moment";
import {CUSTOM, DEFAULT, MOMENTFORMAT1} from "@/define";

export const DatePickerFilter:React.FC<DatePickerFilterProps>=(props)=>{
  const {options=[],value=DEFAULT,onChange=(value)=>{},datePickerProps={}}=props;
  const [orderDataParams,setOrderDataParams]=useRecoilState(orderDataParamsState);
  const [isSelect,setIsSelect]=useState(true);
  const [dateType,setDateType]=useState('default');
  const [text,setText]=useState('Anytime');
  const dropDownRef=useRef<any>({});
  const onSelect=(value:any)=>{
    setDateType(value);
    if(value==='custom'){
      setIsSelect(false);
      onChange([]);
      setTimeout(e=>{
        dropDownRef.current?.setOpen(true);
      },100);
    }else {
      setIsSelect(true);
      onChange(value);
    }
  }
  useEffect(() => {
    let text='Anytime'
    if(Array.isArray(value)&&value.some(v=>!!v)){
      text=`${moment(value[0]).format(MOMENTFORMAT1)}~${moment(value[1]).format(MOMENTFORMAT1)}`;
    }
    setText(text);
  }, [value]);
  if(isSelect){
    return <Select items={options} value={(Array.isArray(value)?DEFAULT:value) as string} onChange={(e,value)=>onSelect(value)}/>;
  }
  return (
    <DropDownMenu text={text} api={dropDownRef}>
      <div className={`w-[32rem] h-[28.5rem] flex flex-row`}>
        <div className="w-[9rem] h-full border-r border-gray-200 border-solid">
          {
            options.map(item=>{
              let checked=dateType===item.key;
              return (
                <div className={`w-full flex flex-row items-center p-4 text-sm hover:bg-gray-50 cursor-pointer ${checked?'bg-gray-50':''}`} onClick={e=>{
                  onSelect(item.key as string);
                  setTimeout(e=>{
                    dropDownRef.current?.setOpen(false);
                  },100);
                }} key={item.key}>
                  <span className={`pr-2`}>{item.text}</span><CheckIcon size={14} color='#F55523' className={`${checked?'':'hidden'}`}/>
                </div>
              );
            })
          }
        </div>
        <div className={`w-[23rem] h-full  pb-4`}>
          <DatePicker
            className={`w-full`}
            mode="range"
            customRange
            rangeValue={Array.isArray(value)?value:[]}
            doneFn={(dates)=>{
              if(datePickerProps.mode==='range'){
                dates=(dates as string[]).filter(date=>isValid(new Date(date))).map(date=>moment(date).format("YYYY-MM-DD")) as string[];
              }else {
                onChange(dates as TabsValues);
              }
            }}
            clearFn={()=>{
              onChange([]);
            }}
            {...datePickerProps}
          />
        </div>
      </div>
    </DropDownMenu>
  );
}
