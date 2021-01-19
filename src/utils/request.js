import axios from "axios";
import { getToken } from "@/utils/storage";

//全局定义一个单例的axios对象
const request = axios.create({
  //   baseURL: "http://127.0.0.1:8888/api/private/v1",
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 5000
});

// 请求拦截，所有的请求都会到这里来
request.interceptors.request.use(
  config => {
    // Do something before request is sent
    const token = getToken();
    if (token !== undefined) {
      //添加头部认证信息
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);
// 所有的响应都会到这里来
request.interceptors.response.use(
  response => {
    // Do something before response is sent
    return response.data;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  }
);

// 导出axios对象
export default request;

// http://localhost:9003/login 直接发给服务器
// /login 给代理服务器，由代理服务器去转发 http://localhost:9003 + /login
