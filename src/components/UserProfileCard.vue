<template>
  <div class="user-container" v-if="styleStore.showBoxList.isShowUserCard">
    <div class="flur" @click="closeBox()"></div>
    <div class="user-card">
      <header>
        <div class="avatar">
            <img :src="userStore.userInfo.avatar" alt="">
        </div>
        <div class="detail-container">
          <div class="detail-sub-container">
            <h1>{{userStore.userInfo.follow.length}}</h1>
            <p>follow</p>
          </div>
          <div class="detail-sub-container">
            <h1>{{userStore.userInfo.favorites.length}}</h1>
            <p>favorites</p>
          </div>
        </div>
      </header>
      <main>
                <h1>{{userStore.isLogin?'已登录':'未登录'}}</h1>
        <h2  @click="styleStore.showBox('isShowLoginBox')">{{userStore.userInfo.name||'未设置性别'}}</h2>
        <h3>{{ userStore.userInfo.sex || '未设置性别'}}</h3>
        <p>{{userStore.userInfo.email||'未绑定邮箱'}}</p>
        <button @click="navigateToFollwPage()">查看关注人列表</button>
        <button @click="navigateToFavoritesPage()">查看收藏夹</button>
        <button @click="styleStore.showBox('isShowModifyCard')">编辑用户信息</button>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
console.log('use===>', userStore.userInfo)

const styleStore = useStyleStateStore()
function closeBox() {
  styleStore.closeBox()
}

import { useRouter } from 'vue-router';
const router = useRouter()
function navigateToFollwPage() {
  router.push({
    name:'userFollowList'
  })
  closeBox()
}
function navigateToFavoritesPage() {
  router.push({
    name: 'userFavorites'
  })
  closeBox()
}

</script>

<style lang="scss" scoped>
@keyframes slide {
  0% {
    transform: translateX(20rem);
  }
  100% {
    transform: translateX(0rem);
  }
}
.user-container {
  width: 100%;
  height: 100%;
  .flur {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 25;
    width: 100%;
    height: 100%;
    background-color: #0000009a;
    filter: blur(100px);
  }
  .user-card {
    position: absolute;
    z-index: 30;
    top: 0;
    right: 0;
    border-left: 1px solid var(--primary-border-color);
    height: 100vh;
    width: 20rem;
    background-color: var(--secondary-bg-color);
    padding: 1.7rem;
    color: var(--primary-font-color);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      .avatar {
        height: 5rem;
        width: 5rem;
        border-radius: 100rem;
        border: 1px solid var(--primary-border-color);
        background-color: var(--tertiary-bg-color);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;


        img {
          object-fit: cover;
        }
      }

      .detail-container {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        .detail-sub-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }

    main {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
