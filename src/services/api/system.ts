import { request } from '../request';

// ==================== 用户管理接口 ====================

/**
 * 获取用户列表
 */
export function fetchGetUserList(params: Api.SystemManage.UserSearchParams) {
  console.log('🔶 API: 发送获取用户列表请求', params);
  
  return request<Api.SystemManage.UserList>({
    method: 'get',
    url: '/system/user/list',
    params
  });
}

/**
 * 新增用户
 */
export function fetchAddUser(data: Omit<Api.SystemManage.User, 'id' | 'createTime' | 'updateTime'>) {
  return request<Api.SystemManage.User>({
    method: 'post',
    url: '/system/user/add',
    data
  });
}

/**
 * 编辑用户
 */
export function fetchEditUser(id: number, data: Partial<Api.SystemManage.User>) {
  return request<Api.SystemManage.User>({
    method: 'put',
    url: `/system/user/edit/${id}`,
    data
  });
}

/**
 * 删除用户
 */
export function fetchDeleteUser(id: number) {
  return request<void>({
    method: 'delete',
    url: `/system/user/delete/${id}`
  });
}

/**
 * 批量删除用户
 */
export function fetchBatchDeleteUser(ids: number[]) {
  return request<void>({
    method: 'delete',
    url: '/system/user/batchDelete',
    data: { ids }
  });
}

/**
 * 获取用户详情
 */
export function fetchGetUserDetail(id: number) {
  return request<Api.SystemManage.User>({
    method: 'get',
    url: `/system/user/detail/${id}`
  });
}

// ==================== 角色管理接口 ====================

/**
 * 获取所有角色（用于用户角色选择）
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    method: 'get',
    url: '/system/role/all'
  });
}

/**
 * 获取角色列表
 */
export function fetchGetRoleList(params: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    method: 'get',
    url: '/system/role/list',
    params
  });
}

/**
 * 新增角色
 */
export function fetchAddRole(data: Omit<Api.SystemManage.Role, 'id' | 'createTime' | 'updateTime'>) {
  return request<Api.SystemManage.Role>({
    method: 'post',
    url: '/system/role/add',
    data
  });
}

/**
 * 编辑角色
 */
export function fetchEditRole(id: number, data: Partial<Api.SystemManage.Role>) {
  return request<Api.SystemManage.Role>({
    method: 'put',
    url: `/system/role/edit/${id}`,
    data
  });
}

/**
 * 删除角色
 */
export function fetchDeleteRole(id: number) {
  return request<void>({
    method: 'delete',
    url: `/system/role/delete/${id}`
  });
} 