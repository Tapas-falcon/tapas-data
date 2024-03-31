import React from "react";
import {BaseModalProps, DetailsModalProps} from "@/components/base/types";
import BaseModal from "@/components/base/BaseModal";

export const DetailsModal:React.FC<DetailsModalProps>=(props)=>{
  const {name,status,tableList=[],desc}=props;
  return (
    <div className={`w-[45rem]`}>
      <div>
        <h1 className="m-0 text-base">{name}</h1>
        <div className="flex flex-row gap-2 items-center mb-6">
          <p className="m-0 bg-neutral-50 p-1 text-xs rounded-md">{status}</p>
          <p className="m-0 text-sm text-neutral-900 ">{desc}</p>
        </div>
        <div className={`overflow-auto max-h-[28rem]`}  style={{width:"calc(100% + 2rem)",marginLeft:"-1rem"}}>
          {
            tableList.map(table=> (
              <div className={`mb-4 flex justify-center`}>
                <table className={`w-full border-0`} style={{borderCollapse: "collapse"}}>
                  <thead className={`bg-neutral-100 text-sm leading-6 text-neutral-500 ${!table.header?'hidden':''}`}>
                  <tr>
                    <th className={`w-4`}></th>
                    {
                      table.columns.map((item,index)=> (
                        <th  {...item.thProps} className={`p-1 ${index===0?'text-left':'text-right'}  ${item.thProps?.className??''}`}>{item.title}</th>
                      ))
                    }
                    <th className={`w-4`}></th>
                  </tr>
                  </thead>
                  <tbody className={`text-sm`}>
                  {
                    table.data.map((dataItem) => (
                      <tr>
                        <td className={`w-4`}></td>
                        {
                          table.columns.map((item,index)=> {
                            let content=dataItem[item.column];
                            if(item.renderItem){
                              content=item.renderItem(item.column,content,dataItem);
                            }
                            return <td  {...item.tdProps} className={`p-1 pt-1.5 pb-1.5 ${index===0?'text-left':'text-right'} ${item.tdProps?.className??''}`}>{content}</td>;
                          })
                        }
                        <td className={`w-4`}></td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export const openDetailsModal = (props: BaseModalProps<DetailsModalProps> = {}) => {
  return BaseModal.open({
    children: DetailsModal,
    hiddenCancel: true,
    textOk: "Close",
    ...props
  });
}
export default openDetailsModal;
