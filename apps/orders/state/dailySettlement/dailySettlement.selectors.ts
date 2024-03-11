import { queryDailySettlementReq } from "@/api/dailySettlementAPI";
import { ListReqParams } from "@/api/types";
import { selectorFamily } from "recoil";
import { DailyStettlementState } from "./types";
import { dailyStettlement } from "./dailySettlement.atoms";

// 触发请求 返回营收报告列表
export const queryDailySettlementRpts = selectorFamily({
    key: 'queryDailySettlementRpts',
    get: (queryParameters: ListReqParams) => async ({ get }) => {
        try {
            const res: any = await queryDailySettlementReq(queryParameters);
            if (res.error) {
                throw res.error;
            }
            return res.data;
        } catch (error) {
            console.error("Error fetching daily settlement reports:", error);
            throw new Error("Failed to fetch daily settlement reports");
        }
    },
});

// 选择营收报告下不同状态
export const selDailyStettlementState = selectorFamily({
    key: 'selDailyStettlementState',
    get: (field: keyof DailyStettlementState) => ({ get }) => get(dailyStettlement)[field],
    set: (field: keyof DailyStettlementState) => ({ set }, newValue) =>
        set(dailyStettlement, prevState => ({ ...prevState, [field]: newValue })),
});
