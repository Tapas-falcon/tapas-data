import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import {useIntl} from "next-intl";
import services from "@/utils/services";

export const API_URL = process.env.NODE_ENV === 'development' ? "http://localhost:4080" : "/api";

export const SRC_URL = process.env.NODE_ENV === 'development' ? "http://121.46.249.133:3080" : "/img";

export function getAxios(config?: AxiosRequestConfig): AxiosInstance {
  const instance = axios.create({
    timeout: 20000,
    // withCredentials: true,
    ...config,
  })

  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      if(!config.params)config.params={};
      Object.assign(config.params,{
        lang:services.locale
      })
      // console.log("before request:", config)
      // config.headers.Authorization = localStorage.get("tapas_token")
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
      // 对响应数据做点什么
      // console.log("before response:", response)
      const { code, data, message } = response.data
      if (code === 200) return response
      else if (code === 401) {
        //  jumpLogin()
      } else {
         console.error(message)
         return Promise.reject(response)
      }
    },
    function (error) {
      // 对响应错误做点什么
      // console.log("error-response:", error.response)
      // console.log("error-config:", error.config)
      // console.log("error-request:", error.request)
      if (error.response) {
        if (error.response.status === 401) {
          // jumpLogin();
        }
      }
      console.error(error?.response?.data?.message || "服务端异常")
      return Promise.reject(error)
    }
  )
  return instance
}
