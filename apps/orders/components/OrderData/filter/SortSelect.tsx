import React, {useEffect, useRef, useState} from "react";
import {ISelectProps, Select} from "@tapas/ui/Select";
import {SortNeedFxType, SortOptions} from "@/components/OrderData/data/FilterData";
import {SortSelectProps} from "@/components/OrderData/filter/types";
import {useRecoilState, useRecoilValue} from "recoil";
import {orderDataParamsState} from "@/state/order/order.atoms";
import FxModal from "@/components/OrderData/modal/FxModal";
import {DEFAULT} from "@/define";
import BaseModal from "@/components/base/BaseModal";
import {OpenResult} from "@/utils/types";
import {BaseModalProps} from "@/components/base/types";
import {FxModalProps} from "@/components/OrderData/type";

export const SortSelect:React.FC<SortSelectProps>=(props)=>{
  let {onChange,fx,onFxChange=(value:string)=>{}}=props;
  let needFxs=SortNeedFxType;
  const [changeArgs,setChangeArgs] = useState({value:null,event:null});
  const modalRef=useRef<BaseModal>(null);
  const getModalProps=(event:any,value:string):BaseModalProps<FxModalProps>=>{
    return {
      modalRef:modalRef,
      childrenProps:{
        onChange(value:string){
          onFxChange(value);
        }
      },
      onOk(self: BaseModal): Promise<boolean> | boolean | void {
        onChange(event,value);
      },
      onCancel(self: BaseModal): Promise<boolean> | boolean | void {
        onFxChange(DEFAULT);
      },
    };
  }

  //需要每次组件刷新的时候 也刷新props 或者有其他类似办法做到
  const _onChange:SortSelectProps['onChange']=(event, value)=>{
    setChangeArgs({event ,value});
    if(fx===DEFAULT&&needFxs.includes(value)){
      //弹出 如果弹出之后更新的数据 onchange是没有办法获取到最新的数据 已经通过hookUpdate的方式解决
      modalRef.current.show();
    }else {
      onChange(event,value);
    }
  }
  return (
    <>
      <Select items={SortOptions} {...props} onChange={_onChange}/>
      <FxModal {...getModalProps(changeArgs.event,changeArgs.value)}/>
    </>
  )
}
