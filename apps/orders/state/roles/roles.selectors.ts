import { selectorFamily } from "recoil";

import { RoleInfo } from "./types";
import { roles } from "./roles.atoms";

// 在用户权限state中抓取并订阅对应权限；
export const selRolesState = selectorFamily({
    key: 'selRolesState',
    get: (field: keyof RoleInfo) => ({ get }) => get(roles)[field],
    set: (field: keyof RoleInfo) => ({ set }, newValue) =>
        set(roles, prevState => ({ ...prevState, [field]: newValue })),
});
