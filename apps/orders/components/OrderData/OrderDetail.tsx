import React from "react";
import {OrderDetailProps} from "@/components/OrderData/type";
import {IconComplete} from "@/components/OrderData/icons";
import {Avatar, Divider} from "@mui/joy";
import {Price} from "@/components/common/Price";

export const OrderDetail:React.FC<OrderDetailProps>=(props:OrderDetailProps)=>{
  return (
    <>
      <Divider className={`w-full`}/>
      <div className="flex flex-row" style={{height:"calc(100vh - var(--Header-height))"}}>
        <div className="  w-[35rem]">
          <div className={` pl-6 pr-6  flex flex-row justify-between items-center h-12`}>
            <h1 className="m-0 text-base">Order info</h1>
            <p className="m-0 flex-row flex gap-1 items-center">
              <IconComplete size={20}/>
              <span className={`text-sm text-neutral-800`}>Completed</span>
            </p>
          </div>
          <div className={`pl-6 pr-6 text-sm leading-none text-neutral-500`}>
            <ul className={`list-none p-0 m-0`}>
              {
                Array.from({length:6},()=>{
                  return (
                    <li className={`flex flex-row justify-between pb-3`}>
                      <span>Order ID</span>
                      <span>LP1002420231220</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <Divider className={`w-full`}/>
          <div className={`pl-6 pr-6`}>
            <table className={`w-full border-0`} style={{borderCollapse: "collapse"}}>
              <thead className={`text-xs text-neutral-500`}>
              <tr>
                <th align={`left`} className={`pt-4 pb-4`}>Description</th>
                <th align={`right`} className={`pt-4 pb-4`}>Quantity</th>
                <th align={`right`} className={`pt-4 pb-4`}>Total</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td align={`left`} className={`pb-4`}>
                  <div className={`flex flex-row gap-1`}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <div className={`leading-none`}>
                      <p className="m-0">
                        <span className={`text-sm text-neutral-500`}>Barra cereales</span>
                        <span className={`text-xs text-neutral-300 pl-1`}>(P02)</span>
                      </p>
                      <p className="m-0">
                        <span className={`text-sm text-neutral-500`}>€0.80</span>
                        <span className={`text-xs text-neutral-300 pl-1 line-through`}>€1.00</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td align={`right`} className={`pb-4 text-base text-neutral-500`}>X2</td>
                <td align={`right`} className={`pb-4 text-sm text-neutral-500`}><Price price={1.6}/></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Divider  orientation="vertical" className={`flex-initial`}/>
        <div className="flex flex-col flex-1 pl-6 pr-6" >
          <div className="flex h-12 justify-between items-center w-full">
            <h1 className="m-0 text-base">Payment info</h1>
          </div>
          <div className="flex flex-row justify-between">
            <div className=" w-[8.75rem]">
              <div className="w-full h-[10.75rem] rounded-xl flex flex-col items-center p-3" style={{backgroundColor:"rgba(0,0,0,0.04)"}}>
                <Avatar variant="soft" size={`lg`} sx={{width:"3.5rem",height:"3.5rem",backgroundColor:"rgba(0,0,0,0.04)"}}/>
                <p className="m-0 text-center text-xs text-neutral-500 mt-3">
                  Non-membership<br/>checkout
                </p>
              </div>
            </div>
            <div className="pl-4 flex-1 pr-4 pt-3 pb-3 flex flex-row flex-wrap justify-between">
              {
                Array.from({length:9},()=> (
                  <div className="w-1/3 h-9">
                    <p className="m-0 text-sm text-neutral-500" >Total amount due</p>
                    <p className="m-0 text-xs text-neutral-900">€45.59</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
