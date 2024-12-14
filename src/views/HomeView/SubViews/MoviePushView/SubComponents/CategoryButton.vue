<template>
  <div class="category-container">
    <h3>分类</h3>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.category-container {
  cursor: pointer;
  width: 40%;
  height: 100%;
  border-radius: 1rem;
  background: linear-gradient(to right,#123c92,#486ab3);
  transition: all 1.2s;
  color: var(--secondary-font-color);

  h3{
    margin-top: 1.2rem;
    margin-left: 1.2rem;

    &::first-letter{
      text-decoration-line: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 5px;
    }
  }

  &:hover {
    flex-shrink: 0;
  }
}
</style>
