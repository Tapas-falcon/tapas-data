import { API_URL } from "./apiProxy";

export enum reqs {
    queryOperatesWithIds = "/operates/",
}


export const queryOperates = (ids: string) => fetch(`${API_URL}${reqs.queryOperatesWithIds}${ids}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(res => res.json()).then(data => data);