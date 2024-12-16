import request from '@/utils/request'

export function getPushMovieList() {
  return request.get('/push/personal')
}

export function getMovieDetail(id) {
  return request.get(`/film/${id}`)
}

export function getSearchMovieList() {

}

export function getHotPushMovieList(){
  return request.get('/push/hotPush')
}
