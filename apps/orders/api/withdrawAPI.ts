import {ajax} from "@/api/ajax";
import {withdrawQueryState} from "@/state/withdraw/types";
import {pageInfo} from "@/api/types";

export async function getWithdrawList(params:withdrawQueryState,pageInfo:pageInfo={pageIndex:1,pageSize:10}){
  let body:any={
    filters:[],
    sorts:[
      {
        field:"createAt",
        type:"desc"
      }
    ],
    pageInfo
  };
  body.filters.push({
    field:'dateRadius',
    values:params.dateRadius||[]
  })

  body.filters.push({
    field:'user',
    search:params.user
  })

  body.filters.push({
    field:'reason',
    search:params.reason
  })
  let result=await ajax.post("/drawer-record/list",body);
  return result;
}
export interface WithdrawRecordBody{
  orderId?:string;
  cashWithdrawal:string;
  reason:string;
  cashDeposit:string;
  user:string;
}
export async function createWithdrawRecord(body:WithdrawRecordBody){
  return ajax.post("/drawer-record/create",body);
}
