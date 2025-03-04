<template>
  <div v-if="isLoadComplete" class="push-container">
    <div class="header-section">
      <div class="header-left">
        <WelcomCard />
        <div class="tab-container">
          <CategoryButton />
          <ForumButton />
          <MessageButton />
        </div>
      </div>
      <div class="header-right">
        <ExplainCard />
      </div>
    </div>

    <div class="main-content">
      <div class="film-list-section">
        <div class="select-bar">
          <p>推荐</p>
          <TagComponent
            v-for="tag in tagList"
            :key="tag.id"
            :id="tag.id"
            :name="tag.name"
            :isLinkIcon="false"
            :is-filter-style="true"
            tag-type="category"
          />
          <span class="icon iconfont icon-shoMore"></span>
          <span class="showMoreBtn" @click="router.push('MediaFilterView')">更多</span>
        </div>
        <FilmList
          :filmList="movieList"
          :columns="2"
          :isShowRate="true"
          :isShowReleaseTime="true"
          :isShowStatus="true"
        />
      </div>
      <div class="ranking-section">
        <RankingBox :movieList="rankingMovieList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import WelcomCard from './SubComponents/WelcomCard.vue'
import ExplainCard from './SubComponents/ExplainCard.vue'
import CategoryButton from './SubComponents/CategoryButton.vue'
import ForumButton from './SubComponents/ForumButton.vue'
import MessageButton from './SubComponents/MessageButton.vue'
import FilmList from '@/components/FilmList.vue'
import RankingBox from './SubComponents/RankingBox.vue'
import TagComponent from '@/components/TagComponent.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStyleStateStore } from '@/stores/styleState'
const styleState = useStyleStateStore()

const router = useRouter()

import { getPushMovieList } from '@/api/movie'
const movieList = ref([])
const isLoadComplete = ref(false)

async function handleGetPushMovieList() {
  try {
    const res = await getPushMovieList()
    console.log('获取推荐电影列表结果----->', res)
    if (res.code === 200) {
      movieList.value = res.data
    } else {
      ElMessage.error('获取推荐电影列表失败，' + res.msg)
    }
  } catch (error) {
    ElMessage.error('获取推荐电影列表失败，' + error)
  }
}

import { getAllTagsList } from '@/api/movie'
const tagList = ref([])
async function handleGetAllTagsList() {
  try {
    const res = await getAllTagsList()
    console.log('获取所有标签tagList===>', res)
    if (res.code === 200) {
      tagList.value = res.data.slice(0, 8)
    } else {
      ElMessage.error('获取所有标签列表失败，' + res.msg)
    }
  } catch (error) {
    ElMessage.error('获取所有标签列表失败，' + error)
  }
}

import { getHotPushMovieList } from '@/api/movie'
import { ElMessage } from 'element-plus'
import { delay } from '@/utils/delay'
const rankingMovieList = ref([])
async function handleGetHotPushMovieList() {
  try {
    styleState.startNewRequest()
    const res = await getHotPushMovieList()
    console.log('获取热门电影列表hotPushMovieList===>', res)
    if (res.code === 200) {
      rankingMovieList.value = res.data
      // 请求完成时强制更新到 100%
      styleState.enqueueProgress(100, styleState.currentVersion)
      await delay(300)//等待进度条动画完成
      isLoadComplete.value = true
    } else {
      ElMessage.error('获取热门电影列表失败，' + res.msg)
    }
  } catch (error) {
    ElMessage.error('获取热门电影列表失败，' + error)
  }
}
handleGetPushMovieList()

handleGetAllTagsList()

handleGetHotPushMovieList()
</script>

<style lang="scss" scoped>
.push-container {
  color: var(--primary-font-color);
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  padding: 1.5rem 2.5rem;
  flex-direction: column;
  gap: 2rem;
  .header-section {
    width: 100%;
    height: 21.5rem;
    display: flex;
    gap: 1rem;

    .header-left {
      flex-shrink: 0;
      width: 53%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow: hidden;

      .tab-container {
        flex-shrink: 1;
        width: 100%;
        height: 100%;
        display: flex;
        gap: 1rem;
        animation: slideUp 1.1s ease;
      }
    }

    .header-right {
      width: 100%;
      height: 100%;
      animation: slideUp 1.1s ease -0.1s;
    }
  }

  .main-content {
    width: 100%;
    display: flex;
    gap: 1rem;
    .film-list-section {
      flex-shrink: 0;
      width: 75%;
      display: flex;
      flex-direction: column;
      animation: slideUp 1.1s ease;
      gap: 1rem;
      .select-bar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 0.3rem;
        padding: 0.7rem;
        border: 1px solid var(--primary-border-color);
        transition: border 0.3s;
        border-radius: 0.7rem;
        background-color: var(--tertiary-bg-color);
        &:hover {
          border-color: var(--primary-accent-color);
        }
        .icon-shoMore {
          color: var(--primary-font-color);
          font-size: 1.1rem;
          cursor: pointer;
          margin-left: 1.5rem;
          margin-right: 0.6rem;
          transition: all 0.3s;

          &:hover {
            color: var(--primary-accent-color);
          }
        }
        .showMoreBtn {
          cursor: pointer;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--primary-font-color);
          transition: all 0.4s;
          &:hover {
            color: var(--primary-accent-color);
          }
        }
        p {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--always-white-color);
          transition: all 0.4s;
          border-radius: 0.5rem !important;
          padding: 0.1rem 0.8rem !important;
          cursor: pointer;
          background-color: var(--primary-accent-color);
        }
      }
    }

    .ranking-section {
      flex-grow: 1;
      animation: slideUp 1.3s ease -0.1s;
    }
  }
}
@media (max-width: 1024px) {
  .header-left {
    width: 100% !important;
  }
  .header-right {
    display: none;
  }
  .main-content {
    .film-list-section {
      flex-shrink: 0;
      width: 100% !important;
      display: flex;
      flex-direction: column;
    }

    .ranking-section {
      display: none;
    }
  }
}
</style>
