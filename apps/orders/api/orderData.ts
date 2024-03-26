import {ajax} from "@/api/ajax";
import {queryReq} from "@/api/types";
export function getStores(){
  return ajax.get('/store/all');
}
export function getStoresStatistics(body:queryReq){
  return ajax.post('/store/statistics',body)
}
