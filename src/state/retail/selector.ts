import { selectorFamily } from "recoil";
import { RetailAnalyticsState } from "./type";
import { retailAnalytics } from "./atoms";

// AnalyticsState中state下状态对象选择器
export const selRetailAnalyticsState = selectorFamily({
    key: 'selAnalyticsState',
    get: (field: keyof RetailAnalyticsState["state"]) => ({ get }) => get(retailAnalytics)['state'][field],
    set: (field: keyof RetailAnalyticsState["state"]) => ({ set }, newValue) =>
        set(retailAnalytics, prevState => ({ ...prevState, state: { ...prevState.state, [field]: newValue as any } })),
});
