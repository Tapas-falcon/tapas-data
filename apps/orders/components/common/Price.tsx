import React from "react";
import {PriceProps} from "@/components/common/type";

export const Price:React.FC<PriceProps>=({price,unit="€"})=>{
  return (
    <span className={`text-xs text-neutral-500`}>
      {unit}&nbsp;<span dangerouslySetInnerHTML={{__html:price.toFixed(2).toString().replace(/^(\d+)/,(match,num)=>{
        return `<span class="text-base">${num}</span>`
      })}}></span>
    </span>
  );
}
