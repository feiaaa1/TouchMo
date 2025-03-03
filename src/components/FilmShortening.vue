<template>
  <div
    class="shorteing-container"
    ref="container"
    @click="navigateToMovieDetail(props.filmItem.id)"
  >
    <!-- 热门图标 -->
    <span v-if="isShowHotLabel" class="icon iconfont icon-hotLabel">
      <div class="bg-white"></div>
    </span>
    <!-- 图片容器 -->
    <div class="img-container">
      <img :class="{ isShowOpacity: isLoadImgComplete }" ref="img" :src="imgSrc" alt="" />
    </div>
    <!-- 详情容器 -->
    <div class="detail-container">
      <!-- 详情容器头部 -->
      <div class="detail-container-header">
        <h1>{{ props.filmItem.title + '【' + props.filmItem.status + '】 ' }}</h1>
      </div>

      <!-- 详情容器主体 -->
      <div class="detail-container-main" v-if="props.isShowRate">
        <el-rate
          :model-value="props.filmItem.score / 2"
          disabled
          show-score
          text-color="var(--always-yellow-color)"
          :scoreTemplate="`${props.filmItem.score.toFixed(1)}`"
          style="font-weight: 600"
        />
      </div>

      <!-- 详情容器底部 -->
      <div class="detail-container-footer">
        <!-- 日期容器 -->
        <div class="releaseTime-container" v-if="props.isShowReleaseTime">
          <span class="icon iconfont icon-releaseTime"></span>
          <p>
            {{ props.filmItem.releaseTime ? props.filmItem.releaseTime.slice(0, 4) : '暂无日期' }}
          </p>
        </div>
        <!-- 更多容器 -->
        <div class="more-container">
          <span
            @click="submitDeleteFavorites($event)"
            class="icon icon-delete iconfont"
            v-if="props.isMore"
          ></span>
          <span
            @click="showModifyFavoritesCard($event)"
            class="icon icon-more iconfont"
            v-if="props.isMore"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TagComponent from './TagComponent.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref, useTemplateRef } from 'vue'

const props = defineProps({
  filmItem: Object,
  isMore: {
    type: Boolean,
    default: false,
  },
  isShowRate: {
    type: Boolean,
    default: false,
  },
  isShowReleaseTime: {
    type: Boolean,
    default: false,
  },
  isShowHotLabel: {
    type: Boolean,
    default: false,
  },
})

//实现图片懒加载功能
const isLoadImgComplete = ref(false)
const imgSrc = ref('')
const img = useTemplateRef('img')
function lazyLoading() {
  const observer = new IntersectionObserver((changes) => {
    //changes 是被观察的元素集合
    for (let i = 0, len = changes.length; i < len; i++) {
      let change = changes[i]
      // 通过这个属性判断是否在视口中
      if (change.isIntersecting) {
        //获取图片元素
        const imgElement = change.target
        //更改img元素的src
        imgSrc.value = props.filmItem.cover
        //设置当img图片资源加载完毕后才显示图片(添加类并修改透明度)
        imgElement.onload = function () {
          isLoadImgComplete.value = true
        }
        observer.unobserve(imgElement)
      }
    }
  })
  observer.observe(img.value)
}

// 实现文字缩放
//获取容器元素
const container = useTemplateRef('container')

onMounted(() => {
  lazyLoading()
})

const router = useRouter()

import { useStyleStateStore } from '@/stores/styleState'
const styleStore = useStyleStateStore()
function navigateToMovieDetail(id) {
  styleStore.closeBox()
  router.push({
    name: 'movieDetail',
    params: { id: id },
  })
}

function showModifyFavoritesCard(e) {
  e.stopPropagation()
  styleStore.showBox('isShowModifyFavoritesCard', props.id)
}

//移除电影收藏逻辑
import { deleteMovieFromFavorites } from '@/api/user'
function submitDeleteFavorites(e) {
  e.stopPropagation()
  const params = {
    filmId: props.id,
    favoriteId: styleStore.FavoriteState.currentFavoritesId,
  }
  deleteMovieFromFavorites(params).then((res) => {
    console.log('delete--->', res)
  })
}
</script>

<style lang="scss" scoped>
.isShowOpacity {
  opacity: 1 !important;
}
.shorteing-container {
  cursor: pointer;
  width: 100%;
  aspect-ratio: 2/1.1;
  background-color: var(--quatenary-bg-color);
  border: 1px solid var(--primary-border-color);
  overflow: hidden;
  border-radius: 0.7rem;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    border: 1px solid var(--primary-accent-color);

    .detail-container .detail-container-header h1 {
      color: var(--primary-accent-color);
    }

    .img-container img {
      transform: translate(-50%, -50%) scale(1.02);
    }
  }

  .icon-hotLabel {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
    color: var(--secondary-func-color);
    font-size: 1.5rem;
    padding: 0.2rem 0.5rem;
    .bg-white {
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
      z-index: -1;
      width: 78%;
      height: 50%;
      background-color: var(--always-white-color);
    }
  }

  .img-container {
    flex-shrink: 0;
    width: 100%;
    height: 55%;
    overflow: hidden;
    position: relative;
    .status {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 20;
      color: var(--primary-accent-color);
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem;
    }

    &::before {
      content: '';
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      background-color: #2b2b2b50;
    }
    img {
      width: 100vmin;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.2s;
      opacity: 0;
    }
  }

  .detail-container {
    height: 100%;
    width: 100%;
    padding: 2% 6%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    .detail-container-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1 {
        width: 100%;
        font-size: 1.2rem;
        color: var(--secondary-font-color);
        transition: all 0.5s;
        margin-left: -0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .detail-container-main {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: start;
      p {
        margin: 0.4rem 0;
        color: var(--primary-font-color);
      }
    }

    .detail-container-footer {
      width: 100%;

      .releaseTime-container {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-font-color);
        opacity: 0.8;
        font-size: 0.9rem;
        margin-left: auto;
        margin-right: 1rem;
        width: fit-content;
        gap: 0.5rem;
        transform: translateX(1rem);
        .icon {
          transform: scale(1);
        }
      }

      .more-container {
        color: var(--primary-font-color);
        transform: translateY(1rem);

        .icon {
          display: inline-block;
          margin-right: 5px;
          transform: scale(1.3);

          &:hover {
            color: var(--primary-accent-color);
          }
        }
        .icon-delete {
          margin-right: 1rem;
          &:hover {
            color: var(--secondary-func-color);
          }
        }
      }
    }
  }
}
</style>
