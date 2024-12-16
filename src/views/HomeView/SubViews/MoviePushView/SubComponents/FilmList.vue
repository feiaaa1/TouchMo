<template>
  <div class="film-container" :style="styleObject">
    <FilmShortening v-for="item in props.number" :key="item" />
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
  number: {
    type: Number,
    default: 10,
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
