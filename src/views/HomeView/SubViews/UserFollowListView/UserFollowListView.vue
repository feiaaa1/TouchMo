<template>
  <div class="followList-container">
    <div class="left-container">
      <h1>关注列表</h1>
      <div v-for="item in followList" :key="item.id"  class="actor-box">
        <div class="detail-container">
          <div class="img">
            <img :src="item.avatar" alt="">
          </div>
          <div class="title-container">
            <h1>{{ item.name }}</h1>
            <button @click="subDeleteFollow(item.id)">取消关注</button>
          </div>
        </div>
        <h1>参演作品</h1>
        <FilmList :filmList="item.films" />
      </div>
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FilmList from '@/components/FilmList.vue';
import { getFollow } from '@/api/user';

const followList = ref([])
function getFollowList() {
  getFollow().then(res => {
    followList.value = res.data
  })
}

getFollowList()

import { deleteFollow } from '@/api/user';
function subDeleteFollow(id) {
  deleteFollow(id).then(res => {
    if (res.code === 0) {
      alert('取消成功！')
      getFollowList()
    }
  })
}

</script>

<style lang="scss" scoped>
.followList-container {
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  gap: 1rem;
  color: var(--secondary-font-color);
  .left-container {
    width: 75%;
    padding: 2rem;
    flex-shrink: 0;
    min-height: 20rem;
    border-radius: 0.8rem;
    background-color: var(--tertiary-bg-color);
    border: 1px solid var(--primary-border-color);
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .actor-box{
      width: 100%;
      margin-bottom: 3rem;
      .detail-container{
        display: flex;
      align-items: center;
      gap: 1rem;
      .img{
        width: 5rem;
        height: 5rem;
        border-radius: 100rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          object-fit: cover;
        }
      }
    }

  }

  }

  .right-container {
    width: 100%;
    height: 20rem;
    position: sticky;
    top: 5rem;
    border-radius: 0.8rem;
    background-color: var(--tertiary-bg-color);
    border: 1px solid var(--primary-border-color);
  }
}
</style>
