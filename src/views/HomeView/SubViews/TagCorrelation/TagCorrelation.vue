<template>
  <div class="correlate-container">
    <h1>{{ total }}个结果</h1>
    <FilmList :film-list="filmList" :is-show-duration="true" />
  </div>
</template>

<script setup>
import FilmList from '@/components/FilmList.vue'
import { ref } from 'vue'
import { getSearchMovieList } from '@/api/movie'
import { useRoute } from 'vue-router'

const route = useRoute()
const filmList = ref([])
const total = ref(0)

getSearchMovieList({
  categoryId: route.params.tagId,
  page: 1,
  pageSize: 1000,
}).then((res) => {
  console.log(res)
  filmList.value = res.data.record
  total.value = res.data.total
})
</script>

<style lang="scss" scoped>
.correlate-container {
  padding: 2rem;
  h1{
    color: var(--primary-font-color);
    margin-bottom: 2rem;
  }
}
</style>
