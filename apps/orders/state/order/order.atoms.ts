import { atom } from "recoil";
import { CurrentTable, OrderState } from "./types";

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
