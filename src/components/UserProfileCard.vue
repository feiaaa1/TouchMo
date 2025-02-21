<template>
  <transition name="userProfile">
    <div class="user-card" v-if="styleStore.showBoxList.isShowUserCard">
      <header>
        <img class="avatar" :src="userStore.userInfo.avatar" alt="" />
        <div class="detail-container">
          <div class="name-sex-container">
            <h2>
              {{ userStore.userInfo.name || '' }}
            </h2>
            <span
              class="icon iconfont"
              :class="{
                'icon-sex-man': userStore.userInfo.sex === 1,
                'icon-sex-female': userStore.userInfo.sex === 0,
              }"
            ></span>
          </div>
        </div>
      </header>
      <main>
        <button
          @click="styleStore.showBox('isShowLoginBox')"
          class="btn login-button"
          v-if="!userStore.isLogin"
        >
          立即登录
        </button>
        <div v-show="userStore.isLogin" class="main-detail-container">
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
        <button
          v-show="userStore.isLogin"
          class="editUserBtn btn"
          @click="styleStore.showBox('isShowModifyUserInfoCard')"
        >
          编辑资料
        </button>
        <button v-show="userStore.isLogin" class="LogOutBtn btn" @click="handleLogOut()">
          退出登录
        </button>
      </main>
    </div>
  </transition>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()

const styleStore = useStyleStateStore()

function closeBox() {
  styleStore.closeBox()
}

//跳转到关注、收藏页面
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

//退出登录逻辑
async function handleLogOut() {
  localStorage.removeItem('token')
  userStore.resetUserInfo()
  ElMessage({
    message: '退出成功！',
    type: 'success',
      plain: true,

  })
  location.reload(true)
}
</script>

<style lang="scss" scoped>
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
      border: 0.125em solid var(--primary-font-color);
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

    .LogOutBtn {
      border: 0.125em solid var(--secondary-func-color);
      color: var(--secondary-func-color);
      padding: 0.5rem;
      &:hover {
        color: var(--secondary-func-color);
        border: 0.125em solid var(--secondary-func-color);
      }
    }

    .login-button {
      cursor: pointer;
      transition: all 0.3s;
      font-size: 1.2rem;
      &:hover {
        color: var(--primary-func-color);
        border: 0.125em solid var(--primary-func-color);
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
        transition: color 0.3s;
        &:hover {
          color: var(--primary-accent-color);
        }
        .icon {
          font-size: 2rem;
        }
      }
    }
  }
}

.userProfile-enter-active,
.userProfile-leave-active {
  transition: all 0.5s;
}

.userProfile-enter-from,
.userProfile-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
