import {ISelectItem} from "@tapas/ui/Select";
import {DEFAULT} from "@/define";
import {FxOptionsDataType, FxValue} from "@/components/OrderData/filter/types";
export const DatePickerFiltersTimeOptions:ISelectItem[]=[
  {key:DEFAULT,text:"Anytime"},
  {key:"1",text:"Today"},
  {key:"2",text:"Past 7 days"},
  {key:"3",text:"Past 30 days"},
  {key:"4",text:"Past 90 days"},
  {key:"custom",text:"Custom"},
];
export const DatePickerFiltersDailyViewOptions:ISelectItem[]=[
  {key:DEFAULT,text:"Daily view"},
  {key:"1",text:"Weekly view"},
  {key:"2",text:"Monthly view"},
  {key:"3",text:"Yearly view"},
  {key:"4",text:"Hourly view"},
  {key:"custom",text:"Custom"},
];
export const SortOptions:ISelectItem[]=[
  {key:DEFAULT,text:"Any"},
  {key:"1",text:"Descending"},
  {key:"2",text:"Ascending"},
  {key:"3",text:"Sum descending"},
  {key:"4",text:"Sum ascending"},
  {key:"5",text:"Mean value descending"},
  {key:"6",text:"Mean value ascending"}
];
export const SortNeedFxType=["3","4","5","6"];
const FxOptionsItem=({text,desc}:any)=>{
  return (
    <div>
      {text}
      <br/>
      <span className={`text-xs opacity-80`}>{desc}</span>
    </div>
  );
}

export const FxOptionsData:FxOptionsDataType[]=[
  {key:FxValue.DEF,label:"None",desc:"",desc2:""},
  {key:FxValue.Y,label:`Calculate vertically`,desc:"Show mean value and sum vertically",desc2:"Calculate mean value and sum in vertical format"},
  {key:FxValue.X,label:`Calculate horizontally`,desc:"Show mean value and sum horizontally",desc2:"Calculate mean value and sum in horizontal format"},
];
export const FxOptions: ISelectItem[] = FxOptionsData.map(item=>{
  return {key:item.key,label:item.label,text:item.key===DEFAULT?item.label:<FxOptionsItem text={item.label} desc={item.desc}/>}
});
export const isOrders=(page:string)=>  (page==='Orders');
