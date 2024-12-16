<template>
  <div :class="['home-container', isDark ? 'dark-theme' : 'light-theme']">
    <canvas id="starfield" :class="{blur:store.showBoxList.isShowUserCard}"></canvas>
    <NavigationBar :class="{blur:store.showBoxList.isShowUserCard}" />
    <RouterView :class="{blur:store.showBoxList.isShowUserCard}" />
    <FooterComponent />
    <SearchBox />
    <LoginBox />
    <PopupComponent />
    <UserProfileCard />
    <ModifyCard />
  </div>
</template>

<script setup>
import NavigationBar from './NavigationBar/NavigationBar.vue'
import FooterComponent from './FooterComponent/FooterComponent.vue'
import SearchBox from '@/components/SearchBox.vue'
import LoginBox from '@/components/LoginBox.vue'
import PopupComponent from '@/components/ToastComponent.vue'
import UserProfileCard from '@/components/UserProfileCard.vue'
import ModifyCard from '@/components/ModifyCard.vue'
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

//控制模糊效果

//获取登陆状态 用户信息 用户收藏夹 用户关注
import { getUserInfo,getUserFavorites } from '@/api/user'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const {isLogin} = storeToRefs(userStore)
watch(isLogin, async () => {
  const res = await getUserInfo()
    if (res.msg == '成功') {
      userStore.isLogin = true
      userStore.userInfo.value = res.data
    }
  console.log('userInfo====>', userStore.userInfo)
  const favoritesRes = await getUserFavorites()
  console.log('userFavorites====>',favoritesRes);
  userStore.userInfo.value.favorites = favoritesRes.data

  const followRes = await getUserFavorites()
  console.log('userFollow====>',followRes.data);
  userStore.userInfo.value.follow = followRes.data
},
{ immediate: true })



</script>

<style lang="scss" scoped>
.dark-theme {
  --primary-bg-color: #000000;
  --secondary-bg-color: #111014;
  --tertiary-bg-color: #1d1e22;
  --quaternary-bg-color: #121212;
  --primary-border-color: #373737;
  --primary-font-color: #adadad;
  --secondary-font-color: #fafafa;
  --tertiary-font-color: #b8b8b8;
  --primary-accent-color: #e9bb5f;
  --secondary-accent-color: #d5a62f;
  --primary-func-color: #2d6cf5;
  background-color: var(--secondary-bg-color);
}

.light-theme {
  --primary-bg-color: #dddddd;
  --secondary-bg-color: #f5f5f5;
  --tertiary-bg-color: #ebebeb;
  --primary-border-color: #b8b8b8;
  --primary-font-color: #4d4d4d;
  --secondary-font-color: #fafafa;
  --primary-accent-color: #2d6cf5;
  --secondary-accent-color: #2f56d5;
  background-color: var(--secondary-bg-color);
}

.home-container {
  position: relative;
  width: 100%;
  z-index: 1;

  #starfield {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    opacity: 0.4;
  }
}

.blur {
  transition: all .3s;
  filter: blur(10px);
}
</style>
