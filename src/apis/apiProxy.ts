import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export const API_URL = process.env.NODE_ENV === 'development' ? "/api" : "/api";

export const SRC_URL = process.env.NODE_ENV === 'development' ? "http://121.46.249.133:3080" : "/img";

export function getAxios(config?: AxiosRequestConfig): AxiosInstance {
  const instance = axios.create({
    timeout: 20000,
    // withCredentials: true,
    ...config,
  })

  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config: any) {
      // 在发送请求之前做些什么
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
      // to do for response
      // console.log("before response:", response)
      const {status}   = response
      const {  message } = response.data;
      if (status === 200) return response.data
      else if (status === 401) {
        //  jumpLogin()
      } else {
         console.error(message)
         return Promise.reject(response.data)
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
