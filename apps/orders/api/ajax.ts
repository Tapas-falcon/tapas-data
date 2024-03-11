import {API_URL, getAxios} from "@/api/apiProxy";

const ajax=getAxios({baseURL:API_URL});
export {ajax};
