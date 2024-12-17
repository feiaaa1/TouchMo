import request from '@/utils/request'

export function getPushMovieList() {
  return request.get('/push/personal')
}

export function getMovieDetail(id) {
  return request.get(`/film/${id}`)
}

export function getSearchMovieList(data) {
return request.get('/search',{
    params: data
  })
}

export function getHotPushMovieList(){
  return request.get('/push/hotPush')
}


export function getAllTagsList() {
  return request.get('/category')
}

export function getActorProfile(id) {
  return request.get(`/follow/${id}`)
}
