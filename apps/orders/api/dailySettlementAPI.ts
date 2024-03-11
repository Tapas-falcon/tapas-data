import { useRouter } from "next/router";
import { ListReqParams } from "./types";
import { API_URL } from "./apiProxy";

export enum reqs {
    list = "/revenues/list",
}

export const queryDailySettlementReq = (reqBody: ListReqParams) => {
    const router = useRouter();
    return fetch(`${API_URL}${reqs.list}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...(reqBody ?? {}), lang: router.locale ?? 'es' }),
    })
        .then(res => res.json())
        .then(data => data);

};