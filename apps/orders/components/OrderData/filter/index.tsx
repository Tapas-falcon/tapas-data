import React, {useEffect, useState} from "react";
import {StoresFilter} from "@/components/OrderData/filter/StoresFilter";
import {DatePickerFilter} from "@/components/OrderData/filter/DatePickerFilter";
import {
  DatePickerFiltersDailyViewOptions,
  DatePickerFiltersTimeOptions, FxOptions, SortNeedFxType, SortOptions
} from "@/components/OrderData/data/FilterData";
import {Select} from "@tapas/ui/Select";
import {orderDataParamsState} from "@/state/order/order.atoms";
import {useRecoilState} from "recoil";
import {SortSelect} from "@/components/OrderData/filter/SortSelect";
import {DEFAULT} from "@/define";

export const RetailAnalyticsFilter:React.FC<any>=()=>{
  const [orderDataParams,setOrderDataParams]=useRecoilState(orderDataParamsState);
  return (
    <>
      <StoresFilter value={orderDataParams.stores||[]} onChange={stores=>setOrderDataParams({...orderDataParams,stores})}/>
      <DatePickerFilter options={DatePickerFiltersTimeOptions} value={orderDataParams.dateRadius||DEFAULT} onChange={dateRadius=>setOrderDataParams({...orderDataParams,dateRadius})}/>
      <DatePickerFilter datePickerProps={{mode:'tabs'}} options={DatePickerFiltersDailyViewOptions} value={orderDataParams.dateRadiusView||DEFAULT} onChange={dateRadiusView=>setOrderDataParams({...orderDataParams,dateRadiusView})}/>
      <SortSelect value={orderDataParams.sort||DEFAULT} fx={orderDataParams.fx||DEFAULT} onFxChange={fx=>{setOrderDataParams({...orderDataParams,fx})}} onChange={(e,sort)=>setOrderDataParams({...orderDataParams,sort})}/>
      <Select items={FxOptions} value={orderDataParams.fx||DEFAULT}  onChange={(e,fx)=>setOrderDataParams({...orderDataParams,fx,sort:fx===DEFAULT&&SortNeedFxType.includes(orderDataParams.sort)?DEFAULT&&DEFAULT:orderDataParams.sort})}/>
    </>
  )
}
