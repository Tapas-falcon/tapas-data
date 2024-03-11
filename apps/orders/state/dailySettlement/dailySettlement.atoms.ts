import { atom } from "recoil";
import { DailyStettlementState } from "./types";

/**************  营收报告数据对象相关 State 申明  ***************/
export const dailyStettlement = atom<DailyStettlementState>({
    key: 'dailyStettlement',
    default: {
        list: [],
        filters: [],
        pageInfo: {
            total: 0,
            currenPage: 1,
            pageSize: 10,
            pageCount: 0,
        }
    }
});