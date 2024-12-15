<template>
  <div class="film-container">
    <FilmShortening v-for="item in 10" :key="item" />
  </div>
</template>

<script setup>
import FilmShortening from '@/components/FilmShortening.vue';

</script>

<style lang="scss" scoped>
.film-container {
width: 100%;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 1rem;
}

@media (max-width: 1024px) {
  .film-container {
    grid-template-columns: 1fr;
  }
}
</style>
