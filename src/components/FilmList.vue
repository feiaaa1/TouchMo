<template>
  <div
    class="film-container"
    :style="{
      gridTemplateColumns: `repeat(${props.columns},1fr)`,
    }"
  >
    <FilmShortening
      v-for="item in props.filmList"
      :key="item.id ? item.id : item"
      :filmItem="item"
      :isMore="props.isMore"
      :isShowRate="props.isShowRate"
      :isShowReleaseTime="props.isShowReleaseTime"
      :isShowHotLabel="props.isShowHotLabel"
    />
  </div>
</template>

<script setup>
import FilmShortening from '@/components/FilmShortening.vue'
import { reactive } from 'vue'

const props = defineProps({
  columns: {
    type: Number,
    default: 2,
  },
  filmList: {
    type: Object,
  },
  isMore: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    default: 0,
  },
  isShowRate: {
    type: Boolean,
    default: false,
  },
  isShowReleaseTime: {
    type: Boolean,
    default: false,
  },
  isShowHotLabel: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.film-container {
  width: 100%;
  display: grid;
  gap: 1rem;
  animation: slideUp 0.5s ease;
}

@media (max-width: 1024px) {
  .film-container {
    grid-template-columns: 1fr !important;
  }
}
</style>
