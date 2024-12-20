<template>
  <transition>
    <div
      v-if="styleStore.showBoxList.isShowBlurBlack"
      class="blur"
      @click="styleStore.closeBox()"
    ></div>
  </transition>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
const styleStore = useStyleStateStore()
console.log('showBoxList--->', styleStore.showBoxList)
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.blur {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 21;
  width: 100%;
  height: 100%;
  background-color: #0000009a;
}
</style>
