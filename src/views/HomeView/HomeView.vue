<template>
  <div class="home-container dark-theme ">
  <NavigationBar />
   <RouterView />
   <FooterComponent />
  </div>
</template>

<script setup>
import NavigationBar from './NavigationBar/NavigationBar.vue';
import FooterComponent from './FooterComponent/FooterComponent.vue';
</script>

<style lang="scss" scoped>

.dark-theme {
    --primary-bg-color: #060606;
    --secondary-bg-color: #0f0f0f;
    --tertiary-bg-color: #191919;
    --primary-border-color: #373737;
    --primary-font-color: #adadad;
    --secondary-font-color: #fafafa;
    --primary-accent-color: #f5c32d;
    --secondary-accent-color: #d5a62f;
    background-color: var(--secondary-bg-color);
}

.home-container {
  width: 100vw;
  min-height: 100vh;
}
</style>
