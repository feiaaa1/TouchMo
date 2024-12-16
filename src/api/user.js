import request from '@/utils/request'

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
