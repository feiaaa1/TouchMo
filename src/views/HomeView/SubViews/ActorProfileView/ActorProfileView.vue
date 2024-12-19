<template>
  <div class="actor-container">
    <div class="left-container">
      <div class="detail-container">
        <img :src="actorProfile.avatar" alt="" />
        <div class="title-container">
          <h1>{{ actorProfile.name }}</h1>
          <button class="followBtn btn" @click="submitFollow()">关注</button>
        </div>
      </div>
      <h1>参演作品</h1>
      <FilmList :filmList="actorProfile.films" />
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getActorProfile } from '@/api/movie'
import { useRoute } from 'vue-router'
import FilmList from '@/components/FilmList.vue'
import { ElMessage } from 'element-plus'
const route = useRoute()

import { follow } from '@/api/user'
function submitFollow() {
  follow(route.params.actorId).then((res) => {
    if (res.code === 0) {
      ElMessage({
        message: '关注成功',
        type: 'success',
      })
    }
    if (res.code === 1) {
      ElMessage({
        message: '已经关注了哟~',
        type: 'warning',
      })
    }
  })
}

const actorProfile = ref([])

getActorProfile(route.params.actorId).then((res) => {
  actorProfile.value = res.data
})
</script>

<style lang="scss" scoped>
.actor-container {
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

    .detail-container {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 2rem;
      .title-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 0.5rem;
        .followBtn {
          border: 0.125em solid var(--primary-accent-color);
          color: var(--primary-accent-color);
          padding: 0.2rem 1rem;

          &:hover {
            color: var(--primary-accent-color);
            border: 0.125em solid var(--primary-accent-color);
          }
        }
      }
      img {
        width: 5.5rem;
        height: 7.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
        object-fit: cover;
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
