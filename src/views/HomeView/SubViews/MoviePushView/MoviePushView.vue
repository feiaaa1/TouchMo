<template>
  <div class="push-container">
    <div class="header-section">
      <div class="header-left">
        <WelcomCard />
        <div class="tab-container">
          <CategoryButton />
          <ForumButton />
          <MessageButton />
        </div>
      </div>
      <div class="header-right">
        <ExplainCard />
      </div>
    </div>

    <div class="main-content">
      <div class="film-list-section"></div>
      <div class="ranking-section"></div>
    </div>

  </div>
</template>

<script setup>
import WelcomCard from './SubComponents/WelcomCard.vue';
import ExplainCard from './SubComponents/ExplainCard.vue';
import CategoryButton from './SubComponents/CategoryButton.vue';
import ForumButton from './SubComponents/ForumButton.vue';
import MessageButton from './SubComponents/MessageButton.vue';
</script>

<style lang="scss" scoped>
.push-container {
  width: 100vw;
  display: flex;
  padding: 1.5rem 2.5rem;
  flex-direction: column;
  .header-section {
    width: 100%;
    height: 20rem;
    display: flex;
    gap: 1rem;

    .header-left {
      flex-shrink: 0;
      width: 52%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .tab-container{
        flex-shrink: 1;
        width: 100%;
        height: 100%;
        display: flex;
        gap: 1rem;
      }
    }

    .header-right {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
