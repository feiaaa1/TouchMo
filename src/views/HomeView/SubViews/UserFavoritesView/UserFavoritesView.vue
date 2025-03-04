<template>
  <div class="user-favorites-container">
    <div class="left-container">
      <!-- 头部信息 返回、新建等 -->
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
      <!-- 收藏夹列表展示主体 -->
      <main>
        <!-- 收藏夹主体 -->
        <div
          v-show="!isEntryDir"
          @click="entryDir(item)"
          v-for="item in userStore.userInfo.favorites.records"
          :key="item.id"
          class="favorites-container"
        >
          <!-- 标题、内容数等 -->
          <div class="favorites-container-title-header">
            <h1>{{ item.name || '无名字' }}</h1>
            <h4 style="opacity: 0.7; font-weight: 400; font-style: italic">
              {{ item.total + '个内容' }}
            </h4>
          </div>
          <!-- 右边图标功能区 -->
          <div class="icon-container">
            <PopupSelector
              :options="[
                { text: '删除', value: 0 },
                { text: '修改', value: 1 },
              ]"
              @select="handleMoreBtnEvent($event, item.id)"
            >
              <button>
                <!-- v-if="item.userId === userStore.userInfo.id" -->
                <span class="icon iconfont icon-more"></span>
              </button>
            </PopupSelector>
          </div>
        </div>
        <!-- 收藏夹下的电影列表展示 -->
        <transition name="filmList">
          <FilmList :isMore="true" :filmList="filmList" v-show="isEntryDir"></FilmList>
        </transition>
      </main>
    </div>
    <div class="right-container"></div>
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
const currentPage = ref(1)
const sortOrder = ref(1)

//初始拉取第一页收藏夹列表
userStore.getUserFavoritesList(currentPage.value, sortOrder.value)

const isEntryDir = ref(false) //进入收藏夹状态
const curDir = ref(null) //当前进入的收藏夹Id

async function handleMoreBtnEvent(value, dirId) {
  if (value === 0) {
    //删除操作
    subDeleteFavorites(dirId)
  } else if (value === 1) {
    //修改操作
    subModifyFavorites(dirId)
  }
}

//获取收藏夹电影列表
import { getFavorites } from '@/api/user'
const filmList = ref([])
const filmListCurrentPage = ref(1) //收藏夹下的电影列表当前页
const filmListSortOrder = ref(1) //收藏夹下的电影列表排序方式
async function entryDir(dir) {
  try {
    const res = await getFavorites(dir.id, {
      page: filmListCurrentPage.value,
      sortOrder: filmListSortOrder.value,
    })
    console.log('获取收藏夹电影列表结果--->', res)
    if (res.code === 200) {
      styleStore.FavoriteState.currentFavoritesId = dir.id
      curDir.value = dir
      isEntryDir.value = true
      filmList.value = res.data.records
    } else {
      ElMessage({
        message: '获取收藏夹电影列表失败，' + res.msg,
        type: 'error',
        plain: true,
      })
    }
  } catch (error) {
    ElMessage({
      message: '获取收藏夹电影列表失败，' + error,
      type: 'error',
      plain: true,
    })
  }
}

//删除收藏夹处理
import { deleteFavorites } from '@/api/user'
async function subDeleteFavorites(favoriteId) {
  try {
    const res = await deleteFavorites('favoriteIds=' + favoriteId)
    console.log('deleteDir-->', res)
    if (res.code === 200) {
      ElMessage({
        message: '删除收藏夹成功',
        type: 'success',
        plain: true,
      })
      // 拉取新的收藏夹列表
      userStore.getUserFavoritesList(currentPage.value, sortOrder.value)
    } else {
      ElMessage({
        message: '删除收藏夹失败，' + res.msg,
        type: 'error',
        plain: true,
      })
    }
  } catch (error) {
    ElMessage({
      message: '删除收藏夹失败，' + error,
      type: 'error',
      plain: true,
    })
  }
}
//修改文件夹处理
function subModifyFavorites(favoritesId) {
  styleStore.showBox('isShowModifyFavoritesCard')
  styleStore.FavoriteState.isModifyFavorites = true
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
          .icon-container button {
            color: var(--primary-font-color);
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
          button {
            border: none;
            background-color: transparent;
            color: transparent;
            transition: all 0.3s;
            font-size: 1.2rem;
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
    padding: 1rem 1.5rem;
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
