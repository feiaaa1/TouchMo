<template>
  <transition name="modifyFavorites">
    <div class="modifyFavorite-Box" v-if="styleStore.showBoxList.isShowModifyFavoritesCard">
      <header>
        <div v-if="!styleStore.FavoriteState.isModifyFavorites">
          <h2 v-if="!isCreate && !styleStore.FavoriteState.isOnlyCreate" class="title">收藏至</h2>
          <p v-if="!styleStore.FavoriteState.isOnlyCreate" @click="isCreate = !isCreate">
            {{ isCreate ? '返回' : '新建收藏夹' }}
          </p>
        </div>
        <h2 v-if="styleStore.FavoriteState.isOnlyCreate" class="title">新建收藏夹</h2>
        <h2 v-if="styleStore.FavoriteState.isModifyFavorites" class="title">编辑收藏夹</h2>
      </header>
      <main>
        <div
          @click="handleMovie(item.id)"
          v-for="item in userStore.userInfo.favorites"
          :key="item.id"
          v-show="
            !isCreate &&
            !styleStore.FavoriteState.isOnlyCreate &&
            !styleStore.FavoriteState.isModifyFavorites
          "
          class="favorites-container"
        >
          <h1>{{ item.name || '无名字' }}</h1>
          <p>{{ item.description || '无描述' }}</p>
        </div>
        <div
          v-show="
            isCreate ||
            styleStore.FavoriteState.isOnlyCreate ||
            styleStore.FavoriteState.isModifyFavorites
          "
          class="create-container"
        >
          <div class="input-container">
            <span class="icon iconfont icon-dir"></span>
            <input placeholder="添加收藏夹名字" v-model="name" id="name" type="text" />
          </div>
          <div class="input-container">
            <span class="icon iconfont icon-description"></span>
            <input
              placeholder="添加收藏夹描述(可选)"
              v-model="description"
              id="description"
              type="text"
            />
          </div>
          <button class="submit-btn btn" @click="handleFavorite()">
            {{ !styleStore.FavoriteState.isModifyFavorites ? '创建' : '修改' }}
          </button>
        </div>
      </main>
    </div>
  </transition>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { useUserStore } from '@/stores/user'
import { ref, watch } from 'vue'
const styleStore = useStyleStateStore()
const userStore = useUserStore()

const isCreate = ref(false)

//处理收藏夹 新建 修改
import { createFavorites } from '@/api/user'
import { modifyFavorites } from '@/api/user'
import { ElMessage } from 'element-plus'

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
        type: 'success',
      })
      isCreate.value = false
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
        type: 'success',
      })
      userStore.getUser()
    })
  }
}

watch(styleStore.showBoxList, (newVal) => {
  if (!newVal.isShowModifyFavoritesCard) {
  (name.value = ''), (description.value = null)
  } else if (styleStore.FavoriteState.isModifyFavorites) {
    //处理修改电影自动填充
    userStore.userInfo.favorites.forEach((item) => {
      if (item.id == styleStore.FavoriteState.currentFavoritesId) {
        name.value = item.name
        description.value = item.description
      }
    })
  }
})

//处理电影进入指定收藏夹（添加或移动）
import { addMovieToFavorites } from '@/api/user'
import { moveMovieToOtherFavorites } from '@/api/user'
async function handleMovie(favoritesId) {
  try {
    if (!styleStore.FavoriteState.currentFavoritesId) {
      const params = {
        filmId: styleStore.FavoriteState.currentFilmId,
        favoriteId: favoritesId,
    }
    const res = await addMovieToFavorites(params)
    console.log('addMovie--->', res)
      styleStore.closeBox()
      ElMessage({
        message: '收藏成功！',
        type: 'success',
      })
    } else {
      const params = {
        filmId: styleStore.FavoriteState.currentFilmId,
        oldFavoriteId: styleStore.FavoriteState.currentFavoritesId,
        newFavoriteId: favoritesId,
      }
      const res = await moveMovieToOtherFavorites(params)
        console.log('moveMovie---->', res)
        styleStore.closeBox()
      ElMessage({
        message: '移动成功！',
        type: 'success',
      })
  }
  }catch(err){
    console.log(err)
  } finally {
    //最后拉取用户信息
    userStore.getUser()
  }
}
</script>

<style lang="scss" scoped>
.modifyFavorite-Box {
  position: fixed;
  z-index: 25;
  left: 50%;
  top: 5rem;
  transform: translateX(-50%);
  width: 30rem;
  height: fit-content;
  border-radius: 0.8rem;
  border: 1px solid var(--primary-border-color);
  background: linear-gradient(to top, var(--secondary-bg-color), var(--tertiary-bg-color));
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  header {
    .title {
      color: var(--primary-font-color);
    }
    p {
      color: var(--primary-func-color);
      cursor: pointer;
      width: fit-content;
      font-style: italic;
      text-decoration-line: underline;

      &:hover {
        color: var(--primary-accent-color);
      }
    }
  }

  main {
    max-height: 508px;
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
      transition:
        color 0.3s,
        border 0.3s;

      h1 {
        transition: color 0.3s;
      }
      p{
        opacity: 0.7;
        font-style: italic;
      }
      &:hover {
        border: 1px solid var(--primary-accent-color);
        h1 {
          color: var(--primary-accent-color);
        }
      }
    }

    .create-container {
      color: var(--secondary-font-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      gap: 2rem;
      .input-container {
        width: 100%;
        position: relative;
        .icon {
          position: absolute;
          top: 50%;
          left: 1rem;
          transform: translateY(-40%);
          color: var(--primary-accent-color);
        }
        input {
          background: none;
          border: 1px solid var(--primary-border-color);
          outline: none;
          width: 100%;
          color: var(--primary-font-color);
          margin-top: 0.5rem;
          background-color: var(--secondary-bg-color);
          border-radius: 0.6rem;
          padding: 0.6rem 1rem;
          padding-left: 2.5rem;
          font-style: italic;
          &:focus {
            border: 1px solid var(--primary-accent-color);
          }
          &::placeholder {
            font-style: italic;
            font-weight: 300;
          }
        }
      }
      .submit-btn {
        width: 100%;
        color: var(--primary-accent-color);
        border-color: var(--primary-accent-color);
        padding: 0.7rem 2rem;
        border-radius: 100rem;
      }
    }
  }
}

.modifyFavorites-enter-active,
.modifyFavorites-leave-active {
  transition: all 0.5s;
}

.modifyFavorites-enter-from {
  transform: translateX(-50%) scale(0.7);
  opacity: 0;
}

.modifyFavorites-leave-to {
  transform: translateX(-50%) translateY(3rem);
  opacity: 0;
}
</style>
