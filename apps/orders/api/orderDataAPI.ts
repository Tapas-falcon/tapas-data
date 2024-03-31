import {ajax} from "@/api/ajax";
import {queryReq, statisticsQueryReq} from "@/api/types";
export function getStores(){
  return ajax.get('/store/all');
}
export function getStoresStatistics(body:statisticsQueryReq){
  return ajax.post('/store/statistics',body)
}
export function getStoresStatisticsX(body:statisticsQueryReq){
  return ajax.post('/store/statisticsXY',body);
}
