import request from '@/utils/request'

// 按条件查询角色
export const getRolePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

// 保存或者更新角色
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

// 获取角色
export const getRoleById = (id: number | null) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

// 删除角色
export const deleteRoleById = (id: number | null) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

// 给用户分配角色
export const allocateUserRoles = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
