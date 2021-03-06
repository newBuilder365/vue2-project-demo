import request from '@/utils/request'

// 获取所有菜单
export const getAllMenu = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll',
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}

// 保存或新增菜单
export const saveOrUpdateMenu = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

// 获取所有菜单并按层级展示
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

// 根据ID查询菜单
export const getMenuById = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/menu/${id}`
  })
}

// 删除菜单
export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

// 获取角色拥有的菜单列表
export const getRoleMenus = (roleId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}

// 给角色分配菜单
export const allocateRoleMenus = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}
