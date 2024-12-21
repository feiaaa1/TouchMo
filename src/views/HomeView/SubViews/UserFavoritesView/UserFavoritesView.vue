<template>
  <div class="user-favorites-container">
    <div class="left-container">
      <header>
        <div
          style="cursor: pointer"
          @click="
            (((isEntryDir = !isEntryDir), (styleStore.FavoriteState.currentFavoritesId = null)),
            (filmList = []))
          "
          v-if="isEntryDir"
          class="title"
        >
          <span class="icon iconfont icon-back"></span>
          <h1>返回</h1>
        </div>
        <div v-else class="title">
          <span class="icon iconfont icon-dir"></span>
          <h1>收藏夹</h1>
        </div>
        <span
          @click="
            (styleStore.showBox('isShowModifyFavoritesCard'),
            (styleStore.FavoriteState.isOnlyCreate = true))
          "
          v-show="!isEntryDir"
          class="icon iconfont icon-plus"
        >
        </span>
      </header>
      <main>
        <div
          v-show="!isEntryDir"
          @click="entryDir(item)"
          v-for="item in userStore.userInfo.favorites"
          :key="item.id"
          class="favorites-container"
        >
          <div class="favorites-container-title-header">
            <h1>{{ item.name || '无名字' }}</h1>
            <h4 style="opacity: 0.7; font-weight: 400; font-style: italic">
              {{ item.filmNum + '个内容' }}
            </h4>
          </div>
          <div class="icon-container">
            <span
              @click="subDeleteFavorites($event, item.id)"
              class="icon iconfont icon-delete"
            ></span>
            <span
              @click="
                (subModifyFavorites($event, item.id),
                (styleStore.FavoriteState.isModifyFavorites = true))
              "
              class="icon iconfont icon-more"
            ></span>
          </div>
        </div>
        <transition name="filmList">
          <FilmList :isMore="true" :filmList="filmList" v-show="isEntryDir"></FilmList>
        </transition>
      </main>
    </div>
    <div class="right-container">
      <template v-if="curDir">
        <h2>{{curDir.name}}</h2>
        <p>{{curDir.description}}</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import FilmList from '@/components/FilmList.vue'

const styleStore = useStyleStateStore()
const userStore = useUserStore()

const isEntryDir = ref(false)
const curDir = ref(null)

//获取收藏夹电影列表
import { getFavorites } from '@/api/user'
const filmList = ref([])
function entryDir(dir) {
  getFavorites(dir.id).then((res) => {
    styleStore.FavoriteState.currentFavoritesId = dir.id
    curDir.value = dir
    isEntryDir.value = true
    filmList.value = res.data
  })
}

//删除收藏夹处理
import { deleteFavorites } from '@/api/user'
function subDeleteFavorites(e, favoriteId) {
  e.stopPropagation()
  deleteFavorites(favoriteId).then((res) => {
    console.log('deleteDir-->', res)
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
    userStore.getUser()
  })
}

//修改文件夹处理
function subModifyFavorites(e, favoritesId) {
  e.stopPropagation()
  styleStore.showBox('isShowModifyFavoritesCard')
  styleStore.FavoriteState.currentFavoritesId = favoritesId
}
</script>

<style lang="scss" scoped>
.user-favorites-container {
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  gap: 1rem;
  color: var(--secondary-font-color);
  .left-container {
    width: 75%;
    padding: 2rem;
    flex-shrink: 0;
    min-height: 20rem;
    border-radius: 0.8rem;
    background-color: var(--tertiary-bg-color);
    border: 1px solid var(--primary-border-color);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: slideUp 1s -0.2s;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        display: flex;
        align-items: center;
        gap: 1rem;

        h1 {
          font-size: 1.8rem;
        }

        .icon {
          font-size: 2rem;
        }
      }

      .icon-plus {
        cursor: pointer;
        font-size: 1.2rem;
        transition: color 0.3s;

        &:hover {
          color: var(--primary-font-color);
        }
      }
    }

    main {
      .favorites-container {
        color: var(--primary-font-color);
        cursor: pointer;
        border: 1px solid var(--primary-border-color);
        padding: 2rem;
        border-radius: 0.8rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition:
          color 0.3s,
          border 0.3s;

        &:hover {
          border: 1px solid var(--primary-accent-color);
          h1 {
            color: var(--primary-accent-color);
          }
        }

        .favorites-container-title-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        h1 {
          transition: color 0.3s;
        }

        .icon-container {
          align-self: flex-end;
          display: flex;
          gap: 1rem;

          .icon {
            font-size: 1.2rem;
            transition: color 0.3s;
          }
          .icon-delete {
            &:hover {
              color: var(--secondary-func-color);
            }
          }
          .icon-more {
            &:hover {
              color: var(--primary-func-color);
            }
          }
        }
      }
    }
  }

  .right-container {
    animation: slideUp 1s;
    width: 100%;
    height: 20rem;
    position: sticky;
    top: 5rem;
    border-radius: 0.8rem;
    background-color: var(--tertiary-bg-color);
    border: 1px solid var(--primary-border-color);
  }
}

.filmList-enter-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.filmList-enter-from {
  opacity: 0;
  transform: translateY(2rem);
}

.filmList-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.filmList-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}
</style>
