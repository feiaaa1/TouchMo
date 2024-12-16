<template>
  <div class="ranking-container">
    <FilmList :filmList="movieList" :columns="1" />
  </div>
</template>

<script setup>
import FilmList from '@/components/FilmList.vue';
import { getHotPushMovieList } from '@/api/movie';
import { ref } from 'vue';
const movieList = ref([])
getHotPushMovieList().then((data) => {
  console.log('hotPushMovieList===>',data)
  movieList.value = data.data
})
</script>

<style lang="scss" scoped>
.ranking-container {
  width: 100%;
  padding: 2rem;
  background-color: var(--tertiary-bg-color);
  border-radius: 0.9rem;
  border: 1px solid var(--primary-border-color);
}
</style>
