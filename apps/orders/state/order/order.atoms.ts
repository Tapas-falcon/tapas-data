import { atom } from "recoil";
import { CurrentTable, OrderState, OrderTabResultState} from "./types";
import {DEFAULT} from "@/define";

export const order = atom<OrderState>({
    key: 'order',
    default: {
        orderList: []
    }
});
export const order4Payment = atom<OrderState>({
    key: 'order4Payment',
    default: {
        orderList: []
    }
});

export const currentTableState = atom<CurrentTable>({
    key: 'currentTable',
    default: undefined
});
export const orderTabResultState=atom<OrderTabResultState>({
    key:"orderTabResultState",
    default:{
        "pageSize": 10,
        "pageIndex": 1,
        "totalCount": 0,
        "totalPages": 0,
        "next": false,
        "data" : []
    }
})
export const orderDataParamsState = atom<{[key:string]:any}>({
    key:"orderDataParamsState",
    default:{
        dateRadius:DEFAULT,
        fx:"default"
    }
});
