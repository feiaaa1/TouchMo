import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo, getUserFollow, getUserFavorites } from '@/api/user'
import { ElNotification } from 'element-plus'

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

  function resetUserInfo() {
    userInfo.value = {
      id: '',
      follow: [],
      favorites: [],
      avatar: '',
      name: '',
      sex: '',
    }
    isLogin.value = false
  }

  const isFirstGetUser = ref(true)
  async function getUser() {
    //获取用户信息并更新仓库
    isFirstGetUser.value = false
      const res = await getUserInfo()
      console.log('getuser----->',res);
      if (res.code === 200) {
        isLogin.value = true
        userInfo.value = res.data

        const favoritesRes = await getUserFavorites()
        userInfo.value.favorites = favoritesRes.data

        const followRes = await getUserFollow()
        userInfo.value.follow = followRes.data
      } else {
        //重置用户信息
        resetUserInfo()
        ElNotification({
          title: 'Warning',
          message: '用户登录失效',
          type: 'warning',
        })
      }

  }

  return { isLogin, userInfo, getUser, resetUserInfo }
})
