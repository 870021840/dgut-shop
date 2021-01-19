import request from "@/utils/request.js";

//登录请求API
export function loginAPI(username, password) {
  return request.get("/login", {
    params: {
      username: username,
      password: password
    }
  });
}
// 用户数据列表
export function getUsers(query, pagenum, pagesize) {
  return request.get("/users", {
    params: {
      query,
      pagenum,
      pagesize
    }
  });
}
