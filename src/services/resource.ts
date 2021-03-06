import request from '@/utils/request'

// 获取所有资源列表
export const getAllResource = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

// 按条件分页查询资源
export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 查询资源分类列表
export const getAll = (roleId: any) => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll',
    params: {
      roleId
    }
  })
}

// 给角色分配资源
export const allocateRoleResources = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

// 获取角色拥有的资源列表
export const getRoleResources = (roleId: any) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}
