<template>
  <div
  ref="tag"
    @click="navigateToTagCorrelation($event)"
    :class="['tag-container', { border: props.isborder }]"
    :style="{ padding: `0rem ${fontSize / 2}rem` }"
  >
    <p :style="{ fontSize: `${props.fontSize}rem` }">{{ '# ' + props.name }}</p>
  </div>
</template>

<script setup>
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
  isHover: {
    type: Boolean,
    default: true
  }
})


import { onMounted, useTemplateRef } from 'vue';
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

const tagEle = useTemplateRef('tag')

onMounted(() => {
  if (!props.isHover) {
    tagEle.value.removeEventListener('mouseenter', tagEle.value.onmouseenter);
    tagEle.value.removeEventListener('mouseleave', tagEle.value.onmouseleave);
  }
})
</script>

<style lang="scss" scoped>
.tag-container {
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  &:hover {
    p {
      color: var(--primary-func-color);
    }
  }

  p {
    color: var(--secondary-font-color);
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
