import { queryReq } from "../state/common";
import { ajax } from "./ajax";

export async function getStoreList(query: queryReq) {
    console.log('??');
    return await ajax.post(`store/list`, query);
}