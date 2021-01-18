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

export function xxx() {}
