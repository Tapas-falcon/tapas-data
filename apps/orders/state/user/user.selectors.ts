import { selectorFamily } from "recoil";

import { UserInfo } from "./types";
import { user } from "./user.atoms";

// 在用户权限state中抓取并订阅对应权限；
export const selUserState = selectorFamily({
    key: 'selUserState',
    get: (field: keyof UserInfo) => ({ get }) => get(user)[field],
    set: (field: keyof UserInfo) => ({ set }, newValue) =>
        set(user, prevState => ({ ...prevState, [field]: newValue })),
});
