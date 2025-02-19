import request from '@/utils/request'

//注册
export function userRegister(username, password) {
  return request.post(
    '/user/user/register',
    {},
    {
      params: {
        // 查询参数将附加到 URL 上
        username,
        password,
      },
    },
  )
}

//登录
export function userLogin(username, password) {
  return request.post(
    '/user/user/login',
    {},
    {
      params: {
        // 查询参数将附加到 URL 上
        username,
        password,
      },
    },
  )
}

//获取用户信息
export function getUserInfo() {
  return request.get('/user/user/info')
}

//获取用户收藏夹
export function getUserFavorites() {
  return request.get('/user/favorites')
}

//获取用户关注列表
export function getUserFollow() {
  return request.get('/user/follow')
}

//修改用户信息
export function modifyUserInfo(data) {
  return request.put('/user/user/info', data)
}

//文件上传
export function upload(data) {
  return request.post('/common/upload', data)
}

//关注用户
export function follow(id) {
  return request.post(
    '/user/follow',
    {},
    {
      params: {
        memberId: id,
      },
    },
  )
}

//取消关注用户
export function deleteFollow(id) {
  return request.delete(`/user/follow/?memberId=${id}`)
}

//关注用户
export function getFollow() {
  return request.get('/user/follow')
}

//查看指定收藏夹
export function getFavorites(id) {
  return request.get(`/user/favorites/${id}`)
}

//创建收藏夹
export function createFavorites(data) {
  return request.post('/user/favorites', data)
}

//修改收藏夹
export function modifyFavorites(data) {
  return request.put('/user/favorites', data)
}

//删除收藏夹
export function deleteFavorites(id) {
  return request.delete(`/user/favorites?favoriteId=${id}`)
}

//添加电影到收藏夹
export function addMovieToFavorites(data) {
  return request.post(
    '/user/favorites/film',
    {},
    {
      params: data,
    },
  )
}

//从收藏夹移除电影
export function deleteMovieFromFavorites(data) {
  console.log(data)
  return request.delete('/user/favorites/film', {
    params: data,
  })
}

//移动电影到其余收藏夹
export function moveMovieToOtherFavorites(data) {
  return request.put(
    '/user/favorites/film',
    {},
    {
      params: data,
    },
  )
}

//查看历史搜索记录
export function getHistorySearch() {
  return request.get('/user/search/history')
}

//用户添加历史搜索记录
export function addHistorySearch(content) {
  return request.post(`/user/search/history?content=${content}`)
}

//清空历史搜索记录
export function deleteHistorySearch() {
  return request.delete('/user/search/history')
}

//用户评分电影
export function rateMovie(data) {
  return request.put('/user/media/score', data)
}
