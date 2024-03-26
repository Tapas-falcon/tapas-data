import React, {Dispatch, useEffect, useRef, useState} from "react";
import {StoresFilterProps,StoresFilterDataItemListItem,StoresFilterDataItem} from "@/components/OrderData/filter/types";
import {DropDownMenu} from "@/components/DropDownMenu";
import Checkbox from '@mui/joy/Checkbox';
import Input from '@mui/joy/Input';
import {SearchIcon,CloseIcon} from "@tapas/ui/icons"
import {TextHighlight} from "@/components/OrderData/filter/TextHighlight";
import {getStores} from "@/api/orderData";
import {Button} from "@mui/joy";

export const StoresFilter:React.FC<StoresFilterProps>=(props)=>{
  let {value=[],onChange}=props;
  const [searchValue,setSearchValue]=useState("");
  const [list,setList]=useState([]);
  const [checkAll,setCheckAll]=useState(false);
  const [checkSingle,setCheckSingle]=useState<boolean|StoresFilterDataItemListItem>(false);
  const [indeterminate,setIndeterminate]=useState(false);
  const [selectlen,setSelectlen]=useState(0);
  const api=useRef<{open:boolean,setOpen:Dispatch<boolean>}>(null);
  let text="";
  if(selectlen===0){
    text=(`Any stores`);
  }else if(selectlen==1){
    text=(`${(checkSingle as StoresFilterDataItemListItem).storeName}`);
  }else if(selectlen>0){
    text=(`${selectlen} stores selected`);
  }else if(checkAll){
    text=(`All Stores`);
  }
  const onSearch=(value:string)=>{
    setSearchValue(value);
    let searchValue=value;

    list.forEach(item=>{
      item.list.forEach((item:any)=>{
        item.visible=true;
        if(searchValue){
          item.visible=!!(searchValue&&item.storeName.match(searchValue));
        }
      })
    })
    setList([...list]);
  }
  const updateCheckAll=(checked:boolean|((item:StoresFilterDataItemListItem)=>boolean)=null,datalist=list,isChange=true)=>{
    let iCheckAll=true;
    let iCheckSingle:StoresFilterDataItemListItem|boolean=false;
    let selects:any[]=[];
    if(typeof checked === "boolean"){
      iCheckAll=checked;
    }
    datalist.forEach((item:StoresFilterDataItem)=> {
      item.list.forEach((item:StoresFilterDataItemListItem) => {
        if(checked!==null){
          item.checked=typeof checked === 'boolean'?checked:checked(item);
        }
        let newitem={...item};
        if(item.checked)iCheckSingle=newitem;
        if(!item.checked)iCheckAll=false;
        if(item.checked)selects.push(newitem);
      })
    });
    setSelectlen(selects.length);
    setIndeterminate(!!(iCheckAll?false:iCheckSingle));
    setCheckAll(iCheckAll);
    setCheckSingle(iCheckSingle);
    setList([...datalist]);
    if(isChange)onChange&&onChange(selects.map(item=>item.id));
  }
  const onCheck=(item:StoresFilterDataItemListItem,checked:boolean)=>{
    item.checked=checked;
    updateCheckAll();
  }
  const onCheckAll=(value:boolean)=>{
    if(indeterminate){
      //反选
      updateCheckAll(item=>!item.checked);
    }else {
      updateCheckAll(value);
    }
  }

  const onClearAll=()=>{
    updateCheckAll(false);
    setSearchValue('');
    api.current&&api.current.setOpen(false);
  }

  useEffect( () => {

    getStores().then(({data})=>{
      let {data:stores=[]}=data;
      let list:StoresFilterDataItem[]=[];
      stores.forEach((item:{_id:string,name:string,city:string})=>{
        let current=list.find(current=>current.city===item.city);
        let storeItem:StoresFilterDataItemListItem={id:item._id,storeName:item.name,checked:value.includes(item._id),visible:true};
        if(!current){
          current={
            city:item.city,
            list:[
              storeItem
            ]
          };
          list.push(current)
        }
        else {
          current.list.push(storeItem)
        }
      });
      setList(list);
      updateCheckAll(null,list,false);
    })
  }, []);
  return (
    <DropDownMenu text={text} api={api}>
      <div className={` w-96 h-84 stores-filter`}>
        <div className={`pl-4 pr-4 flex w-full flex-row justify-between items-center h-16`}>
          <div className={`flex flex-row items-center`}>
            <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={e=>onCheckAll(e.target.checked)} label={`All stores`} sx={{fontWeight: 'bold'}}/>
          </div>
          <div>
            <Button disabled={!checkSingle}  variant="plain" className={`font-bold`} onClick={onClearAll}>
              Clear all
            </Button>
          </div>
        </div>
        <div className={`flex w-full flex-row justify-between items-center pl-4 pr-4 input-nobg-box`}>
          <Input value={searchValue} onInput={(e:any)=>onSearch(e.target.value)} startDecorator={<SearchIcon/>} endDecorator={<CloseIcon className={`${searchValue?'':'hidden'}`} onClick={e=>onSearch("")}/>} variant={`plain`} className={`w-full input-nobg`}/>
        </div>
        <div className={`w-full`}>
          <div className="store-list-box h-52 overflow-auto">
            {
              list.map(item=>(
                <div className={`store-list ${!!item.list.filter((item:any)=>item.visible).length?'':'hidden'}`} key={item.city}>
                  <p className="store-city m-0 mt-3 text-xs text-slate-400  pl-4 pr-4" key={item.city}>{item.city}</p>
                  <ul className="store-list list-none m-0 p-0">
                    {
                      item.list.map((item:any)=> (
                        <li className={`stor-item h-12 m-0 mt-2 mb-2 flex items-center  pl-4 pr-4 ${item.checked?"bg-gray-50":''} ${item.visible?'':'hidden'} ${item.checked}`} key={item.id}><Checkbox checked={item.checked} onChange={e=>onCheck(item,e.target.checked)} label={searchValue?<TextHighlight text={item.storeName} htext={searchValue}/>:item.storeName}/></li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </DropDownMenu>
  );
}
