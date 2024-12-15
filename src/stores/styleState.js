import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStyleStateStore = defineStore('styleState', () => {

  const ThemeStyle = ref('dark')
  function switchThemeStyle() {
    ThemeStyle.value = ThemeStyle.value === 'light' ? 'dark' : 'light'
  }

  return { ThemeStyle, switchThemeStyle }
})
