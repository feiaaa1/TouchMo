<template>
  <div class="shorteing-container" ref="container"  @click="navigateToMovieDetail(props.id)">
    <div class="img-container">
      <img :src="props.cover" alt="">
    </div>
    <div class="detail-container">
      <p>{{props.area}}</p>
      <h1>{{ '['+props.language+'] '+props.title }}</h1>
      <div class="tags-views-container" v-if="showTags">
        <div ref="tag-list" class="tags-container">
          <TagComponent  v-for="item in props.categories" :key="item.id" :name="item.name" :id="item.id" /></div>
        <div class="views-container">
          <span v-if="isFavorites" @click="showModifyFavoritesCard($event)" class="icon icon-favorite iconfont"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';
import TagComponent from './TagComponent.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  cover: String,
  area: String,
  title: String,
  language: String,
  categories: Object,
  viewNum: Number,
  id: Number,
  isFavorites: {
    type: Boolean,
    default: true
  },
  isMore: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

import { useStyleStateStore } from '@/stores/styleState';
const styleStore = useStyleStateStore()
function navigateToMovieDetail(id) {
  styleStore.closeBox()
  router.push({
    name: 'movieDetail',
    params: {id: id}
  })
}


function showModifyFavoritesCard(e) {
  e.stopPropagation();
  styleStore.showBox('isShowModifyFavoritesCard',props.id)
}


const showTags = ref(true)
const container = useTemplateRef('container')
onMounted(() => {
  if (container.value.offsetWidth < 300) {
    showTags.value = false
  }

})
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
  transition: all .5s;
  display: flex;
  flex-direction: column;
  &:hover{
    border: 1px solid var(--primary-accent-color);

    .detail-container h1{
        color: var(--primary-accent-color);
      }

      .img-container img{
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
      transition: all .5s;
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

    h1{
      color: var(--secondary-font-color);
      font-size: 1.2rem;
      transition: all .5s;
    }

    .tags-views-container{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;



      .tags-container{
        display: flex;
        gap: 0.7rem;
        width: 80%;
        overflow: hidden;

        .hidden {
          display: none !important;
        }


      }

      .views-container{
        color: var(--primary-font-color);

        .icon {
          margin-right: 5px;

          &:hover{
            color: var(--primary-accent-color);
          }
        }
      }
    }
  }

}
</style>
