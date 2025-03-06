<template>
  <transition name="search">
    <div class="searchBox" v-if="styleStore.showBoxList.isShowSearchBox">
      <header>
        <div class="title-container">
          <label for="search" class="title">搜索</label>
          <span @click="styleStore.closeBox()" class="icon iconfont icon-close"></span>
        </div>
        <input
          placeholder="搜索文章"
          id="search"
          @input="debouncedGetFilmArr"
          type="text"
          v-model="input"
        />
        <div v-show="isShowHistory" class="history-list">
          <div class="history-header">
            <p class="hitory-title">搜索历史</p>
            <div class="deleteHistory-container">
              <span class="icon iconfont icon-delete"></span>
              <p class="deleteHistoryBtn" @click="handleDeleteHistory()">清空历史记录</p>
            </div>
          </div>
          <div class="history-main">
            <p
              @click="((isShowHistory = false), (input = item.content), getFilmArr())"
              class="historyItem"
              v-for="item in historyList"
              :key="item.id"
            >
              {{ item.content }}
            </p>
          </div>
        </div>
      </header>
      <main>
        <p v-show="isLoading">Loading...</p>
        <template v-if="filmList.length">
          <FilmList :film-list="filmList" :columns="1" />
        </template>
      </main>
    </div>
  </transition>
</template>

<script setup>
import FilmList from './FilmList.vue'
import { useStyleStateStore } from '@/stores/styleState'
import { ref, watch } from 'vue'

const styleStore = useStyleStateStore()

//是否显示搜索历史
const isShowHistory = ref(true)

//获取搜索历史
const historyList = ref([])
import { getHistorySearch } from '@/api/user'

async function handleGetHistorySearch() {
  const res = await getHistorySearch()
  console.log('getHistoryList--->', res)
  historyList.value = res.data
}

handleGetHistorySearch()

//清空搜索历史
import { deleteHistorySearch } from '@/api/user'
async function handleDeleteHistory() {
  try {
    const res = await deleteHistorySearch()
    console.log('deleteHistory', res)
  } catch (error) {
    console.log('清空失败', error)
  } finally {
    handleGetHistorySearch()
  }
}

// 获取搜索的电影列表
import { getSearchMovieList } from '@/api/movie'
import { addHistorySearch } from '@/api/user'
import { debounce } from '@/utils/debounce'
import { ElMessage } from 'element-plus'

//是否显示加载
const isLoading = ref(false)
const input = ref('')
const filmList = ref([])

// 搜索函数
async function getFilmArr() {
  //输入框输入后取消显示搜索历史
  isShowHistory.value = false
  if (input.value == '') {
    filmList.value = []
    return
  }
  const params = {
    content: input.value,
    page: 1,
  }
  isLoading.value = true
  try {
    const getListRes = await getSearchMovieList(params)
    console.log('获取搜索内容--->', getListRes)
    if (getListRes.code === 200) {
      filmList.value = getListRes.data.records
      isLoading.value = false
    } else {
      ElMessage.error('获取搜索内容失败' + getListRes.msg)
    }
  } catch (error) {
    ElMessage.error('获取搜索内容失败' + error)
  } finally {
    isLoading.value = false
  }
  try {
    const addHistoryRes = await addHistorySearch(input.value)
    console.log('添加搜索历史记录--->', addHistoryRes)
    if (addHistoryRes.code !== 200) {
      ElMessage.error('添加搜索历史记录失败--->' + addHistoryRes.msg)
    }
  } catch (error) {
    ElMessage.error('添加搜索历史记录失败--->' + error)
  }
}
// 使用防抖函数包装的搜索函数
const debouncedGetFilmArr = debounce(getFilmArr, 400) // 延迟500毫秒

//关闭逻辑 关闭后 1.清空电影list 2.清空输入框内容
watch(styleStore.showBoxList, (newVal) => {
  if (!newVal.isShowSearchBox) {
    closeBox()
  }
})

function closeBox() {
  input.value = ''
  filmList.value = []
  isShowHistory.value = true
  //重新拉取历史搜索
  getHistorySearch().then((res) => {
    console.log('getHistoryList--->', res)
    historyList.value = res.data
  })
}
</script>

<style lang="scss" scoped>
.searchBox {
  position: fixed;
  z-index: 25;
  left: 50%;
  top: 5rem;
  width: 30rem;
  transform: translateX(-50%);
  max-height: 85vh;
  border-radius: 0.8rem;
  border: 1px solid var(--primary-border-color);
  background-color: var(--tertiary-bg-color);
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  header {
    color: var(--primary-func-color);

    .title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon-close {
        font-size: 0.8rem;
        margin-top: -1rem;
        color: var(--tertiary-font-color);
        cursor: pointer;
        &:hover {
          color: var(--primary-func-color);
        }
      }
    }

    .title {
      display: inline-block;
      margin-bottom: 1rem;
      font-size: 1.4rem;
    }
    input {
      outline: none;
      width: 100%;
      background-color: var(--secondary-bg-color);
      border-radius: 100rem;
      border: 2px solid var(--primary-border-color);
      padding: 0.2rem 0.5rem;
      color: var(--primary-font-color);

      &:focus {
        border: 2px solid var(--primary-func-color);
      }
    }

    .history-list {
      margin-top: 1rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;

      .history-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .deleteHistory-container {
          display: flex;
          gap: 0.2rem;
          cursor: pointer;
          transition: color 0.2s;

          &:hover {
            color: var(--quaternary-func-color);
          }
        }
      }

      .history-main {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 1rem;
        .historyItem {
          cursor: pointer;
          flex-shrink: 0;
          border-radius: 0.5rem;
          opacity: 0.7;
          padding: 0.2rem 0.5rem;
          color: var(--tertiary-font-color);
          border: 1px solid var(--tertiary-font-color);
          transition: all 0.2s;
          &:hover {
            color: var(--primary-func-color);
            border: 1px solid var(--primary-func-color);
          }
        }
      }
    }
  }

  main {
    overflow: scroll;
    height: fit-content;
    p {
      color: var(--secondary-font-color);
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.search-enter-active,
.search-leave-active {
  transition: all 0.5s;
}

.search-enter-from {
  transform: translateX(-50%) scale(0.7);
  opacity: 0;
}

.search-leave-to {
  transform: translateX(-50%) translateY(3rem);
  opacity: 0;
}
</style>
