import {IOrderListTablePropsColumns} from "@/components/OrderListTable";
import Tooltip from '@mui/joy/Tooltip';
import Card from '@mui/joy/Card';
import React from "react";
import {CardDataProps, DateRadiusViewValue} from "@/components/OrderData/type";
import {Divider, Typography} from "@mui/joy";
import {priceFormat} from "@/utils";
import {useRecoilState} from "recoil";
import {orderDataParamsState} from "@/state/order/order.atoms";
import moment from "moment";
import {MOMENTFORMAT1, MOMENTFORMAT2, MOMENTFORMAT3} from "@/define";
import {isOrders} from "@/components/OrderData/data/FilterData";

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
export const renderSumDetailsItem=(colKey:string, current:any, item:any,page:string)=> {
  const _isOrders=isOrders(page);
  let value=priceFormat(current?.value,'');
  if(_isOrders){
    value=Number(current?.value).toString();
  }

  if (!current?.details || [].length) return <span >{value}</span>;
  return (
    <Tooltip variant="plain" disableHoverListener={!+current?.value} title={
      <CardData list={current?.details || []}/>} sx={{
      padding: "0.75rem",
      "--joy-palette-background-surface": "var(--joy-palette-common-white)"
    }}>
      <span className={`cursor-pointer`}>{value}</span>
    </Tooltip>
  );
}
export const renderDetailsModalItem = (colKey: string, value: number, item: any) => {
  if(['value','sum','mean'].includes(colKey)){
    return (['orders'].includes(item.type)?value:priceFormat(value)).toString();
  }
  return  (value||'0').toString();
};
export const renderPriceItem=(colKey:string, value:number, item:any)=>{
  return priceFormat(value,item.unit||'').toString();
};

export const renderDateItem=(colKey:string, value:string, item:any,orderDataParams:Record<string, string>)=>{
  let [s,e]=item.range;
  let t1="";
  let t2="";
  let {dateRadiusView={}}=orderDataParams;
  if(dateRadiusView===DateRadiusViewValue.WEEK||dateRadiusView.hasOwnProperty('day')||dateRadiusView.hasOwnProperty('week')){
    t1 = `${moment(s).format(MOMENTFORMAT1)} - ${moment(e).format(MOMENTFORMAT1)}`;
  }else if(dateRadiusView===DateRadiusViewValue.MONTH||dateRadiusView.hasOwnProperty('month')){
    t1 = `${moment(s).format(MOMENTFORMAT2)} - ${moment(e).format(MOMENTFORMAT2)}`;
  }else if(dateRadiusView===DateRadiusViewValue.YEAR){
    t1 =  `${moment(s).format(MOMENTFORMAT3)}`;
  }else if(dateRadiusView===DateRadiusViewValue.HOUR||dateRadiusView.hasOwnProperty('time')){
    t1 = `${moment(s).format("HH:mm")} - ${moment(e).format("HH:mm")}`;
    t2 = `${moment(s).format(MOMENTFORMAT1)}`;
  }else {
    t1 = moment(value).format(MOMENTFORMAT1);
  }
  return (
    <Typography>
      {t1}<br/>
      {t2&&<Typography level={`body-xs`}>{t2}</Typography>}
    </Typography>
  );
}
