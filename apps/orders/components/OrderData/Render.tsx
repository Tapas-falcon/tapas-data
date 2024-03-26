import {IOrderListTablePropsColumns} from "@/components/OrderListTable";
import Tooltip from '@mui/joy/Tooltip';
import Card from '@mui/joy/Card';
import React from "react";
import {CardDataProps} from "@/components/OrderData/type";
import {Divider} from "@mui/joy";

export const CardData:React.FC<CardDataProps>=({list=[]})=>{
  return (
    <div className={`w-32`}>
      {
        list.map((item,index)=>{
          if(item.name==='line')return <Divider inset="none"  key={index} className={`mt-2 mb-2`} />;
          return (
            <div className="flex flex-row justify-between" key={index}>
              <span className={`text-neutral-540`}>{item.name}</span>
              <span>{Number(item.value).toFixed(2)}</span>
            </div>
          );
        })
      }
    </div>
  );
}
export const renderSumDetailsItem:IOrderListTablePropsColumns['renderItem']=(colKey, current, item)=>{
  return (
    <Tooltip variant="plain" disableHoverListener={!+current?.value} title={<CardData list={current?.details||[]}/>} sx={{padding:"0.75rem","--joy-palette-background-surface":"var(--joy-palette-common-white)"}}>
      <span className={`cursor-pointer`}>{(Number(current?.value||0).toFixed(2))}</span>
    </Tooltip>
  );
}
