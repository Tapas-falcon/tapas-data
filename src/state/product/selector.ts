import { selectorFamily } from "recoil";
import { ProductAnalyticsState } from "./type";
import { productAnalytics } from "./atoms";

// AnalyticsState中state下状态对象选择器
export const selProductAnalyticsState = selectorFamily({
    key: 'selProductAnalyticsState',
    get: (field: keyof ProductAnalyticsState["state"]) => ({ get }) => get(productAnalytics)['state'][field],
    set: (field: keyof ProductAnalyticsState["state"]) => ({ set }, newValue) =>
        set(productAnalytics, prevState => ({ ...prevState, state: { ...prevState.state, [field]: newValue as any } })),
});
