import { atom } from "recoil";
import { RetailAnalyticsState } from "./type";

export const retailAnalytics = atom<RetailAnalyticsState>({
    key: 'retailAnalytics',
    default: {
        state: {
            selTabIndex: 0,
        }
    }
});