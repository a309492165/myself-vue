import request from '@/api/request'
// 所有目录
export function queryCatalogAll(params) {
  return request.post('/admin/blog/queryCatalog', params)
}
// 新增目录
export function addCatalog(params) {
  return request.post('/admin/blog/addCatalog', params)
}
// 删除目录
export function deleteCatalog(params) {
  return request.post('/admin/blog/deleteCatalog', params)
}
// 修改目录
export function updateCatalog(params) {
  return request.post('/admin/blog/updateCatalog', params)
}
