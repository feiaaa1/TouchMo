<template>
  <div
    class="random-container"
    @click="navigateToRandomMovie()"
    :style="{
      color: `${styleStore.NavigationState.isMovieDetail ? (styleStore.NavigationState.isScrollTop ? 'white' : 'var(--primary-font-color)') : 'var(--primary-font-color)'}`,
    }"
  >
    <span class="icon iconfont icon-random"></span>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
const styleStore = useStyleStateStore()

import { getPushMovieList } from '@/api/movie'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const movieList = ref([])
getPushMovieList().then((res) => {
  movieList.value = res.data
})

async function navigateToRandomMovie() {
  const randomIndex = Math.floor(Math.random() * movieList.value.length)
  const randomMovie = movieList.value[randomIndex]

  router.push({
    name: 'movieDetail',
    params: {
      id: randomMovie.id,
    },
  })
}
</script>

<style lang="scss" scoped>
.random-container {
  box-sizing: border-box;
  cursor: pointer;
  height: 2.2rem;
  width: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100rem;
  font-size: medium;
  font-weight: 400;
  color: var(--primary-font-color);
  transition: all 0.3s;
  &:hover {
    background-color: var(--primary-accent-color);
    .icon {
      color: var(--secondary-font-color);
    }
  }

  .icon {
    font-size: 1.8rem;
  }
}
</style>
