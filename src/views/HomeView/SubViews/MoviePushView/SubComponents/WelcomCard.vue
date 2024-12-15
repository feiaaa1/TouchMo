<template>
  <div class="welcom-container">
    <h1>
      欢迎访问<br />
      TouchMo
    </h1>
    <p>免费 高质量</p>
    <div class="inner-card">
      <span class="iconfont icon icon-plane"></span>
      <div class="content-box">
        <h1>随便逛逛</h1>
        <span class="iconfont icon icon-arrow-right"></span>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.welcom-container {
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 75%;
  padding: 2.8rem;
  background-color: var(--tertiary-bg-color);
  border: 1px solid var(--primary-border-color);
  border-radius: 0.7rem;
  color: var(--primary-font-color);
  overflow: hidden;

  &:hover {
    .inner-card {
      opacity: 1;
      transform: translateX(1rem) translateY(-50%);
    }
  }
  h1{
    font-size: 2.3rem;
    line-height: 1.3;
  }
  p{
    font-weight: 300;
    font-size: smaller;
    margin-top: 1rem;
  }
  .inner-card {
    position: absolute;
    top: 50%;
    left: -1rem;
    color: var(--secondary-font-color);
    padding: 0.5rem 2rem;
    height: 100%;
    width: 120%;
    background-color: var(--secondary-accent-color);
    transform: translateY(-50%);
    opacity: 0;
    transition: all .3s;

    .icon-plane {
      font-size: 5rem;
    }

    .content-box{
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 1rem;

      h1{
        font-size: 3.2rem;
        font-weight: 500;
      }

      .icon-arrow-right {
        font-size: 3rem;
      }
    }
  }
}
</style>
