import { atom } from "recoil";
import { RetailRevenueState } from "./type";

export const retailRevenue = atom<RetailRevenueState>({
    key: 'retailRevenue',
    default: {
        list: [],
        selectedOptions: {},
        filters: [],
        sorts: [],
        pageInfo: {
            totalItems: 0,
            pageSize: 10,
            page: 1,
            totalPage: 1,
        }
    }
});