import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo, getUserFollow, getUserFavorites } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)

  const userInfo = ref({
    id: '',
    follow: [],
    favorites: [],
    avatar: '',
    name: '',
    sex: '',
  })

  async function getUser() {
    //获取用户信息并更新仓库
    const res = await getUserInfo()
    if (res.msg == '成功') {
      isLogin.value = true
      userInfo.value = res.data

      const favoritesRes = await getUserFavorites()
      userInfo.value.favorites = favoritesRes.data

      const followRes = await getUserFollow()
      userInfo.value.follow = followRes.data

      alert('获取用户信息成功！')
    } else {
      //重置用户信息
      userInfo.value = {
        id: '',
        follow: [],
        favorites: [],
        avatar: '',
        name: '',
        sex: '',
      }
      isLogin.value = false
      alert('用户登录失效')
    }
  }

  return { isLogin, userInfo, getUser }
})
