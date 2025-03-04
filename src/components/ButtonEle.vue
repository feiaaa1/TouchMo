<template>
  <button
    :style="{
      color: props.color,
      width: props.width,
      height: props.height + 'rem',
      padding: props.padding,
      fontSize: props.fontSize,
      border: `0.125em solid ${props.color}`,
      borderRadius: props.borderRadius,
    }"
    :disabled="isLoading"
    :type="props.type"
  >
    <div
      :style="{
        border: `2px solid ${props.color}`,
        height: (props.height * 3) / 5 + 'rem',
      }"
      v-show="isLoading"
      class="loading"
    ></div>
    <p v-show="!isLoading">{{ props.text }}</p>
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#ffffff',
  },
  text: {
    type: String,
    default: 'DEFAULT',
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '2',
  },
  padding: {
    type: String,
    default: '1rem 2.3rem',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  fontSize: {
    type: String,
    default: '16px',
  },
  borderRadius: {
    type: String,
    default: '0.9375em',
  },
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<style lang="scss" scoped>
// 转转转动画
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
button {
  appearance: none;
  background-color: var(--tertiary-bg-color);
  border: 0.125em solid var(--primary-font-color);
  border-radius: 0.9375em;
  box-sizing: border-box;
  cursor: pointer;
  font-family: Roobert, sans-serif;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  padding: 1rem 2.3rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 0.125em solid var(--hover-color);
    background-color: var(--tertiary-border-color);
  }

  .loading {
    aspect-ratio: 1/1;
    border-top-color: transparent !important;
    border-radius: 100%;
    animation: circle infinite 0.75s linear;
    margin: 0 auto;
    width: fit-content;
  }
}
</style>
