<template>
  <Button :style="styleObject">{{ props.text }}</Button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#ffffff',
  },
  activeColor: {
    type: String,
    default: '#ffffff',
  },
  bgColor: {
    type: String,
    default: 'transparent',
  },
  activeBgColor: {
    type: String,
    default: 'transparent',
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
    default: '5rem',
  },
  padding: {
    type: String,
    default: '0.1rem 0rem',
  },
})

const styleObject = ref({
  color: props.color,
  backgroundColor: props.bgColor,
  width: props.width,
  height: props.height,
  padding: props.padding,
})
</script>

<style lang="scss" scoped>
Button {
  appearance: none;
  border: 0.125em solid var(--primary-font-color);
  border-radius: 0.9375em;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, sans-serif;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;

  &:hover {
    color: var(--secondary-font-color);
    border: 0.125em solid var(--secondary-font-color);
    background-color: var(--tertiary-bg-color);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
