import {FormItemBase} from "@/components/OrderData/filter/types";
import React from "react";
import {BaseChildrenProps} from "@/components/base/types";
import {IOrderListTablePropsColumns} from "@/components/OrderListTable";

export interface CardDataProps{
  list:{name:string;value?:string}[]
}
export interface AddFxModalProps extends FormItemBase<string> {
}
export type FxModalProps = AddFxModalProps & BaseChildrenProps;
export interface TabsDataItem{
  name:string;
  context:any;
  FilterListContent?:React.FC<any>;
  columns?:IOrderListTablePropsColumns[]
}
export interface OrderDetailProps{

}
export * from "@/components/OrderData/filter/types"

export interface TabListItem extends Record<string, any>{
  //details:{value:string,name:string}
}
export interface TabDataTable{
  columns:(IOrderListTablePropsColumns&{isStore?:boolean})[]
  list:TabListItem[],
  footer?:React.ReactElement[]
}
