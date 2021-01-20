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
// 根据 ID 查询用户信息
export function getUserById(userid) {
  return request.get(`/users/${userid}`);
}

// 编辑用户提交
export function editUser(id, email, mobile) {
  return request.put("/users/" + id, {
    email,
    mobile
  });
}
