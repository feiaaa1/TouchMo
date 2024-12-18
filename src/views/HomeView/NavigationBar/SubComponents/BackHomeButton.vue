<template>
  <div class="back-container" @click="navigateToHome()">
    <h3>TouchMo</h3>
    <span class="icon iconfont icon-home"></span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function navigateToHome() {
  router.push({ name: 'home' })
}
</script>

<style lang="scss" scoped>
.back-container {
  cursor: pointer;
  position: relative;
  height: 2.2rem;
  padding: 0rem 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100rem;
  font-size: medium;
  font-weight: 700;
  color: var(--primary-font-color);
  transition: all 0.3s;
  &:hover {
    background-color: var(--primary-accent-color);
    color: var(--primary-font-color);
    h3 {
      opacity: 0;
    }
    .icon {
      opacity: 100;
    }
  }

  h3 {
    font-family: 'Chewy-Regular';
    font-size: 1.8rem;
    font-weight: 600;

    &::first-letter {
      text-decoration-line: underline;
      text-underline-offset: 2px;
    }
  }

  .icon {
    position: absolute;
    font-size: 1.7rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s;
    color: var(--secondary-font-color);
  }
}
</style>
