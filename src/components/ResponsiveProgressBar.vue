<template>
  <div class="progressBar-container">
    <div
      v-if="styleStore.isShowProgress"
      class="progress-bar"
      :style="{ width: styleStore.progress + '%' }"
    ></div>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { watch } from 'vue'
import { delay } from '@/utils/delay'

const styleStore = useStyleStateStore()

watch(
  () => styleStore.progress,
  async (newVal) => {
    if (newVal === 100) {
      // 等待动画完成 + 额外停留 1 秒
      await delay(200)
      styleStore.isShowProgress = false
      styleStore.progress = 0
      styleStore.progressQueue.value = [] // 清空队列
    }
  },
)
</script>

<style lang="scss" scoped>
.progressBar-container {
  position: fixed;
  top: 0;
  height: 0.3rem;
  width: 100%;
  background-color: transparent;
  z-index: 99999;
  .progress-bar {
    height: 100%;
    background-color: var(--primary-func-color);
    transition: width 0.2s ease-in-out; /* 保持与队列处理时间一致 */
  }
}
</style>
