import request from '@/api/request'
// 所有留言
export function queryCommentAll(params) {
  return request.get('/comment', params)
}
// 添加留言
export function addComment(params) {
  return request.post('/comment/add', params)
}
// 回复留言
export function addReply(params) {
  return request.post('/comment/reply/add', params)
}
