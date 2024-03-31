import React from "react";
import {FxValue, TabDataTable, TabListItem, TabsDataItem} from "@/components/OrderData/type";
import {useRouter} from "next/router";
import {
  renderDateItem,
  renderDetailsModalItem,
  renderPriceItem,
  renderSumDetailsItem
} from "@/components/OrderData/Render";
import {queryReq} from "@/api/types";
import {DATETFORMATDEFAULT, DEFAULT, MOMENTFORMAT1} from "@/define";
import {priceFormat} from "@/utils";
import moment from "moment";
import {Box, Typography} from "@mui/joy";
import {DetailsModalProps} from "@/components/base/types";

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
export const dataToStoresTabList=(data:any[]=[], orderDataParams:Record<string, any>, openCurrentDetailsModal: (props: DetailsModalProps, range: string[], fx: { values: FxValue; params?: Record<string, any> },stores?:string[])=>void):TabDataTable=>{
  let table:TabDataTable={
    columns:[
      {title:"",column:"primaryKey",thProps:{width:200,className:"text-left"},tdProps:{className:"text-left"},renderItem:(...args)=>renderDateItem(...args,orderDataParams)},
    ],
    list:[],
    footer:[]
  }
  let columnsBase={
    renderItem:renderSumDetailsItem,
    thProps:{style: {textAlign:"right"}},
    tdProps:{style: {textAlign:"right"}}
  };


  data.forEach(item=>{
    let dataItem:TabListItem={
      primaryKey:item.primaryKey,
    };

    item.list.forEach((store:any)=>{
      if(!table.columns.find(c=>c.column===store.id)){
        table.columns.push({
          title:store.storeName,
          column:store.id,
          isStore:true,
          ...columnsBase,
          tdProps:{
            style: {textAlign:"right"},
            onClick:(colKey:string,value:any,item:any,columns:any[])=>{
              let data:any=item[colKey]||{value:0};
              if(data.value>0){
                openCurrentDetailsModal({
                  name:moment(data.primaryKey).format(MOMENTFORMAT1),
                  status:"Revenue",
                  desc:moment(data.primaryKey).format(MOMENTFORMAT1),
                },data.range,{values:FxValue.ONE},[data.id])
              }
            }
          },
        })
      }
      ///assign一下 仅针对于行
      Object.assign(dataItem,{
        range:store.range,
        totalPriceSumX:store.totalPriceSumX,
        totalPriceMeanX:store.totalPriceMeanX,
      });
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
          }
          paymentTaxs.set(rate,(Number(paymentTaxs.get(rate))+Number(tax.total)).toFixed(2));
        });
      })
      const details=[];
      paymentMethods.forEach((value,name)=>{
        details.push({name,value,key:'payMethod'})
      })
      details.push( {name:"line",key:'line'});
      paymentTaxs.forEach((value,name)=>{
        details.push({name,value,key:'tax'});
      })
      dataItem[store.id]= {
        ...store,
        value:Number(store.totalPrice).toFixed(2),
        details:details,
      }
    })

    table.list.push(dataItem);
  })
  if(orderDataParams.fx===FxValue.Y){
    //再到footer加一行
    let stores=data.map(item=>item.list).flat().reduce((obj,cur)=>{
      if(!obj[cur.id]){
        obj[cur.id]={
          storeName:cur.storeName,
          id:cur.id,
          sum:cur.totalPriceSumY,
          mean:cur.totalPriceMeanY
        };
      }
      let o=obj[cur.id];
      if(!o.default){
        o.sum=cur.totalPriceSumY;
        o.mean=cur.totalPriceMeanY;
      }
      return obj;
    },{});
    let Col=({sum,mean,tdProps}:{sum:string,mean:string,tdProps:Record<string, any>})=> (
      <td {...tdProps} className={`cursor-pointer ${tdProps.className}`}>
        <Box>
          <Typography sx={{color: 'primary.200'}} level={`body-xs`}>{sum}</Typography>
        </Box>
        <Box>
          <Typography sx={{color: 'neutral.540'}} level={`body-xs`}>{mean}</Typography>
        </Box>
      </td>
    )
    let ranges=table.list.map(item=>item.range).flat().map(date=>moment(date).valueOf());
    let range=[Math.min(...ranges),Math.max(...ranges)].map(date=>moment(date));
    table.footer.push(
      <tr>
        <Col sum={`Sum (€)`} mean={`Mean (€)`} key={-1} tdProps={{className:"text-left"}}/>
        {
          table.columns.map((col,index)=>{
            let item=stores[col.column];
            if(!item){
              return null;
            }
            const openCurrentDetailsYModal=()=>{
              openCurrentDetailsModal({
                name:item.storeName,
                status:'Revenue',
                desc:`${range[0].format(MOMENTFORMAT1)} - ${range[1].format(MOMENTFORMAT1)}`,
                tableList:[
                  {
                    header:true,
                    columns:[
                      {title:'Type',column:"name"},
                      {title:'Sum',column:"sum",renderItem:renderDetailsModalItem},
                      {title:'Mean',column:"mean",renderItem:renderDetailsModalItem},
                    ],
                    data:[],
                  }
                ],
              },
                range.map(m=>m.format(DATETFORMATDEFAULT)),
                {values:FxValue.Y,params:{pageSize:table.list.length}},
                [item.id as string]
              )
            }
            return  (
              <Col sum={priceFormat(item.sum,'')} key={index} mean={priceFormat(item.mean,'')}  tdProps={{className:"text-right",onClick:openCurrentDetailsYModal}}/>
            )
          })
        }
      </tr>
    )
  }

  if(orderDataParams.fx===FxValue.X){
    let openCurrentDetailsXModal=(colKey:string,value:any,item:any,columns:TabDataTable['columns'][])=>{
      openCurrentDetailsModal({
        name:moment(item.primaryKey).format(MOMENTFORMAT1),
        status:"Revenue",
        desc:moment(item.primaryKey).format(MOMENTFORMAT1),
      },item.range,{values:FxValue.X})
    }
    table.columns.push(
      {title:(<Typography  sx={{color:'primary.200'}} level={`body-xs`}>Sum (€)</Typography>),column:"totalPriceSumX",thProps:{width:70,className:"text-center  sticky right-[70px] z-0 i-t-sum",style:{color:"#895F38"}},tdProps:{className:"text-center sticky right-[70px] z-0 i-t-sum",onClick:openCurrentDetailsXModal,style:{color:"#895F38"}},renderItem:renderPriceItem},
      {title:(<Typography  sx={{color:'neutral.540'}} level={`body-xs`}>Mean (€)</Typography>),column:"totalPriceMeanX",thProps:{width:70,className:"text-center  sticky right-0 z-0  i-t-mean",style:{color:"#0000008A"}},tdProps:{className:"text-center  sticky right-0 z-0 i-t-mean",onClick:openCurrentDetailsXModal,style:{color:"#0000008A"}},renderItem:renderPriceItem},
    )
  }

  return table;
}
export const orderDataParamsToQuery=(params:Record<string,any>,fxAllY:boolean=false):queryReq=>{
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
    if(!fxAllY){
      pm.filters.push({"field":"statistics","values":params.fx})
    }else{
      //查询所有的y轴数据
      pm.filters.push({"field":"statistics","values":FxValue.ALLY})
    }
  }
  return pm
}
