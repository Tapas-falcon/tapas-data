import { ISelectItem } from "@tapas/ui/Select";

export interface withdrawQueryState {
    dateRadius: string[],
    user: string,
    reason: string,
}

export enum ActionReason {
    Change = "Change",
    BreakABill = "Break a bill",
    BuyMaterials = "Buy materials",
    Otehrs = "Others"
}