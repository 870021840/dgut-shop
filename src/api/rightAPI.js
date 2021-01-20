import request from "@/utils/request";

// 访问左侧菜单权限
export function getMenu() {
  return request.get("/menus");
}

// 所有权限列表(列表)
export function getRightList() {
  return request.get("/rights/list");
}

// 所有权限列表（树的方式）
export function getRightTree() {
  return request.get("/rights/tree");
}
