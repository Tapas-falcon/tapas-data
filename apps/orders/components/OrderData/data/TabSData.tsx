import React from "react";
import {IOrderListTablePropsColumns} from "@/components/OrderListTable";
import {FxValue, TabDataTable, TabListItem, TabsDataItem} from "@/components/OrderData/type";
import {RetailAnalyticsFilter} from "@/components/OrderData/filter";
import {useRouter} from "next/router";
import {renderSumDetailsItem} from "@/components/OrderData/Render";
import {queryReq} from "@/api/types";
import {DEFAULT} from "@/define";
import {store} from "next/dist/build/output/store";
import {priceFormat} from "@/utils";

export enum OrderDetailsEnum {
  List="orderDetailsList",
  Detail="orderDetails"
}
export const getRetailAnalyticsTabsData=():TabsDataItem[]=>{
  const route = useRouter();

  const tabSData:TabsDataItem[]=[
    {name:"Revenue",context:null,},
    {name:"Orders",context:null,},
    {name:"ConsumptionCost",context:null,},
    {name:"LaborCost",context:null,},
    {name:"PurchaseCost",context:null,},
    {name:"Profit",context:null,},
    {name:"FixedCost",context:null,},
    {name:"AccountingErrors",context:null,},
    {name:OrderDetailsEnum.List,context:null,columns:[{title:"orderid",column:"orderId",tdProps:{onClick:()=>{
            route.push(`/order-data?tab=orderDetails&id=1`);
          }}}]},
    //{name:"orderDetails",context:null},

  ];
  return tabSData;
}

export const belongToOrderDetailTabs=(name:OrderDetailsEnum)=>{
  return Object.values(OrderDetailsEnum).includes(name);
}
export const dataToStoresTabList=(data:any[]=[],orderDataParams:Record<string, any>,openCurrentDetailsModal:()=>void):TabDataTable=>{
  let table:TabDataTable={
    columns:[
      {title:"",column:"date",thProps:{width:120}},
    ],
    list:[]
  }
  let columnsBase={
    renderItem:renderSumDetailsItem
  };


  data.forEach(item=>{
    let dataItem:TabListItem={
      date:item.date,

    };
    item.list.forEach((store:any)=>{
      if(!table.columns.find(c=>c.column===store.id)){
        table.columns.push({
          title:store.storeName,
          column:store.id,
          ...columnsBase
        })
      }

      let payments=store.payments||[];
      let paymentMethods=new Map();
      let paymentTaxs=new Map();
      payments.forEach((payment:any)=>{
        let {paymentMethod,tax=[]}=payment;
        if(paymentMethod){
          if(!paymentMethods.has(paymentMethod)){
            paymentMethods.set(paymentMethod,payment.totalPrice);
          }else {
            paymentMethods.set(paymentMethod,(Number(paymentMethods.get(paymentMethod))+Number(payment.totalPrice)).toFixed(2));
          }
        }

        tax.forEach((tax:any)=>{
          if(!+tax.rate)return;
          let rate=tax.rate*100+"%";
          if(!paymentTaxs.has(rate)){
            paymentTaxs.set(rate,0);
          }else {
            paymentTaxs.set(rate,(Number(paymentTaxs.get(rate))+Number(tax.total)).toFixed(2));
          }
        });
      })
      const details=[];
      paymentMethods.forEach((value,name)=>{
        details.push({name,value})
      })
      details.push( {name:"line"});
      paymentTaxs.forEach((value,name)=>{
        details.push({name,value});
      })
      dataItem[store.id]={
        value:Number(store.totalPrice).toFixed(2),
        details:details
      };
      if(orderDataParams.fx===FxValue.X){
        dataItem['totalPriceSumX']=priceFormat(store.totalPriceSumX,'');
        dataItem['totalPriceMeanX']=priceFormat(store.totalPriceMeanX,'');
      }
    })

    table.list.push(dataItem);
  })

  if(orderDataParams.fx===FxValue.X){
    table.columns.push(
      {title:"Sum (€)",column:"totalPriceSumX",thProps:{width:70,className:"text-center  sticky right-[70px] z-0 i-t-sum",style:{color:"#895F38"}},tdProps:{className:"text-center sticky right-[70px] z-0 i-t-sum",onClick:openCurrentDetailsModal,style:{color:"#895F38"}}},
      {title:"Mean (€)",column:"totalPriceMeanX",thProps:{width:70,className:"text-center  sticky right-0 z-0  i-t-mean",style:{color:"#0000008A"}},tdProps:{className:"text-center  sticky right-0 z-0 i-t-mean",onClick:openCurrentDetailsModal,style:{color:"#0000008A"}}},
    )
  }

  return table;
}
export const orderDataParamsToQuery=(params:Record<string,any>,needFxY:boolean=false):queryReq=>{
  let pm:queryReq={
    pageInfo:{
      pageIndex:1,
      pageSize:10
    },
    filters:[],
    sorts:[]

  };
  if(params.stores&&params.stores.length){
    pm.filters.push({"field":"stores","values":params.stores})
  }
  if(params.dateRadius!==DEFAULT){
    pm.filters.push({"field":"dateRadius","values":params.dateRadius})
  }
  if(params.dateRadiusView!=DEFAULT){
    pm.filters.push({"field":"dateRadiusView","values":params.dateRadiusView})
  }
  if(params.sort!=DEFAULT){
    pm.sorts.push({"field":"sorts","values":params.sort})
  }

  if(params.fx!==FxValue.DEF){
    if(needFxY){
      pm.filters.push({"field":"statistics","values":params.fx})
    }else if(FxValue.Y!==params.fx){
      pm.filters.push({"field":"statistics","values":params.fx})
    }
  }
  return pm
}
