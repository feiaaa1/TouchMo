<template>
  <div
    ref="tag"
    @click="navigateToTagCorrelation($event)"
    :class="['tag-container', { border: props.isborder }, {tagDisplayStyle: props.isShowFilmNum},{moviePushStyle: route.name === 'home'}]"
    :style="{ padding: `${fontSize/5}rem ${fontSize / 3}rem` }"
  >
  <span v-if="props.isLinkIcon" class="icon iconfont icon-link"></span>
    <p class="tagName" :style="{
  fontSize: `${props.fontSize}rem`,
    color: styleStore.NavigationState.isMovieDetail?'var(--always-white-color)':'var(--secondary-font-color)'
    }">{{ props.name }}</p>
    <p class="filmNum" v-if="props.isShowFilmNum">{{props.filmNum}}</p>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState';

const styleStore = useStyleStateStore()
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  filmNum: {
    type: Number,
    default: 0,
  },
  isborder: {
    type: Boolean,
    default: false,
  },
  fontSize: {
    type: Number,
    default: 0.83,
  },
  isShowFilmNum: {
    type: Boolean,
    default: false,
  },
  isLinkIcon: {
    type: Boolean,
    default: true,
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
  padding: 0.5rem 1rem;
  
  .icon{
    color: var(--tertiary-font-color);
    opacity: .5;
    transition: all 0.2s;
  }

  p {
    transition: all 0.2s;
    text-overflow: ellipsis;
    font-style: italic;
  }

  .filmNum {
    font-style: normal;
    font-size: .8rem;
    color: var(--primary-font-color);
    border: 1px solid var(--primary-border-color);
    padding: 0 .3rem;
    border-radius: .3rem;
    margin-left: .7rem;
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
    .tagName{
      color: #f7f7f7 !important;
    }
    .filmNum{
      color: var(--primary-accent-color);
      background-color: var(--tertiary-bg-color);
    }
  }
}

.moviePushStyle {
  transition: all 0.4s;
  border-radius: .5rem !important;
  padding: .1rem .8rem !important;
  .tagName {
    font-size: 1.1rem !important;
    font-style: normal !important;
    font-weight: 600 !important;
    color: var(--primary-font-color) !important;
  }
  &:hover {
    background-color: var(--primary-accent-color);
    .tagName{
      color: #f7f7f7 !important;
    }
  }
}
</style>
