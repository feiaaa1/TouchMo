<template>
  <div class="explain-container">
    <div class="title-box">
      <h3>入站必读</h3>
      <h1>网站说明与常见问题</h1>
    </div>
    <div class="recommend-button">
      <span class="icon icon-arrow-right-top iconfont"></span>
      <p>更多推荐</p>
    </div>
    <div class="focus-bg"></div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.explain-container {
  cursor: pointer;
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 0.7rem;
  overflow: hidden;
      background-image: url("https://i.ibb.co/L9KM33L/frame-at-0m3s.jpg");
  background-position: center;
  background-clip: cover;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, var(--primary-bg-color)20%,#00000000);
  }

  .recommend-button {
    position: absolute;
    bottom: 1.8rem;
    right: 2.2rem;
    z-index: 1;
    height: 2rem;
    padding: 1.3rem 0.8rem;
    background: var(--primary-border-color);
    border-radius: 100rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem;
    transition: all .3s;

    &:hover{
      background-color: var(--primary-accent-color);
      .icon {
        color: var(--primary-accent-color);
      }
    }
    p {
      font-size: 1rem;
      color: var(--secondary-font-color);
    }

    .icon {
      height: 1.2rem;
      border-radius: 100rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: var(--primary-border-color);
      background-color: var(--secondary-font-color);
      transition: all .3s;
    }
  }

  .title-box{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    padding: 2.2rem;

    h3{
      font-size: 0.8rem;
      font-weight: 300;
      color: var(--secondary-font-color);
    }

    h1 {
      margin-top: 5px;
      font-size: 1.7rem;
      line-height: 1;
      color: var(--secondary-font-color);
    }
  }

  .focus-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse farthest-corner at center, #ed656500 60%, #000000b6 100%);
  }
}
</style>
