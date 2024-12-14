<template>
  <div class="random-container" @click="navigateToRandomMovie()">
    <span class="icon iconfont icon-random"></span>
  </div>
</template>

<script setup>
function navigateToRandomMovie() {

}
</script>

<style lang="scss" scoped>
.random-container {
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
  transition: all .3s;
  &:hover{
    background-color: var(--primary-accent-color);
        color: var(--secondary-font-color);
  }

  .icon {
    font-size: 1.5rem;
  }
}
</style>
