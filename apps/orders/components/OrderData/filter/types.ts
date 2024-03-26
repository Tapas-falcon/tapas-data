import {IAdditionalSelectProps, ISelectItem, ISelectProps} from "@tapas/ui/Select";
import {SelectProps as JoySelectProps} from "@mui/joy/Select/SelectProps";
import React from "react";
import {IOrderListTablePropsColumns} from "@/components/OrderListTable";
import {DatePickerProps, TabsValues} from "@tapas/ui/DatePicker";
import {DEFAULT} from "@/define";

export interface FormItemBase<T>{
  value?:T;
  onChange?:(value:T)=>void
}
export type StoresFilterProps=FormItemBase<string[]>;
export interface StoresFilterDataItemListItem{
  id:string;
  storeName:string;
  visible:boolean;
  checked:boolean;
  [key:string]:any
}
export interface StoresFilterDataItem{
  city:string;
  list:StoresFilterDataItemListItem[]
}


export interface DatePickerFilterProps extends FormItemBase<string|string[]|TabsValues>{
  options:DatePickerFilterOptions[];
  datePickerProps?:DatePickerProps
}
export interface DatePickerFilterOptions extends ISelectItem{
  checked?:boolean;
}

export interface IAdditionalSortSelectProps{
  items?: ISelectItem[]|JSX.Element;
  fx:string;
  onFxChange:(value:string)=>void
}
export enum FxValue{
  X='x',
  Y='y',
  DEF = DEFAULT
}
export type SortSelectProps = IAdditionalSortSelectProps & JoySelectProps<string, false>;
export interface FxOptionsDataType{
  key:FxValue;
  label:string;
  desc:string;
  desc2:string;
}
