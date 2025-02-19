<template>
  <div class="film-container" :style="styleObject">
    <FilmShortening
      v-for="item in props.filmList"
      :key="item.id"
      :cover="item.cover"
      :area="item.area"
      :title="item.title"
      :language="item.language"
      :labels="item.labels"
      :id="item.id"
      :score="item.score"
      :status="item.status"
      :releaseTime="item.releaseTime"
      :isMore="props.isMore"
      :isShowRate="props.isShowRate"
      :isShowReleaseTime="props.isShowReleaseTime"
      :isShowStatus="props.isShowStatus"
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
  isShowStatus: {
    type: Boolean,
    default: false,
  },
})

const styleObject = reactive({
  gridTemplateColumns: `repeat(${props.columns},1fr)`,
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
