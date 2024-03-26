import { DatePicker } from "@tapas/ui/DatePicker";
import React, {Dispatch, MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import { ArrowDropDownIcon, ArrowDropUpIcon } from '@tapas/ui/icons';
import { useTranslations } from "next-intl";



export interface DropDownMenuProps{
  text:string;
  children:any;
  api?:React.MutableRefObject<any>;
  onOpenChange?:(open:boolean)=>void;
  onClose?:()=>void;
}
export const DropDownMenu: React.FC<DropDownMenuProps> = (props) => {
  let {text,children,api,onOpenChange,onClose}=props;
    const [open, setOpen] = useState(false);
    const is=open || open !== null;
    const downRef=useRef();
    let onClickDocument=useCallback((event:any)=>{
      let ref:HTMLDivElement=downRef.current;

      if(!ref||!ref.contains(event.target)){
        document.removeEventListener('click',onClickDocument);
        setOpen(false);
        onClose&&onClose();
      }
    },[]);

    useEffect(() => {
      onOpenChange&&onOpenChange(open);
      if(!open)return;
      requestAnimationFrame(e=>{
        document.addEventListener('click',onClickDocument);
      })
    }, [open]);
    if(api){
      api.current={
        open,
        setOpen:(open:boolean)=>{
          if(open)setOpen(open);
          else onClickDocument({target:document.body});
        }
      };
    }
    return (
        <div className="relative">
            <div className={`h-10 pl-4 pr-3 bg-black rounded-[360px] justify-center items-center gap-1 inline-flex ${is ? '': 'bg-opacity-10'} cursor-pointer`}
                onClick={() => {
                    setOpen(true);
                }}>
                <div className={`${is ? 'text-white' : 'text-black text-opacity-90'} text-sm font-normal font-['Bricolage Grotesque']`}>
                    {text}
                </div>
                { open? <ArrowDropUpIcon size={20} color={open ? "white" : "" } /> : <ArrowDropDownIcon size={20} color={text !== null ? "white" : ""} /> }
            </div>
            <div className="absolute rounded-xl shadow mt-2 bg-white" ref={downRef} style={{
                display: open ? "block" : "none",
            }}>
                {children}
            </div>
        </div>
    )
};
