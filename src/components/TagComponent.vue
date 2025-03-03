<template>
  <div
    ref="tag"
    @click="navigateToMediaFilterView($event)"
    :class="[
      'tag-container',
      { border: props.isborder },
      //列出全部标签样式(这时会显示电影数量，所以通过这个来判断)
      { tagDisplayStyle: props.isShowFilmNum },
      { filterStyle: props.isFilterStyle },
    ]"
    :style="{ padding: `${fontSize / 5}rem ${fontSize / 3}rem` }"
  >
    <span v-if="props.isLinkIcon" class="icon iconfont icon-link"></span>
    <p
      class="tagName"
      :style="{
        fontSize: `${props.fontSize}rem`,
        color: styleStore.NavigationState.isMovieDetail
          ? 'var(--always-white-color)'
          : 'var(--secondary-font-color)',
      }"
    >
      {{ props.name }}
    </p>
    <p class="filmNum" v-if="props.isShowFilmNum">{{ props.filmNum }}</p>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'

const styleStore = useStyleStateStore()

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  //获取电影数
  filmNum: {
    type: Number,
    default: 0,
  },
  //是否增加边框
  isborder: {
    type: Boolean,
    default: false,
  },
  //设置字体大小
  fontSize: {
    type: Number,
    default: 0.83,
  },
  //是否显示电影数
  isShowFilmNum: {
    type: Boolean,
    default: false,
  },
  //是否显示链接图标
  isLinkIcon: {
    type: Boolean,
    default: true,
  },
  //是否显示筛选样式
  isFilterStyle: {
    type: Boolean,
    default: false,
  },
})

import { useRouter } from 'vue-router'
const router = useRouter()

function navigateToMediaFilterView(e) {
  //阻止冒泡
  e.stopPropagation()
  router.push({
    name: 'mediaFilterView',
  })
}
</script>

<style lang="scss" scoped>
.tag-container {
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0.5rem 1rem;

  &:hover {
    p,
    .icon {
      color: var(--primary-func-color) !important;
    }
  }

  .icon {
    color: inherit;
    opacity: 0.7;
    transition: all 0.2s;
  }

  p {
    transition: all 0.2s;
    text-overflow: ellipsis;
    font-style: italic;
  }

  .filmNum {
    font-style: normal;
    font-size: 0.8rem;
    color: var(--primary-font-color);
    border: 1px solid var(--primary-border-color);
    padding: 0 0.3rem;
    border-radius: 0.3rem;
    margin-left: 0.7rem;
    transition: all 0.4s;
  }
}

//动态类
.border {
  border-radius: 0.5rem;
  border: 1px solid var(--primary-border-color);
}

.tagDisplayStyle {
  transition: all 0.4s;
  &:hover {
    transform: scale(1.05);
    background-color: var(--primary-accent-color);
    .tagName {
      color: #f7f7f7 !important;
    }
    .filmNum {
      color: var(--primary-accent-color);
      background-color: var(--tertiary-bg-color);
    }
  }
}

.filterStyle {
  transition: all 0.4s;
  border-radius: 0.5rem !important;
  padding: 0.1rem 0.8rem !important;
  .tagName {
    font-size: 1.1rem !important;
    font-style: normal !important;
    font-weight: 600 !important;
    color: var(--primary-font-color) !important;
  }
  &:hover {
    background-color: var(--primary-accent-color);
    .tagName {
      color: #f7f7f7 !important;
    }
  }
}
</style>
