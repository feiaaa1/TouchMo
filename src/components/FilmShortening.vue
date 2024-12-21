<template>
  <div class="shorteing-container" ref="container" @click="navigateToMovieDetail(props.id)">
    <div class="img-container">
      <img :src="props.cover" alt="" />
    </div>
    <div class="detail-container">
      <div  class="detail-container-header">
        <h1>{{ '【' + props.language + '】 ' + props.title }}</h1>
      </div>
      <div class="detail-container-main" v-if="props.isShowRate">
        <el-rate
        v-if="props.score !== 0"
        :model-value="props.score/2"
        disabled
          show-score
          text-color="var(--primary-accent-color)"
          :scoreTemplate="`${props.score.toFixed(1)}`"
          style="font-weight: 600"
        />
        <p v-else>暂无用户评分</p>
      </div>
      <div class="detail-container-footer">
        <div ref="tag-list" class="tags-container">
          <TagComponent
            v-for="item in props.categories"
            :key="item.id"
            :name="item.name"
            :id="item.id"
          />
        </div>
        <div class="duration-container" v-if="props.isShowDuration">
          <span  class="icon iconfont icon-duration"></span>
          <p>{{props.duration}}分钟</p>
        </div>
          <div class="more-container" >
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

const props = defineProps({
  cover: String,
  area: String,
  title: String,
  language: String,
  categories: Object,
  viewNum: Number,
  id: Number,
  score: Number,
  duration: Number,
  isMore: {
    type: Boolean,
    default: false,
  },
  isShowRate: {
    type: Boolean,
    default: false,
  },
  isShowDuration: {
    type: Boolean,
    default: false,
  },
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

  &:hover {
    border: 1px solid var(--primary-accent-color);

    .detail-container .detail-container-header h1 {
      color: var(--primary-accent-color);
    }

    .img-container img {
      transform: translate(-50%, -50%) scale(1.02);
    }
  }

  .img-container {
    flex-shrink: 0;
    width: 100%;
    height: 55%;
    overflow: hidden;
    position: relative;

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
      transition: all 0.5s;
    }
  }

  .detail-container {
    height: 100%;
    width: 100%;
    padding: 2% 6%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .detail-container-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1 {
        width: 100%;
        color: var(--secondary-font-color);
        font-size: 1.2rem;
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
      p{
        margin: .4rem 0;
        color: var(--primary-font-color);
      }
    }

    .detail-container-footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .tags-container {
        display: flex;
        width: 80%;
        overflow: hidden;
        margin-left: -0.4rem;
        opacity: 0.9;

        .hidden {
          display: none !important;
        }
      }

      .duration-container {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-font-color);
        opacity: .8;
        font-size: .9rem;
        margin-left: 0.5rem;
        gap: .5rem;
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
