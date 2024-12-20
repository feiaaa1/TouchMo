<template>
  <div
    ref="tag"
    @click="navigateToTagCorrelation($event)"
    :class="['tag-container', { border: props.isborder }]"
    :style="{ padding: `0rem ${fontSize / 2}rem` }"
  >
  <span class="icon iconfont icon-link"></span>
    <p :style="{
  fontSize: `${props.fontSize}rem`,
    color: styleStore.NavigationState.isMovieDetail?'var(--always-white-color)':'var(--secondary-font-color)'
    }">{{ props.name }}</p>
  </div>
</template>

<script setup>

import { useStyleStateStore } from '@/stores/styleState';

const styleStore = useStyleStateStore()

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: String,
  isborder: {
    type: Boolean,
    default: false,
  },
  fontSize: {
    type: Number,
    default: 0.83,
  },
})


import { useRouter } from 'vue-router'
const router = useRouter()

function navigateToTagCorrelation(e) {
  //阻止冒泡
  e.stopPropagation()
  router.push({
    name: 'tagCorrelation',
    params: {
      tagId: props.id,
    },
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

  .icon{
    color: var(--tertiary-font-color);
    opacity: .5;
    transition: all 0.2s;
  }
        &:hover {
          .icon,p {
            color: var(--primary-func-color)
          }
      }

  p {
    transition: all 0.2s;
    text-overflow: ellipsis;
    font-style: italic;
  }
}

.border {
  border-radius: 0.5rem;
  border: 1px solid var(--primary-border-color);
}
</style>
