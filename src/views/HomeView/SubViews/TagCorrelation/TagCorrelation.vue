<template>
  <div class="correlate-container">
    <FilmList :film-list="filmList" />
  </div>
</template>

<script setup>
import FilmList from '@/components/FilmList.vue'
import { ref } from 'vue'
import { getSearchMovieList } from '@/api/movie'
import { useRoute } from 'vue-router'

const route = useRoute()
const filmList = ref([])

getSearchMovieList({
  categoryId: route.params.tagId,
  page: 1,
  pageSize: 1000,
}).then((res) => {
  console.log(res)
  filmList.value = res.data.record
})
</script>

<style lang="scss" scoped>
.correlate-container {
  padding: 2rem;
}
</style>
