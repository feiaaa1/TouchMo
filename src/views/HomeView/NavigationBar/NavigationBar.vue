<template>
  <div class="nav-container">
    <BackHomeButton />
    <div class="nav-right-container">
      <RandomPageButton />
      <SearchButton />
      <ConsoleButton />
    </div>
  </div>
</template>

<script setup>
import BackHomeButton from './SubComponents/BackHomeButton.vue';
import RandomPageButton from './SubComponents/RandomPageButton.vue';
import SearchButton from './SubComponents/SearchButton.vue';
import ConsoleButton from './SubComponents/ConsoleButton.vue';
</script>

<style lang="scss" scoped>
.nav-container {
  width: 100%;
  padding: 0.7rem;
  background-color: var(--primary-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav-right-container{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    
  }
}
</style>
