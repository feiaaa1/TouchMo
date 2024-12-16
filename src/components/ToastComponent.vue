<!-- Toast.vue -->
<template>
  <div v-if="isVisible" :class="['toast', `toast-${type}`]">
    {{ message }}
    <button @click="hideToast" class="toast-close">&times;</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'error', 'warning'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
});

const isVisible = ref(false);

const hideToast = () => {
  isVisible.value = false;
};

// 自动隐藏 Toast
onMounted(() => {
  setTimeout(hideToast, props.duration);
});

// 清理工作，虽然在这个简单的例子中不是必需的
onBeforeUnmount(() => {
  clearTimeout(hideToast);
});
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.toast-info {
    background-color: #2196f3;
  }

  &.toast-success {
    background-color: #4caf50;
  }

  &.toast-error {
    background-color: #f44336;
  }

  &.toast-warning {
    background-color: #ff9800;
  }

  .toast-close {
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
