import { withdrawQueryTypesOptions } from "./withdraw.atoms";
import {selectorFamily} from "recoil";
import {ajax} from "@/api/ajax";

export const getWithdrawQueryTypesOptions = selectorFamily({
  key: 'getWithdrawQueryTypesOptions',
  get: (queryParameters: any = {}) => ({ get }) => get(withdrawQueryTypesOptions)
});
export const getWithdrawQueryData=selectorFamily({
  key: 'getWithdrawQueryData',
  get: (params?: any)=>  ({get})=>{
    //todo 如果函数异步在页面上调用会直接导致卡死
    return "";
  }
});
