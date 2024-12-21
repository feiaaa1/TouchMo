<template>
  <div class="pop-confirm">
    <slot @click="showPopconfirm" :ref="triggerRef"></slot>
    <transition name="fade">
      <div v-if="visible" class="pop-confirm__popover" :style="popoverStyle">
        <div class="pop-confirm__header">
          <span>{{ title }}</span>
          <button class="pop-confirm__close" @click="hidePopconfirm">&times;</button>
        </div>
        <div class="pop-confirm__body">
          <slot name="content"></slot>
        </div>
        <div class="pop-confirm__footer">
          <button @click="onCancel">{{ cancelButtonText }}</button>
          <button @click="onConfirm" class="pop-confirm__confirm-button">{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

 const props = defineProps( {
    title: {
      type: String,
      default: '确认？',
    },
    confirmButtonText: {
      type: String,
      default: '确认',
    },
    cancelButtonText: {
      type: String,
      default: '取消',
    },
    placement: {
      type: String,
      default: 'bottom', // or 'top', 'left', 'right'
    },
 })



    const visible = ref(false);
    const triggerRef = ref(null);
    const popoverStyle = computed(() => {
      // Here you can add logic to calculate the popover's position based on the placement prop
      return {
        // Example: position the popover below the trigger
        position: 'absolute',
        top: `${triggerRef.value.offsetHeight}px`,
        left: '0',
        // Add more styles as needed
      };
    });


    const showPopconfirm = () => {
      visible.value = true;
    };

    const hidePopconfirm = () => {
      visible.value = false;
    };


</script>

<style lang="scss">
.pop-confirm {
  position: relative;
  display: inline-block;

  &__popover {
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    z-index: 1000;
    width: 200px; // Adjust as needed

    // Positioning and transitions
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity 0.3s;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  &__close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }

  &__body {
    margin-bottom: 0.5rem;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
  }

  &__confirm-button {
    background-color: #409EFF;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
      background-color: #66b1ff;
    }
  }
}
</style>
