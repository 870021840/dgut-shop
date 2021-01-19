import request from "@/utils/request";

// 访问左侧菜单权限
export function getMenu() {
  return request.get("/menus");
}
