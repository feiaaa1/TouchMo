import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useStyleStateStore = defineStore('styleState', () => {
  const ThemeStyle = ref('dark')
  function switchThemeStyle() {
    console.log('changingTheme');
    ThemeStyle.value = ThemeStyle.value === 'light' ? 'dark' : 'light'
  }

  //用来记录收藏时的电影编号
  const currentFilmId = ref(null)

  const showBoxList = reactive({
    isShowLoginBox: false,
    isShowSearchBox: false,
    isShowUserCard: false,
    isShowModifyCard: false,
    isShowModifyFavoritesCard: false,
  })
  function showBox(boxName, id) {
    if(id)currentFilmId.value = id
    for (let key in showBoxList) {
      if (key === boxName) {
        showBoxList[key] = true
      } else {
        showBoxList[key] = false
      }
    }
  }
  function closeBox() {
    for (let key in showBoxList) {
          showBoxList[key] = false
        }
  }

  return { ThemeStyle, switchThemeStyle, showBox, showBoxList,closeBox,currentFilmId }
})
