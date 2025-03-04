<template>
  <div v-if="isLoadComplete" class="detail-container">
    <header>
      <img :src="filmDetail.cover" alt="" />
      <div class="header-main-container">
        <div class="tags-container">
          <TagComponent
            v-for="item in filmDetail.labels"
            :key="item.id"
            :name="item.name"
            :id="item.id"
            :fontSize="1"
            tagType="label"
          />
        </div>

        <h1>
          {{
            '【' + filmDetail.languages.map((item) => item.name).join('/') + '】' + filmDetail.title
          }}
        </h1>
        <div class="releaseTime-container">
          <span class="icon iconfont icon-calendar"></span>
          <span>{{ '发表于 ' + filmDetail.releaseTime }}</span>
        </div>
      </div>
    </header>
    <main>
      <div class="left-container">
        <!-- 电影介绍 -->
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>电影介绍</h1>
        </div>
        <p class="description">{{ filmDetail.description }}</p>
        <!-- 电影海报 -->
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>电影海报</h1>
        </div>
        <img :src="filmDetail.cover" alt="" />

        <!-- 演职员 -->
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>演职员</h1>
        </div>
        <FilmCastCrew />

        <!-- 评分区 -->
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>评个分吧</h1>
        </div>
        <FilmRating />

        <!-- 收藏区 -->
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>点击收藏</h1>
        </div>
        <ButtonEle
          text="收藏"
          width="10rem"
          font-size="1.2rem"
          height="4"
          color="var(--primary-accent-color)"
          @click="styleStore.showBox('isShowModifyFavoritesCard', filmDetail.id)"
        />

        <!-- 资源获取区 -->
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>电影资源</h1>
        </div>
        <ButtonEle
          color="var(--primary-accent-color)"
          text="点击获取"
          width="10rem"
          height="4"
          font-size="1.2rem"
          @click="router.push({ name: 'moviePlayer', params: { id: route.params.id } })"
        />

        <!-- 评论区 -->

        <FilmComments />
      </div>
      <div class="right-container"></div>
    </main>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useStyleStateStore } from '@/stores/styleState'
import ButtonEle from '@/components/ButtonEle.vue'
import FilmCastCrew from './SubComponents/FilmCastCrew.vue'
import FilmRating from './SubComponents/FilmRating.vue'
import FilmComments from './SubComponents/FilmComments.vue'

const styleStore = useStyleStateStore()
const route = useRoute()
const router = useRouter()
const isLoadComplete = ref(false)

//获取电影详情信息逻辑
import { getMovieDetail } from '@/api/movie'
import { provide, ref, watch } from 'vue'
import { delay } from '@/utils/delay'

//获取电影详情信息
async function getMovie() {
  try {
    styleStore.startNewRequest()
    const res = await getMovieDetail(route.params.id)
    console.log('获取电影信息getFilmDetail--->', res)
    if (res.code === 200) {
      filmDetail.value = res.data
      styleStore.enqueueProgress(100, styleStore.currentVersion)
      await delay(300)
      isLoadComplete.value = true
    } else {
      ElMessage({
        type: 'error',
        message: '获取电影信息失败，' + res.msg,
        plain: true,
      })
      return
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '获取电影信息失败，' + error,
      plain: true,
    })
  }
}
const filmDetail = ref({}) //电影详细信息
provide('filmDetail', filmDetail) //当获取完电影数据后向子组件注入数据
getMovie() //初始获取电影信息，当获取完成后才渲染子组件

watch(
  () => route.params.id,
  () => {
    getMovie()
  },
)
</script>

<style lang="scss" scoped>
.detail-container {
  header {
    position: relative;
    width: 100%;
    height: 30rem;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0px 0px 5rem;
    gap: 0.5rem;
    color: var(--always-entire-white-color);
    img {
      width: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      filter: blur(100px);
      transform: scale(1.4);
    }

    .header-main-container {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      animation: slideUp 1.1s ease -0.2s;
      h1 {
        transform: translateX(-1.5rem);
        font-size: 3.5rem;
      }

      .tags-container {
        display: flex;
        align-items: center;
        justify-content: start;
        opacity: 0.9;
      }

      .releaseTime-container {
        opacity: 0.7;
        display: flex;
        gap: 5px;
      }
    }
  }

  main {
    width: 100%;
    padding: 2rem;
    display: flex;
    gap: 1rem;

    .left-container {
      width: 75%;
      flex-shrink: 0;
      font-size: 0.8rem;
      color: var(--secondary-font-color);
      border-radius: 0.8rem;
      padding: 2.3rem;
      border: 1px solid var(--primary-border-color);
      background-color: var(--tertiary-bg-color);
      animation: slideUp 1.1s ease -0.1s;

      /*
      用于设置电影介绍字体
      */
      .description {
        color: var(--primary-font-color);
        width: 50%;
        font-size: 1rem;
        line-height: 2rem;
      }

      img {
        border-radius: 0.9rem;
      }

      .title-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 3rem;
        margin-bottom: 0.6rem;
        &:first-child {
          margin-top: 1rem;
        }
        .icon {
          font-size: 1.2rem;
        }
      }
    }

    .right-container {
      position: sticky;
      top: 5rem;
      width: 100%;
      border: 1px solid var(--primary-border-color);
      border-radius: 0.8rem;
      height: 30rem;
      background-color: var(--tertiary-bg-color);
      animation: slideUp 1.1s ease;
    }
  }
}
</style>
