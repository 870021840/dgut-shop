const TOKEN_KEY = "dg_token";
// 获取token
export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

//设置token
export function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}
