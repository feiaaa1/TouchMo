<template>
  <div class="nav-container" :style="{
  position: styleStore.NavigationState.isMovieDetail ? 'fixed' : 'sticky',
  borderBottom: `1px solid ${styleStore.NavigationState.isScrollTop ? 'transparent' : 'var(--primary-border-color)'}`,
  backgroundColor: `${styleStore.NavigationState.isMovieDetail?styleStore.NavigationState.isScrollTop?'transparent':'var(--primary-bg-color)':'var(--primary-bg-color)'}`
  }">
    <BackHomeButton />
    <div class="nav-right-container">
      <RandomPageButton />
      <SearchButton />
      <ConsoleButton />
      <userButton />
    </div>
  </div>
</template>

<script setup>
import BackHomeButton from './SubComponents/BackHomeButton.vue'
import RandomPageButton from './SubComponents/RandomPageButton.vue'
import SearchButton from './SubComponents/SearchButton.vue'
import ConsoleButton from './SubComponents/ConsoleButton.vue'
import UserButton from './SubComponents/UserButton.vue'
import { useStyleStateStore } from '@/stores/styleState'
const styleStore = useStyleStateStore()


window.onscroll = () => {
  if (scrollY !== 0) {
    styleStore.NavigationState.isScrollTop = false
  } else {
    styleStore.NavigationState.isScrollTop = true
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  top: 0;
  z-index: 20;
  width: 100%;
  padding: 0.8rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all .5s;

  .nav-right-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
  }
}
</style>
