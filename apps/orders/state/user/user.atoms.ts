import { atom } from "recoil";
import { UserInfo } from "./types";

/**************  登录用户信息对象相关 State 申明  ***************/
export const user = atom<UserInfo>({
    key: 'user',
    default: {
        id: "",
        storeId: "65b78bd34b1dfe66ae01577e",
        name: '',
        phone: 13546859566,
        role: "",
    }
});
