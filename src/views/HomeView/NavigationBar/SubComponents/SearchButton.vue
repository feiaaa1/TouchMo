<template>
  <div class="search-container" @click="showSearchBox()">
    <span class="icon iconfont icon-search"></span>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
const store = useStyleStateStore()
function showSearchBox() {
  store.showBox('isShowSearchBox')
}
</script>

<style lang="scss" scoped>
.search-container {
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
    color: var(--secondary-font-color);
  }

  .icon {
    font-size: 1.6rem;
  }
}
</style>
