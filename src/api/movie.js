import request from '@/utils/request'

//获取推送电影列表
export function getPushMovieList() {
  return request.get('/user/push/personal')
}

//获取电影详情
export function getMovieDetail(filmId) {
  return request.get(`/user/media/?mediaId=${filmId}`)
}

//获取电影路径
export function getMovieSource(filmId) {
  return request.get(`/user/media/open?meidaId=${filmId}`)
}

//获取搜索电影列表
export function getSearchMovieList(data) {
  return request.get('/user/search', {
    params: data,
  })
}

//获取热门电影列表
export function getHotPushMovieList() {
  return request.get('/user/push/hotPush')
}

//获取所有分类标签
export function getAllTagsList() {
  return request.get('/user/category')
}

//获取人员详情
export function getActorProfile(id) {
  return request.get(`/user/follow/${id}`)
}

//获取电影评论
export function getMovieComment(data) {
  return request.get('/user/comment/page', {
    params: data,
  })
}

//查询指定评论
export function getCommentDetail(commentId) {
  return request.get(`/user/comment?commentId=${commentId}`)
}


//用户评论电影
export function subMovieComment(data) {
  return request.post('/user/comment', data)
}

//用户修改评论
export function editMovieComment(data) {
  return request.put('/user/comment', data)
}

//用户回复评论
export function replyMovieComment(data) {
  return request.post('/user/comment/children', data)
}

//用户查看更多评论
export function getRepliesCommentList(data) {
  return request.get('/user/comment/children', {
    params: data,
  })
}

//用户删除评论
export function deleteMovieComment(commentId) {
  return request.delete(`/user/comment?commentId=${commentId}`)
}

//评论动作
export function MovieCommentAction(data) {
  return request.post('/user/comment/action', data)
}

//取消评论动作
export function removeMovieCommentAction(commentId) {
  return request.delete(`/user/comment/action?commentId=${commentId}`)
}

//查看标签下影视作品
export function getTagMediaList(data) {
  return request.get('/user/label/media', {
    params: data,
  })
}
