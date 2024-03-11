import { atom } from "recoil";
import { withdrawQueryState} from "@/state/withdraw/types";
import {useTranslations} from "next-intl";
import {ISelectItem} from "@tapas/ui/Select";
//const t = useTranslations('withdraw')

export const defaultWithdrawQuery:()=>withdrawQueryState=()=>({
    dateRadius:[],
    user:null,
    reason:"default"
});

export const withdrawQuery=atom<withdrawQueryState>({
    key:"withdrawQuery",
    default:defaultWithdrawQuery()
});
export const withdrawQueryTypesOptions=atom<ISelectItem[]>({
    key:"withdrawQueryOptions",
    default:[
        {key:"default",text:"Any reason"},
        {key:"1",text:"Break a bill"},
        {key:"2",text:"Buy materials"},
        {key:"3",text:"Store operating expenses"},
        {key:"4",text:"Change"},
        {key:"5",text:"Others"},
    ]
})

