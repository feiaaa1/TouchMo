<template>
  <div class="user-favorites-container">
    <div class="left-container">
      <header>
        <h1>收藏列表</h1>
        <h1 @click="isEntryDir = !isEntryDir;styleStore.FavoriteState.currentFavoritesId = null" v-show="isEntryDir">返回</h1>
        <p @click="styleStore.showBox('isShowModifyFavoritesCard');styleStore.FavoriteState.isOnlyCreate = true" v-show="!isEntryDir">新建收藏夹</p>
      </header>
      <main>
        <div
          @click="entryDir(item.id)"
          v-for="item in userStore.userInfo.favorites"
          :key="item.id"
          v-show="!isEntryDir"
          class="favorites-container"
        >
          <div>
            <h1>{{ item.name || '无名字' }}</h1>
            <p>{{ item.description || '无描述' }}</p>
          </div>
          <span
            @click="subDeleteFavorites($event, item.id)"
            class="icon iconfont icon-delete"
          ></span>
          <span @click="subModifyFavorites($event, item.id);styleStore.FavoriteState.isModifyFavorites = true" class="icon iconfont icon-more"></span>
        </div>
        <FilmList :isMore="true" :filmList="filmList" v-show="isEntryDir"></FilmList>
      </main>
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import FilmList from '@/components/FilmList.vue'

const styleStore = useStyleStateStore()
const userStore = useUserStore()

const isEntryDir = ref(false)
const filmList = ref([])


//获取收藏夹电影列表
import { getFavorites } from '@/api/user'
function entryDir(id) {
  getFavorites(id).then((res) => {
    styleStore.FavoriteState.currentFavoritesId = id
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
    alert('删除成功')
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

    header {
      p {
        cursor: pointer;
        &:hover {
          color: var(--primary-accent-color);
        }
      }
    }

    main {
      .favorites-container {
        color: var(--primary-font-color);
        cursor: pointer;
        border: 1px solid var(--primary-border-color);
        padding: 1rem;
        border-radius: 0.8rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
          h1 {
            color: var(--primary-accent-color);
          }
          .icon-delete {
            &:hover {
              color: #ff0000;
            }
          }
        }
      }
    }

    .right-container {
      width: 100%;
      height: 20rem;
      position: sticky;
      top: 5rem;
      border-radius: 0.8rem;
      background-color: var(--tertiary-bg-color);
      border: 1px solid var(--primary-border-color);
    }
  }
}
</style>
