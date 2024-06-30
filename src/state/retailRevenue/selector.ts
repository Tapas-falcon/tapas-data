import { selectorFamily } from "recoil";
import { RetailRevenueState } from "./type";
import { retailRevenue } from "./atoms";

// AnalyticsState中state下状态对象选择器
export const selRetailRevenue = selectorFamily({
    key: 'retailRevenue',
    get: (field: keyof RetailRevenueState) => ({ get }) => get(retailRevenue)[field],
    set: (field: keyof RetailRevenueState) => ({ set }, newValue) =>
        set(retailRevenue, prevState => ({ ...prevState, state: { ...prevState, [field]: newValue as any } })),
});
