import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

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

  return {
    ThemeStyle,
    switchThemeStyle,
    showBox,
    showBoxList,
    closeBox,
    FavoriteState,
    NavigationState,
  }
})
