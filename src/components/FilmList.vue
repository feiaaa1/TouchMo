<template>
  <div class="film-container" :style="styleObject">
    <FilmShortening v-for="item in props.filmList" :key="item.id" :cover="item.cover" :area="item.area" :title="item.title" :language="item.language" :categories="item.categories"  :id="item.id" />
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
}

@media (max-width: 1024px) {
  .film-container {
    grid-template-columns: 1fr !important;
  }
}
</style>
