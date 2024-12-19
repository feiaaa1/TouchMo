<template>
  <div class="modifyFavorite-container" v-if="styleStore.showBoxList.isShowModifyFavoritesCard">
    <div class="flur" @click="closeBox()"></div>
    <div class="modifyFavorite-Box">
      <header v-if="!styleStore.FavoriteState.isModifyFavorites">
        <h2 v-show="!isCreate && !styleStore.FavoriteState.isOnlyCreate" class="title">收藏至</h2>
        <p v-if="!styleStore.FavoriteState.isOnlyCreate" @click="isCreate = !isCreate">
          {{ isCreate ? '返回' : '新建收藏夹' }}
        </p>
      </header>
      <main>
        <div
          @click="handleMovie(item.id)"
          v-for="item in userStore.userInfo.favorites"
          :key="item.id"
          v-show="!isCreate && !styleStore.FavoriteState.isOnlyCreate && !styleStore.FavoriteState.isModifyFavorites"
          class="favorites-container"
        >
          <h1>{{ item.name || '无名字' }}</h1>
          <p>{{ item.description || '无描述' }}</p>
        </div>
        <div
          v-show="isCreate || styleStore.FavoriteState.isOnlyCreate || styleStore.FavoriteState.isModifyFavorites"
          class="create-container"
        >
          <label for="name">名字</label>
          <input v-model="name" id="name" type="text" />
          <label for="description">描述</label>
          <input v-model="description" id="description" type="text" />
          <button @click="handleFavorite()">提交</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
const styleStore = useStyleStateStore()
const userStore = useUserStore()

const isCreate = ref(false)

//处理收藏夹 新建 修改
import { createFavorites } from '@/api/user'
import { modifyFavorites } from '@/api/user'
import { ElMessage, ElNotification } from 'element-plus'
const name = ref('')
const description = ref(null)
function handleFavorite() {
  if (!styleStore.FavoriteState.isModifyFavorites) {
    const params = {
      id: null,
      name: name.value,
      userId: userStore.userInfo.id,
      description: description.value,
    }
    createFavorites(params).then((res) => {
      console.log('createFavo-->', res)
      styleStore.closeBox()
      //清空输入框 更新数据
      name.value = ''
      description.value = null
      ElMessage({
        title: 'Success',
        message: '创建成功',
        type: 'success'
      })
      userStore.getUser()
    })
  } else {
    const params = {
      id: styleStore.FavoriteState.currentFavoritesId,
      name: name.value,
      userId: userStore.userInfo.id,
      description: description.value,
    }
    modifyFavorites(params).then((res) => {
      console.log('modifyFavorites--->', res)
      styleStore.closeBox()

      //清空输入框 更新数据
      name.value = ''
      description.value = null
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
      userStore.getUser()
    })
  }
}

//处理电影进入指定收藏夹（添加或移动）
import { addMovieToFavorites } from '@/api/user'
import { moveMovieToOtherFavorites } from '@/api/user'
function handleMovie(favoritesId) {
  if (!styleStore.FavoriteState.currentFavoritesId){
    const params = {
      filmId: styleStore.FavoriteState.currentFilmId,
      favoriteId: favoritesId,
    }
    addMovieToFavorites(params).then((res) => {
      console.log('addMovie--->', res)
      styleStore.closeBox()
            ElMessage({
        message: '收藏成功',
        type: 'success'
      })
    })
  } else {
    const params = {
      filmId: styleStore.FavoriteState.currentFilmId,
      oldFavoriteId: styleStore.FavoriteState.currentFavoritesId,
      newFavoriteId: favoritesId,
    }
    moveMovieToOtherFavorites(params).then((res) => {
      console.log('moveMovie---->', res)
      styleStore.closeBox()
            ElMessage({
        message: '收藏成功',
        type: 'success'
      })
    })
  }
}

//关闭后 1.清空电影list 2.清空输入框内容
function closeBox() {
  styleStore.closeBox()
}
</script>

<style lang="scss" scoped>
.modifyFavorite-container {
  width: 100%;
  height: 100%;
  .flur {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 14;
    width: 100%;
    height: 100%;
    background-color: #0000009a;
  }
  .modifyFavorite-Box {
    position: fixed;
    z-index: 15;
    left: 50%;
    top: 5rem;
    transform: translateX(-50%);
    width: 30rem;
    height: 85vh;
    border-radius: 0.8rem;
    border: 1px solid var(--primary-border-color);
    background-color: var(--tertiary-bg-color);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    header {
      color: var(--primary-func-color);

      p {
        cursor: pointer;
        &:hover {
          color: var(--primary-accent-color);
        }
      }
    }

    main {
      overflow: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      .favorites-container {
        color: var(--primary-font-color);
        cursor: pointer;
        border: 1px solid var(--primary-border-color);
        padding: 1rem;
        border-radius: 0.8rem;
        margin-bottom: 1rem;

        &:hover {
          h1 {
            color: var(--primary-accent-color);
          }
        }
      }

      .create-container {
        color: var(--secondary-font-color);
        input {
          outline: none;
          width: 100%;
          background-color: var(--secondary-bg-color);
          border-radius: 100rem;
          border: 1px solid var(--primary-border-color);
          padding: 0.2rem 0.5rem;
          color: var(--primary-font-color);
          margin-bottom: 2rem;

          &:focus {
            border: 1px solid var(--primary-func-color);
          }
        }
      }
    }
  }
}
</style>
