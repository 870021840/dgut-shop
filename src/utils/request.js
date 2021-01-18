import axios from "axios";

//全局定义一个单例的axios对象
const request = axios.create({
  //   baseURL: "http://127.0.0.1:8888/api/private/v1",
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 5000
});

// 导出axios对象
export default request;

// http://localhost:9003/login 直接发给服务器
// /login 给代理服务器，由代理服务器去转发 http://localhost:9003 + /login
