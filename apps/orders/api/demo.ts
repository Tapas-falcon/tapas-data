import { getAxios } from "./apiProxy";

export function getHotSearch() {
  return () => getAxios().get('https://tenapi.cn/v2/baiduhot');
}