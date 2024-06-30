import {API_URL, getAxios} from "./apiProxy";

const ajax=getAxios({baseURL:API_URL});
export {ajax};
