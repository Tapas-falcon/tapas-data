import { API_URL } from "./apiProxy";
import { ListReqParams } from "./types";

export enum reqs {
    queryUsers = "/users/list",
    queryUsersWithIds = "/users/"
}


export const queryUsers = (reqBody: ListReqParams) => fetch(`${API_URL}${reqs.queryUsers}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...(reqBody ?? {}) }),
})
    .then(res => res.json())
    .then(data => data);

export const queryUsersWithIds = (ids: string) => fetch(`${API_URL}${reqs.queryUsersWithIds}${ids}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(res => res.json()).then(data => data);