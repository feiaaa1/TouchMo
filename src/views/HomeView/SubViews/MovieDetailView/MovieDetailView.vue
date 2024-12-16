<template>
  <div class="detail-container">
    <header>
      <img :src="filmDetail.cover" alt="" />
      <h1>{{ '【' + filmDetail.language + '】' + filmDetail.title }}</h1>
    </header>
    <main>
      <div class="left-container">
        <h1>电影介绍</h1>
        <p>{{ filmDetail.description }}</p>
        <h1>电影海报</h1>
        <img :src="filmDetail.cover" alt="" />
        <h1>电影资源</h1>
        <button class="source-btn">点我获取</button>
      </div>
      <div class="right-container"></div>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

import { getMovieDetail } from '@/api/movie'
import { ref } from 'vue'

const filmDetail = ref({})

getMovieDetail(route.params.id).then((data) => {
  filmDetail.value = data.data
  console.log(filmDetail.value)
})
</script>

<style lang="scss" scoped>
.detail-container {
  header {
    position: relative;
    width: 100%;
    height: 20rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 20px 0px 0px 5rem;

    img {
      width: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      filter: blur(100px);
    }

    h1 {
      color: var(--secondary-font-color);
      font-size: 3rem;
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

      h1 {
        margin-bottom: 0.8rem;
        margin-top: 2rem;
      }

      p {
        color: var(--primary-font-color);
        width: 50%;
        font-size: 1rem;
        line-height: 2rem;
      }

      img {
        border-radius: 0.9rem;
      }

      .source-btn {
        cursor: pointer;
        color: var(--tertiary-bg-color);
        font-size: 1.8rem;
        border-radius: 100rem;
        background-color: var(--primary-font-color);
        width: 12rem;
        height: 4rem;
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
    }
  }
}
</style>
