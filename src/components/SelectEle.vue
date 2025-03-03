<template>
  <div class="custom-select">
    <!-- 触发区域 -->
    <div
      class="selected-option"
      @click.stop="toggleDropdown"
      :style="{
        height: props.height + 'rem',
        width: props.width + 'rem',
        borderRadius: props.borderRadius + 'rem',
      }"
    >
      <div class="left-container">
        <p class="filterType">{{ props.filterType }}</p>
        <div class="selectedLabel">
          <span class="icon iconfont icon-filter"> </span>
          <p class="selectedText">
            {{
              props.options.find((item) => item.id === props.optionId)?._label || props.placeholder
            }}
          </p>
        </div>
      </div>
      <div :style="{ transform: isOpen ? 'rotate(180deg)' : '' }" class="right-container">
        <span class="icon iconfont icon-dropdownArrow"></span>
      </div>
    </div>
    <!-- 下拉列表 -->
    <transition name="optionsList">
      <ul v-if="isOpen" class="options-list">
        <li
          v-if="!props.isRequired"
          @click.stop="selectOption({ id: null, _label: '全部' })"
          :class="{ disabled: props.optionId === null }"
        >
          <p class="option-label">全部</p>
          <span v-if="props.optionId === null" class="icon iconfont icon-checkMark"></span>
        </li>
        <li
          v-for="option in props.options"
          :key="option.id"
          @click.stop="selectOption(option)"
          :class="{ disabled: option.disabled }"
        >
          <p class="option-label">{{ option._label }}</p>
          <span v-if="option.id === props.optionId" class="icon iconfont icon-checkMark"></span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  //必选 选项列表
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
  //与父组件v-model双向绑定的值，表示options中的id，当前选中的option的id，所以options中的option必须包含id字段与_label字段，一个用来与父组件通信的id，一个用来表示显示的文本
  optionId: {
    required: true,
  },
  //可选 筛选类型
  filterType: {
    type: String,
    default: '',
  },
  //可选 选项占位符
  placeholder: {
    type: String,
    default: '请选择',
  },
  //是否必选选项，否则可以为null，添加一个全部类型的option，设置值为null
  isRequired: {
    type: Boolean,
    default: false,
  },
  //可选 选项高度
  height: {
    type: Number,
    default: 4,
  },
  //可选 选项宽度
  width: {
    type: Number,
    default: 19,
  },
  //可选 边框圆角
  borderRadius: {
    type: Number,
    default: 1,
  },
})
// console.log(props.options)
const emit = defineEmits(['update:modelValue', 'change-option'])
const isOpen = ref(false) //展开下拉框状态
const selectedLabel = ref('') //当前选择的内容

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
const selectOption = (option) => {
  if (option.disabled) return
  selectedLabel.value = option._label
  isOpen.value = false
  emit('update:optionId', option.id) // 支持 v-model
  emit('change-option') // 支持自定义事件
}
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  color: var(--primary-font-color);
  .selected-option {
    cursor: pointer;
    width: 240px;
    transition: all 0.1s;
    padding: 1rem;
    background-color: var(--tertiary-border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      background-color: var(--primary-border-color);
    }

    .left-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      .filterType {
        font-size: 0.8rem;
      }
      .selectedLabel {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        .icon-filter {
          opacity: 0.5;
        }
        .selectedText {
          color: var(--secondary-font-color);
          font-size: 1rem;
        }
      }
    }
    .right-container {
      text-align: center;
      line-height: 100%;
      transition: transform 0.1s ease;
      .icon-dropdownArrow {
        font-size: 0.4rem;
      }
    }
  }
  .options-list {
    position: absolute;
    top: 110%;
    left: 0;
    z-index: 100;
    width: 100%;
    max-height: 200px;
    overflow: scroll;
    overflow-x: hidden;
    background-color: var(--tertiary-bg-color);
    border-radius: 0.9rem;
    padding: 0.5rem;
    transform-origin: top;

    &::-webkit-scrollbar {
      display: none;
    }
    > li {
      color: var(--secondary-font-color);
      cursor: pointer;
      width: 100%;
      font-size: 1rem;
      padding: 0.4rem;
      border-radius: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:hover {
        background-color: var(--primary-border-color);
      }
    }
  }
}

.optionsList-enter-active,
.optionsList-leave-active {
  transition:
    transform 0.1s ease,
    opacity 0.1s ease;
}

.optionsList-enter-from,
.optionsList-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
