import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { delay } from '@/utils/delay'

export const useStyleStateStore = defineStore('styleState', () => {
  const ThemeStyle = ref('dark')
  function switchThemeStyle() {
    console.log('changingTheme')
    ThemeStyle.value = ThemeStyle.value === 'light' ? 'dark' : 'light'
  }

  const NavigationState = ref({
    isMovieDetail: false,
    isScrollTop: true,
  })

  const FavoriteState = ref({
    //用来记录收藏时的电影编号
    currentFilmId: null,
    //用来记录当前修改收藏弹框的状态
    isOnlyCreate: false,
    //用来记录当前进入的收藏夹
    currentFavoritesId: null,
    //用来记录是否是修改状态
    isModifyFavorites: false,
  })

  const showBoxList = reactive({
    isShowLoginBox: false,
    isShowSearchBox: false,
    isShowUserCard: false,
    isShowModifyUserInfoCard: false,
    isShowModifyFavoritesCard: false,
    isShowBlurBlack: false,
  })

  function showBox(boxName, id) {
    if (id) FavoriteState.value.currentFilmId = id
    for (let key in showBoxList) {
      if (key === boxName) {
        showBoxList[key] = true
      } else {
        showBoxList[key] = false
      }
    }
    showBoxList.isShowBlurBlack = true
  }

  //box关闭清空所有状态
  function resetState() {
    FavoriteState.value = {
      currentFilmId: null,
      isOnlyCreate: false,
      currentFavoritesId: null,
      isModifyFavorites: false,
    }
  }

  function closeBox() {
    for (let key in showBoxList) {
      showBoxList[key] = false
    }
    resetState()
  }

  const progress = ref(0)
  const isShowProgress = ref(false)
  const progressQueue = ref([0]) // 新增进度队列
  const isAnimating = ref(false) // 新增动画锁
  const currentVersion = ref(0) // 新增：当前请求版本号

  // 启动新请求时调用
  const startNewRequest = async () => {
    currentVersion.value++ // 版本号递增
    isShowProgress.value = true
    progressQueue.value = []
    isAnimating.value = false
    progress.value = 0
  }

  // 带版本检查的入队方法
  const enqueueProgress = (percent, version) => {
    if (version !== currentVersion.value) return // 忽略旧版本进度

    // 过滤掉比当前队列最大值小的进度（避免回退）
    const maxInQueue = progressQueue.value.length > 0 ? Math.max(...progressQueue.value) : 0
    if (percent > maxInQueue) {
      progressQueue.value.push(percent)
    }

    if (!isAnimating.value) {
      processQueue(version)
    }
  }

  // 处理队列（带版本检查）
  const processQueue = async (version) => {
    if (version !== currentVersion.value) return // 版本过期则终止
    if (progressQueue.value.length === 0) return

    isAnimating.value = true
    const targetPercent = progressQueue.value.shift()
    progress.value = targetPercent

    await delay(200)
    isAnimating.value = false
    processQueue(version) // 传递版本号继续处理
  }
  return {
    ThemeStyle,
    switchThemeStyle,
    showBox,
    showBoxList,
    closeBox,
    FavoriteState,
    NavigationState,
    progress,
    isShowProgress,
    progressQueue,
    isAnimating,
    enqueueProgress,
    processQueue,
    currentVersion,
    startNewRequest,
  }
})
