import request from '@/utils/request'

export function getPushMovieList() {
  return request.get('/push/personal')
}
