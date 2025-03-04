<template>
  <div class="popup-selector" @click.stop="toggle">
    <!-- 插槽：用于传入按钮 -->
    <slot></slot>

    <!-- 弹出的选择框 -->
    <div v-if="isOpen" class="popup" @click.stop="close">
      <ul>
        <li v-for="(option, index) in props.options" :key="index" @click="selectOption(option)">
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  // 选项数据，格式为 [{ text: '选项1', value: 'value1' }, ...]
  options: {
    type: Array,
    required: true,
  },
})

const isOpen = ref(false) // 控制选择框的显示状态

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const selectOption = (option) => {
  close()
  emit('select', option.value) // 触发选择事件
}

const emit = defineEmits(['select'])
</script>

<style lang="scss" scoped>
.popup-selector {
  position: relative;

  .popup {
    position: absolute;
    top: 100%;
    right: 100%;
    background: var(--tertiary-bg-color);
    box-shadow: 0 0 5px 2px var(--quaternary-bg-color);
    z-index: 10;
    border-radius: 6px;
    overflow: hidden;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 8px 12px;
      cursor: pointer;
      width: 8rem;
      text-align: center;
      font-size: 1rem;

      &:hover {
        background-color: var(--primary-border-color);
      }
    }
  }
}
</style>
