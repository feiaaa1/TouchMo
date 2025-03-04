<template>
  <div :class="['home-container', isDark ? 'dark-theme' : 'light-theme']">
    <canvas id="starfield" :class="{ blur: store.showBoxList.isShowUserCard }"></canvas>
    <ResponsiveProgressBar />
    <NavigationBar :class="{ blur: store.showBoxList.isShowUserCard }" />
    <RouterView :class="{ blur: store.showBoxList.isShowUserCard }" />
    <FooterComponent />
    <SearchBox />
    <LoginBox />
    <UserProfileCard />
    <ModifyUserInfoCard />
    <ModifyFavoritesCard />
    <BlurBlack />
  </div>
</template>

<script setup>
import ResponsiveProgressBar from '@/components/ResponsiveProgressBar.vue'
import NavigationBar from './NavigationBar/NavigationBar.vue'
import FooterComponent from './FooterComponent/FooterComponent.vue'
import SearchBox from '@/components/SearchBox.vue'
import LoginBox from '@/components/LoginBox.vue'
import UserProfileCard from '@/components/UserProfileCard.vue'
import ModifyUserInfoCard from '@/components/ModifyUserInfoCard.vue'
import ModifyFavoritesCard from '@/components/ModifyFavoritesCard.vue'
import BlurBlack from '@/components/BlurBlack.vue'
import { ref, watch, onMounted } from 'vue'

//绘制星空背景
import { canvasStar } from '@/utils/canvasStar'
onMounted(() => {
  canvasStar()
})

//切换主题
import { useStyleStateStore } from '@/stores/styleState'
import { storeToRefs } from 'pinia'
const store = useStyleStateStore()
const isDark = ref(true)
const { ThemeStyle } = storeToRefs(store)
watch(ThemeStyle, (newValue) => {
  isDark.value = newValue === 'dark' ? true : false
})

//获取登陆状态 用户信息 用户收藏夹 用户关注, 每次渲染刷新时获取
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
userStore.getUser()
</script>

<style lang="scss" scoped>
.dark-theme {
  --always-entire-white-color: #ffffff;
  --always-white-color: #f3f3f3;
  --always-black-color: #111014;
  --always-yellow-color: #f2c66d;
  --primary-bg-color: #000000;
  --secondary-bg-color: #111014;
  --tertiary-bg-color: #1d1e22;
  --quaternary-bg-color: #111014;
  --primary-border-color: #444444;
  --secondary-border-color: #858585;
  --tertiary-border-color: #272729;
  --primary-font-color: #cbcbcb;
  --secondary-font-color: #fafafa;
  --tertiary-font-color: #b8b8b8;
  --quaternary-font-color: #e3e3e3;
  --primary-accent-color: #e9b348;
  --secondary-accent-color: #d5a62f;
  --primary-func-color: #4a5ef8;
  --tertiary-func-color: #4ce89a;
  --secondary-func-color: #ce3e3e;
  --quaternary-func-color: #1c52c6;
  background-color: var(--secondary-bg-color);
}

.light-theme {
  --always-entire-white-color: #ffffff;
  --always-white-color: #fafafa;
  --always-black-color: #111014;
  --always-yellow-color: #f2c66d;
  --primary-bg-color: #ffffff;
  --secondary-bg-color: #f5f5f5;
  --tertiary-bg-color: #fafafa;
  --quaternary-bg-color: #a9a9a9;
  --primary-border-color: #b8b8b8;
  --secondary-border-color: #939393;
  --primary-font-color: #4d4d4d;
  --secondary-font-color: #313131;
  --tertiary-font-color: #b8b8b8;
  --quaternary-font-color: #3b3b3b;
  --primary-accent-color: #4759e6;
  --secondary-accent-color: #2f56d5;
  --primary-func-color: #e9bb5f;
  --secondary-func-color: #ce3e3e;
  --quaternary-func-color: #d5a62f;
  background-color: var(--secondary-bg-color);
}

.home-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  z-index: 1;

  #starfield {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    opacity: 0.6;
  }
}

.blur {
  transition: all 0.3s;
  filter: blur(10px);
}
</style>
