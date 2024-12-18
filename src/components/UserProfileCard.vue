<template>
  <div class="user-container" v-if="styleStore.showBoxList.isShowUserCard">
    <div class="flur" @click="closeBox()"></div>
    <div class="user-card">
      <header>
          <img class="avatar" :src="userStore.userInfo.avatar" alt="" />
        <div class="detail-container">
          <div class="name-sex-container">
            <h2>
              {{ userStore.userInfo.name || '未设置姓名' }}
            </h2>
            <span
              class="icon iconfont"
              :class="{
                'icon-sex-man': userStore.userInfo.sex === 1,
                'icon-sex-female': userStore.userInfo.sex === 0,
              }"
            ></span>
          </div>
          <p>{{ userStore.userInfo.email || '未绑定邮箱' }}</p>
        </div>
      </header>
      <main>
        <h1
          @click="styleStore.showBox('isShowLoginBox')"
          class="login-button"
          v-if="!userStore.isLogin"
        >
          点击登录
        </h1>
        <div class="main-detail-container">
          <div class="main-detail-sub-container follow-container" @click="navigateToFollwPage()">
            <span class="icon iconfont icon-follow"></span>
            <p>我的关注</p>
          </div>
          <div
            class="main-detail-sub-container favorite-container"
            @click="navigateToFavoritesPage()"
          >
                       <span class="icon iconfont icon-favorite"></span>

            <p>我的收藏</p>
          </div>
          <div class="main-detail-sub-container favorite-container">
            <span class="icon iconfont icon-history"></span>
            <p>历史记录</p>
          </div>
        </div>
        <button class="editUserBtn" @click="styleStore.showBox('isShowModifyCard')">
          编辑用户信息
        </button>
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

import { useRouter } from 'vue-router'
const router = useRouter()
function navigateToFollwPage() {
  router.push({
    name: 'userFollowList',
  })
  closeBox()
}
function navigateToFavoritesPage() {
  router.push({
    name: 'userFavorites',
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
    position: fixed;
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
      margin-bottom: 1rem;
      .avatar {
        flex-shrink: 0;
        height: 5rem;
        width: 5rem;
        border-radius: 100rem;
        border: 1px solid var(--primary-accent-color);
        background-color: var(--tertiary-bg-color);
        object-fit: cover;
      }

      .detail-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
        gap: 1rem;

        .name-sex-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          .icon-sex-man {
            color: #188cff;
          }
          .icon-sex-female {
            color: #ff188f;
          }
        }

        p {
          font-size: 0.7rem;
        }
      }
    }

    main {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .editUserBtn {
        appearance: none;
        background-color: transparent;
        border: 0.125em solid var(--primary-font-color);
        border-radius: 0.9375em;
        box-sizing: border-box;
        color: var(--primary-font-color);
        cursor: pointer;
        display: inline-block;
        font-family: Roobert, sans-serif;
        font-size: 16px;
        font-weight: 600;
        outline: none;
        padding: 1rem 2.3rem;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        will-change: transform;

        &:hover {
          color: var(--secondary-font-color);
        border: 0.125em solid var(--secondary-font-color);
          background-color: var(--tertiary-bg-color);
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }

      .login-button {
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          color: var(--primary-func-color);
        }
      }

      .main-detail-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .main-detail-sub-container {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          &:hover {
            color: var(--primary-accent-color);
          }
          .icon{
            font-size: 2rem;
          }
        }
      }
    }
  }
}
</style>
