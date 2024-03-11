import { atom } from "recoil";
import { RoleInfo } from "./types";

/**************  权限类对象相关 State 申明  ***************/
export const roles = atom<RoleInfo>({
    key: 'roles',
    default: {
        MainPERMS: ["Ordering", "OrderList", "OperationSettlement", "CashierDrawer", "DataAnalysis", "System"],
        SecondaryPERMS: ["Promotion", "DataAlgorithmPush", "TableSetStep"],
    }
});
