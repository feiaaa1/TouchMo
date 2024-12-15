<template>
  <div class="forum-container">
    <h3>消息</h3>
    <span class="iconfont icon icon-message"></span>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.forum-container {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 45%;
  height: 100%;
  border-radius: 0.7rem;
  background: linear-gradient(to right,#479b77,#499f8c);
  transition: all 1.2s;
    color: var(--secondary-font-color);

      &:hover {
    flex-shrink: 0;

    .icon {
    transform: rotate(0deg) scale(1) translateY(0);
      opacity: 0.8;
      filter: blur(0);
    }
  }

  .icon{
    position: absolute;
    bottom: 0;
    right: 0.7rem;
    font-size: 2.8rem;
    transition: all 1s;
    transform: rotate(20deg) scale(2.8) translateX(-0.2rem) translateY(0.2rem);
    opacity: 0.2;
    filter: blur(1px);
  }


  h3{
    margin-top: 1.2rem;
    margin-left: 1.2rem;

    &::first-letter{
      text-decoration-line: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 5px;
    }
  }


}
</style>
