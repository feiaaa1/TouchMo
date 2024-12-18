import request from '@/utils/request'

//注册
export function userRegister(username, password) {
  return request.post(
    '/user/register',
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
    '/user/login',
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
  return request.get('/user/info')
}

//获取用户收藏夹
export function getUserFavorites() {
  return request.get('/favorites')
}

//获取用户关注列表
export function getUserFollow() {
  return request.get('/follow')
}

//修改用户信息
export function modifyUserInfo(data) {
  return request.put('/user/info', data)
}

//文件上传
export function upload(data) {
  return request.post('/common/upload', data)
}

//关注用户
export function follow(id) {
  return request.post(
    '/follow',
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
  return request.delete(`/follow/?memberId=${id}`)
}

//关注用户
export function getFollow() {
  return request.get('/follow')
}

//查看指定收藏夹
export function getFavorites(id) {
  return request.get(`/favorites/${id}`)
}

//创建收藏夹
export function createFavorites(data) {
  return request.post('/favorites', data)
}

//修改收藏夹
export function modifyFavorites(data) {
  return request.put('/favorites', data)
}

//删除收藏夹
export function deleteFavorites(id) {
  return request.delete(`/favorites?favoriteId=${id}`)
}

//添加电影到收藏夹
export function addMovieToFavorites(data) {
  return request.post(
    '/favorites/film',
    {},
    {
      params: data,
    },
  )
}

//从收藏夹移除电影
export function deleteMovieFromFavorites(data) {
  console.log(data)
  return request.delete('/favorites/film', {
    params: data,
  })
}

//移动电影到其余收藏夹
export function moveMovieToOtherFavorites(data) {
  return request.put(
    '/favorites/film',
    {},
    {
      params: data,
    },
  )
}

//查看历史搜索记录
export function getHistorySearch() {
  return request.get('/history')
}

//用户添加历史搜索记录
export function addHistorySearch(content) {
  return request.post(`/history?content=${content}`)
}

//清空历史搜索记录
export function deleteHistorySearch(){
  return request.delete('/history')
}
