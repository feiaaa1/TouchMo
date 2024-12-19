import request from '@/utils/request'

//获取推送电影列表
export function getPushMovieList() {
  return request.get('/push/personal')
}

//获取电影详情
export function getMovieDetail(filmId) {
  return request.get(`/film/${filmId}`)
}

//获取电影路径
export function getMovieSource(filmId) {
  return request.get(`/film/open?filmId=${filmId}`)
}


//获取搜索电影列表
export function getSearchMovieList(data) {
  return request.get('/search', {
    params: data,
  })
}

//获取热门电影列表
export function getHotPushMovieList() {
  return request.get('/push/hotPush')
}

//获取所有标签
export function getAllTagsList() {
  return request.get('/category')
}

//获取人员详情
export function getActorProfile(id) {
  return request.get(`/follow/${id}`)
}



//获取电影评论
export function getMovieComment(data) {
  return request.get('/comment', {
    params:data
  })
}


//用户评论电影
export function subMovieComment(data) {
  return request.post('/comment',data)
}



//用户修改评论
export function editMovieComment(data) {
  return request.put('/comment',data)
}

//用户删除评论
export function deleteMovieComment(commentId) {
  return request.delete(`/comment?commentId=${commentId}`)
}

//给评论点赞
export function starMovieComment(commentId) {
  return request.put(`/comment/star?commentId=${commentId}`)
}

//取消评论点赞
export function removeStarMovieComment(commentId) {
  return request.delete(`/comment/star?commentId=${commentId}`)
}

