<template>
  <div class="favorites-container">
    <div class="left-container">
      <h1>收藏列表</h1>
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script setup>




</script>

<style lang="scss" scoped>
.favorites-container {
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  gap: 1rem;
  color: var(--secondary-font-color);
  .left-container {
    width: 75%;
    padding: 2rem;
    flex-shrink: 0;
    min-height: 20rem;
    border-radius: 0.8rem;
    background-color: var(--tertiary-bg-color);
    border: 1px solid var(--primary-border-color);
    display: flex;
    flex-direction: column;
    gap: 2rem;

  }

  .right-container {
    width: 100%;
    height: 20rem;
    position: sticky;
    top: 5rem;
    border-radius: 0.8rem;
    background-color: var(--tertiary-bg-color);
    border: 1px solid var(--primary-border-color);
  }
}
</style>
