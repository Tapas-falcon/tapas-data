import { atom } from "recoil";
import { ProductAnalyticsState } from "./type";

export const productAnalytics = atom<ProductAnalyticsState>({
    key: 'productAnalytics',
    default: {
        state: {
            selTabIndex: 0,
        }
    }
});