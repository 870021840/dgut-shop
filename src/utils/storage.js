const TOKEN_KEY = "dg_token";
const ACTIVE_PATH_KEY = "active_path";
// 获取token
export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

//设置token
export function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  sessionStorage.clear();
}

export function getActivePath() {
  return sessionStorage.getItem(ACTIVE_PATH_KEY);
}

export function setActivePath(path) {
  sessionStorage.setItem(ACTIVE_PATH_KEY, path);
}
