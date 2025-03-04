import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo, getUserFollow, getUserFavorites } from '@/api/user'
import { ElMessage, ElNotification } from 'element-plus'
import { SortOrder } from 'element-plus/es/components/table-v2/src/constants'

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
    try {
      //获取用户信息并更新仓库
      isFirstGetUser.value = false
      const res = await getUserInfo()
      console.log('获取用户信息----->', res)
      if (res.code === 200) {
        isLogin.value = true
        userInfo.value = res.data
        //获取用户关注信息并更新仓库
        getUserFollowList()
        getUserFavoritesList()
      }
    } catch (error) {
      console.log(error)
      ElMessage({
        message: '获取用户信息失败，' + error,
        type: 'error',
        plain: true,
      })
    }
  }

  //拉取用户关注列表
  async function getUserFollowList(page = 1, sortOrder = 1) {
    try {
      //获取用户关注信息并更新仓库
      const followRes = await getUserFollow({
        page: page,
        sortOrder: sortOrder,
      })
      console.log('获取用户关注信息----->', followRes)
      if (followRes.code === 200) {
        userInfo.value.follow = followRes.data
      } else {
        ElMessage({
          message: '获取用户关注信息失败，' + followRes.msg,
          type: 'error',
          plain: true,
        })
      }
    } catch (error) {
      ElMessage({
        message: '获取用户关注信息失败，' + error,
        type: 'error',
        plain: true,
      })
    }
  }

  //获取用户收藏夹信息并更新仓库
  async function getUserFavoritesList(page = 1, sortOrder = 1) {
    try {
      const favoritesRes = await getUserFavorites({
        page: page,
        sortOrder: sortOrder,
      })
      console.log('获取用户收藏夹信息----->', favoritesRes)
      if (favoritesRes.code === 200) {
        userInfo.value.favorites = favoritesRes.data
      } else {
        ElMessage({
          message: '获取用户收藏夹信息失败，' + favoritesRes.msg,
          type: 'error',
          plain: true,
        })
      }
    } catch (error) {
      ElMessage({
        message: '获取用户收藏夹信息失败，' + error,
        type: 'error',
        plain: true,
      })
    }
  }

  return { isLogin, userInfo, getUser, resetUserInfo, getUserFollowList, getUserFavoritesList }
})
