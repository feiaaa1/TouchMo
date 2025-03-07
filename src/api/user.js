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
export function getUserFavorites(params) {
  return request.get('/user/favorites', {
    params: params,
  })
}

//获取用户关注列表
export function getUserFollow(params) {
  return request.get('/user/follow', {
    params: params,
  })
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
export function getFollow(params) {
  return request.get('/user/follow', {params: params})
}

//查看指定收藏夹
export function getFavorites(id, params) {
  return request.get(`/user/favorites/${id}`, {
    params: params,
  })
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
export function deleteFavorites(data) {
  return request.delete(`/user/favorites?${data}`)
}

//添加电影到收藏夹
export function addMovieToFavorites(data) {
  return request.post(
    '/user/favorites/media',
    {},
    {
      params: data,
    },
  )
}

//从收藏夹移除电影
export function deleteMovieFromFavorites(data) {
  return request.delete('/user/favorites/media', {
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
export function deleteHistorySearch(data) {
  return request.delete(`/user/search/history?${data}`)
}

//用户初次评分电影
export function firstRateMovie(data) {
  return request.post('/user/media/score', data)
}

//用户修改评分电影
export function modifyRateMovie(data) {
  return request.put('/user/media/score', data)
}

//查看消息栏
export function fetchMessage(data) {
  return request.get('/user/message', {
    params: data,
  })
}

//批量删除消息
export function removeMessage(data) {
  return request.delete(`/user/message?${data}`)
}

//批量已读消息
export function setMessagesReadBatch(data) {
  return request.put(`/user/message?${data}`)
}
