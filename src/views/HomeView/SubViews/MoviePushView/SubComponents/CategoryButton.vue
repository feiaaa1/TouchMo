<template>
  <div @click="navigateToTagsPage()" class="category-container">
    <h3>分类</h3>
    <span class="iconfont icon icon-category"></span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function navigateToTagsPage() {
  router.push({
    name: 'tags',
  })
}
</script>

<style lang="scss" scoped>
.category-container {
  cursor: pointer;
  position: relative;
  width: 45%;
  height: 100%;
  border-radius: 0.7rem;
  background: linear-gradient(to right, #1a51be, #448cd5);
  transition: all 1.2s;
  color: var(--always-white-color);
  overflow: hidden;

  &:hover {
    flex-shrink: 0;

    .icon {
      transform: rotate(0deg) scale(1);
      opacity: 0.8;
      filter: blur(0);
    }
  }

  .icon {
    position: absolute;
    bottom: 0;
    right: 1.2rem;
    font-size: 2.5rem;
    transition: all 1s;
    transform: rotate(20deg) scale(2) translateX(-0.2rem);
    opacity: 0.2;
    filter: blur(1px);
  }

  h3 {
    margin-top: 1.2rem;
    margin-left: 1.2rem;

    &::first-letter {
      text-decoration-line: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 5px;
    }
  }
}
</style>
