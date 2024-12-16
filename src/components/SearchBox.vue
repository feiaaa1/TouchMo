<template>
  <div class="search-container" v-if="store.showBoxList.isShowSearchBox">
    <div class="flur" @click="closeBox()"></div>
    <div class="searchBox" >
      <header>
        <h1></h1>
        <input type="text" />
      </header>
      <main></main>
    </div>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
const store = useStyleStateStore()

function closeBox() {
  store.closeBox()
}
</script>

<style lang="scss" scoped>
.search-container{
  width: 100%;
  height: 100%;
  .flur{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 14;
    width: 100%;
    height: 100%;
    background-color: #0000009a;
  }
  .searchBox {
    position: absolute;
    z-index: 15;
    left: 50%;
    top: 5rem;
    transform: translateX(-50%);
    width: 30rem;
    height: 85vh;
    border-radius: 0.8rem;
    border: 1px solid var(--primary-border-color);
    background-color: var(--tertiary-bg-color);
  }
}
</style>
