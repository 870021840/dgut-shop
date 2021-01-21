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

//  角色列表
export function getRoles() {
  return request.get("/roles");
}

// 删除每个角色指定的某个权限
export function deleteRight(roleId, rightId) {
  return request.delete(`/roles/${roleId}/rights/${rightId}`);
}

// 角色授权
export function authorization(roleId, rids) {
  return request.post(`/roles/${roleId}/rights`, {
    rids: rids
  });
}
