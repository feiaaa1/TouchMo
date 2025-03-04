import request from '@/utils/request'
import { downloadProgress } from '@/utils/responsiveProgressListener'

//获取推送电影列表
export function getPushMovieList() {
  return request.get('/user/push/personal')
}

//获取电影详情
export function getMovieDetail(filmId) {
  return request.get(`/user/media/?mediaId=${filmId}`, {
    onDownloadProgress: downloadProgress,
  })
}

//获取电影路径
export function getMovieSource(filmId) {
  return request.get(`/user/media/open?meidaId=${filmId}`)
}

//获取搜索电影列表
export function getSearchMovieList(data) {
  return request.get('/search/media', {
    params: data,
  })
}

//获取热门电影列表
export function getHotPushMovieList() {
  return request.get('/user/push/hotPush', {
    onDownloadProgress: downloadProgress,
  })
}

//获取所有分类标签
export function getAllTagsList() {
  return request.get('/user/category')
}

//获取人员详情
export function getMemberProfile(memberId, params) {
  return request.get(`/user/member/${memberId}`, {
    params: params,
  })
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

//获取指定影视作品的所有线路
export function getMediaLineList(mediaId) {
  return request.get(`/user/media/line?mediaId=${mediaId}`)
}

//获取影视作品集数信息
export function getMediaVideo(data) {
  return request.get(`/user/media/video`, {
    params: data,
    onDownloadProgress: downloadProgress,
  })
}

//获取影视作品播放路径
export function getMediaVideoUrl(data) {
  return request.get(`/user/media/open`, {
    params: data,
    onDownloadProgress: downloadProgress,
  })
}

//获取过滤后的媒体列表
export function getFilterMediaList(data) {
  return request.get('/user/category/media', {
    params: data,
    onDownloadProgress: downloadProgress,
  })
}

//获取所有分类
export function getAllCategoryList() {
  return request.get('/user/category')
}

//获取指定分类下的其他筛选列表
export function getOtherFilterList(categoryId) {
  return request.get(`/user/category/detail/${categoryId}`)
}
