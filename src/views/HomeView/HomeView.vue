<template>
  <div>
    <div :class="['home-container',isDark?'dark-theme':'light-theme']">
      <NavigationBar />
      <RouterView />
      <FooterComponent />
    </div>
</div>
</template>

<script setup>
import NavigationBar from './NavigationBar/NavigationBar.vue';
import FooterComponent from './FooterComponent/FooterComponent.vue';
import { useStyleStateStore } from '@/stores/styleState';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
const store = useStyleStateStore()
const isDark = ref(true)

const { ThemeStyle } = storeToRefs(store)


watch(ThemeStyle, (newValue) => {
  isDark.value = newValue === 'dark'?true:false
})

</script>

<style lang="scss" scoped>

.dark-theme {
    --primary-bg-color: #000000;
    --secondary-bg-color: #111014;
    --tertiary-bg-color: #1d1e22;
    --quaternary-bg-color:#121212;
    --primary-border-color: #373737;
    --primary-font-color: #adadad;
    --secondary-font-color: #fafafa;
    --tertiary-font-color: #b8b8b8;
    --primary-accent-color: #e9bb5f;
    --secondary-accent-color: #d5a62f;
    --primary-func-color: #2d6cf5;
    background-color: var(--secondary-bg-color);
}

.light-theme {
    --primary-bg-color: #dddddd;
    --secondary-bg-color: #f5f5f5;
    --tertiary-bg-color: #ebebeb;
    --primary-border-color: #b8b8b8;
    --primary-font-color: #4d4d4d;
    --secondary-font-color: #fafafa;
    --primary-accent-color: #2d6cf5;
    --secondary-accent-color: #2f56d5;
    background-color: var(--secondary-bg-color);
}

.home-container {
  position: relative;
  width: 100%;
  z-index: 1;
}


</style>
