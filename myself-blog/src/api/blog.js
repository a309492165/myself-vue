import request from '@/api/request'
// 目录增删改查
export function queryCatalogAll(params) {
  return request.post('/admin/blog/queryCatalog', params)
}
export function addCatalog(params) {
  return request.post('/admin/blog/addCatalog', params)
}
export function deleteCatalog(params) {
  return request.post('/admin/blog/deleteCatalog', params)
}
export function updateCatalog(params) {
  return request.post('/admin/blog/updateCatalog', params)
}
// 文章增删改查
export function queryArticle(params) {
  return request.post('/admin/blog/queryArticle', params)
}
export function addArticle(params) {
  return request.post('/admin/blog/addArticle', params)
}
export function deleteArticle(params) {
  return request.post('/admin/blog/deleteArticle', params)
}
export function updateArticle(params) {
  return request.post('/admin/blog/updateArticle', params)
}
