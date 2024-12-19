<template>
  <div class="search-container" v-if="store.showBoxList.isShowSearchBox">
    <div class="flur" @click="closeBox()"></div>
    <div class="searchBox">
      <header>
        <label for="search" class="title">搜索</label>
        <input id="search" @input="debouncedGetFilmArr" type="text" v-model="input" />
        <div v-show="isShowHistory" class="history-list">
          <div class="history-header">
            <p class="hitory-title">搜索历史</p>
            <p class="deleteHistoryBtn" @click="handleDeleteHistory()">清空历史记录</p>
          </div>
          <div class="history-main">
            <p
              @click="
                isShowHistory = false;
              input = item;
              getFilmArr()
              "
              class="historyItem"
              v-for="item in historyList"
              :key="item"
            >
              {{ item }}
            </p>
          </div>
        </div>
      </header>
      <main>
        <p v-show="isLoading">Loading...</p>
        <FilmList v-if="filmList" :film-list="filmList" :columns="1" />
      </main>
    </div>
  </div>
</template>

<script setup>
import FilmList from './FilmList.vue'
import { useStyleStateStore } from '@/stores/styleState'
import { ref } from 'vue'
const store = useStyleStateStore()

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
    console.log('deleteHistory',res);
  }
  catch (error) {
    console.log('清空失败',error);
  }
  finally {
    handleGetHistorySearch()
  }
}

// 获取搜索的电影列表
import { getSearchMovieList } from '@/api/movie'
import { addHistorySearch } from '@/api/user'
import { debounce } from '@/utils/debounce'

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
    name: input.value,
    page: 1,
    pageSize: 10,
  }
  isLoading.value = true
  const getListRes = await getSearchMovieList(params)
  filmList.value = getListRes.data.record
  isLoading.value = false
  const addHistoryRes = await addHistorySearch(input.value)
  console.log('addHistoryRes--->', addHistoryRes)
}
// 使用防抖函数包装的搜索函数
const debouncedGetFilmArr = debounce(getFilmArr, 400) // 延迟500毫秒

//关闭逻辑 关闭后 1.清空电影list 2.清空输入框内容
function closeBox() {
  input.value = ''
  filmList.value = []
  isShowHistory.value = true
  //重新拉取历史搜索
  getHistorySearch().then((res) => {
  console.log('getHistoryList--->', res)
  historyList.value = res.data
})
  store.closeBox()
}
</script>

<style lang="scss" scoped>
.search-container {
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
  .searchBox {
    position: fixed;
    z-index: 15;
    left: 50%;
    top: 5rem;
    transform: translateX(-50%);
    width: 30rem;
    max-height: 85vh;
    border-radius: 0.8rem;
    border: 1px solid var(--primary-border-color);
    background-color: var(--tertiary-bg-color);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    header {
      color: var(--primary-func-color);

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
        border: 1px solid var(--primary-border-color);
        padding: 0.2rem 0.5rem;
        color: var(--primary-font-color);

        &:focus {
          border: 1px solid var(--primary-func-color);
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

          .deleteHistoryBtn {
            cursor: pointer;
            &:hover {
              color: var(--primary-accent-color);
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
            border-radius: 0.3rem;
            padding: 0.2rem 0.5rem;
            color: var(--primary-font-color);
            border: 1px solid var(--primary-font-color);
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
      p {
        color: var(--secondary-font-color);
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
