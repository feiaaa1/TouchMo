<template>
  <div class="forum-container">
    <h3>论坛</h3>
    <span class="iconfont icon icon-forum"></span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.forum-container {
  cursor: pointer;
  position: relative;
  width: 45%;
  height: 100%;
  border-radius: 0.7rem;
  background: linear-gradient(to right, #df351b, #d06b30);
  transition: all 1.2s;
  color: var(--always-white-color);
  overflow: hidden;
  animation: slideUp .9s ease;

  &:hover {
    flex-shrink: 0;

    .icon {
      transform: rotate(0deg) scale(1) translateY(0);
      opacity: 0.8;
      filter: blur(0);
    }
  }

  .icon {
    position: absolute;
    bottom: -0.8rem;
    right: 0rem;
    font-size: 3.5rem;
    transition: all 1s;
    transform: rotate(20deg) scale(2.4) translateX(-0.2rem) translateY(0.5rem);
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
