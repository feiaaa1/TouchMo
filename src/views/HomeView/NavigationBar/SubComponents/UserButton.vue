<template>
  <div class="console-container" @click="showLoginBox()"  :style="{
  color: `${styleStore.NavigationState.isMovieDetail?styleStore.NavigationState.isScrollTop?'white':'var(--primary-font-color)':'var(--primary-font-color)'}`
  }">
    <span class="icon iconfont icon-user"></span>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
const styleStore = useStyleStateStore()
function showLoginBox() {
  styleStore.showBox('isShowUserCard')
}
</script>

<style lang="scss" scoped>
.console-container {
  box-sizing: border-box;
  cursor: pointer;
  height: 2.2rem;
  width: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100rem;
  font-size: medium;
  font-weight: 400;
  color: var(--primary-font-color);
  transition: all 0.3s;
  &:hover {
    background-color: var(--primary-accent-color);

    .icon {
      color: var(--secondary-font-color);
    }
  }

  .icon {
    font-size: 1.5rem;
  }
}
</style>
