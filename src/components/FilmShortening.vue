<template>
  <div class="shorteing-container" ref="container" @click="navigateToMovieDetail(props.id)">
    <div class="img-container">
      <img :src="props.cover" alt="" />
    </div>
    <div class="detail-container">
      <p>{{ props.area }}</p>
      <h1>{{ '[' + props.language + '] ' + props.title }}</h1>
      <div class="tags-views-container">
        <div ref="tag-list" class="tags-container">
          <TagComponent
            v-for="item in props.categories"
            :key="item.id"
            :name="item.name"
            :id="item.id"
          />
        </div>
        <div class="views-container">
          <span
            @click="showModifyFavoritesCard($event)"
            class="icon icon-favorite iconfont"
            v-if="!isMore"
          ></span>
          <span
            @click="showModifyFavoritesCard($event)"
            class="icon icon-more iconfont"
            v-if="isMore"
          ></span>
          <span
            @click="submitDeleteFavorites($event)"
            class="icon icon-delete iconfont"
            v-if="isMore"
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
  isMore: {
    type: Boolean,
    default: false,
  },
})


console.log();
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
import {deleteMovieFromFavorites } from '@/api/user'
function submitDeleteFavorites(e) {
  e.stopPropagation()
  const params = {
    filmId: props.id,
    favoriteId: styleStore.FavoriteState.currentFavoritesId,
  }
  deleteMovieFromFavorites(params).then((res) => {
    console.log('delete--->', res)
    alert('删除成功')
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

    .detail-container h1 {
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
    padding: 4% 6%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    p {
      color: var(--primary-font-color);
      font-size: 2%;
      font-style: italic;
    }

    h1 {
      color: var(--secondary-font-color);
      font-size: 1.2rem;
      transition: all 0.5s;
    }

    .tags-views-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .tags-container {
        display: flex;
        gap: 0.7rem;
        width: 80%;
        overflow: hidden;

        .hidden {
          display: none !important;
        }
      }

      .views-container {
        color: var(--primary-font-color);

        .icon {
          margin-right: 5px;

          &:hover {
            color: var(--primary-accent-color);
          }

          .icon-delete {
            &:hover {
              color: #ff0000;
            }
          }
        }
      }
    }
  }
}
</style>
