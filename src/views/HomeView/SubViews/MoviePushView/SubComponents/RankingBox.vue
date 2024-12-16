<template>
  <div class="ranking-container">
    <FilmList :columns="1" />
  </div>
</template>

<script setup>
import FilmList from './FilmList.vue';
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
