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

//获取用户收藏夹
export function getUserFollow() {
  return request.get('/follow')
}

//修改用户信息
export function modifyUserInfo(data) {
  return request.put('/user/info',data)
}
