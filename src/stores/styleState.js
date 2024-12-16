import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useStyleStateStore = defineStore('styleState', () => {
  const ThemeStyle = ref('dark')
  function switchThemeStyle() {
    ThemeStyle.value = ThemeStyle.value === 'light' ? 'dark' : 'light'
  }

  const showBoxList = reactive({
    isShowLoginBox: false,
    isShowSearchBox: false,
  })
  function showBox(boxName) {
    for (let key in showBoxList) {
      if (key === boxName) {
        showBoxList[key] = true
      } else {
        showBoxList[key] = false
      }
    }
    console.log(showBoxList)
  }
  function closeBox() {
    for (let key in showBoxList) {
          showBoxList[key] = false
        }
  }

  return { ThemeStyle, switchThemeStyle, showBox, showBoxList,closeBox }
})
