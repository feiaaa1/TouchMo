<template>
  <div class="console-container" @click="navigateToRandomMovie()">
    <span class="icon iconfont icon-console"></span>
  </div>
</template>

<script setup>
function navigateToRandomMovie() {

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
  transition: all .3s;
  &:hover{
    background-color: var(--primary-accent-color);
  }

  .icon {
    font-size: 1.5rem;
  }
}
</style>
