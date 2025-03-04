<template>
  <div class="ranking-container">
    <div class="title-container">
      <span class="icon iconfont icon-hot"></span>
      <h2>热门推荐</h2>
    </div>
    <FilmList :filmList="props.movieList" :isShowHotLabel="true" :columns="1" />
  </div>
</template>

<script setup>
import FilmList from '@/components/FilmList.vue'

const props = defineProps({
  movieList: Array,
})
</script>

<style lang="scss" scoped>
.ranking-container {
  width: 100%;
  padding: 1rem 2rem;
  background-color: var(--tertiary-bg-color);
  border-radius: 0.9rem;
  border: 1px solid var(--primary-border-color);
  .title-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: var(--primary-font-color);
    gap: 0.5rem;
    .icon {
      font-size: 1.5rem;
    }
  }
}
</style>
