<template>
  <div class="actor-container">
    <div class="left-container">
      <div class="detail-container">
        <div class="img">
          <img :src="actorProfile.avatar" alt="" />
        </div>
        <div class="title-container">
          <h1>{{ actorProfile.name }}</h1>
          <button class="followBtn" @click="submitFollow()">关注</button>
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
const route = useRoute()

import { follow } from '@/api/user'
function submitFollow() {
  follow(route.params.actorId).then((res) => {
    if (res.code === 0) alert('关注成功')
    if (res.code === 1) alert('已关注，无法关注')
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
      align-items: center;
      gap: 1rem;
        .img {
          width: 5.5rem;
          height: 5.5rem;
          border-radius: 100rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--primary-accent-color);
          img {
            object-fit: cover;
          }
      }

      .title-container{
                  display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        .followBtn {
            appearance: none;
            background-color: transparent;
            border: 0.125em solid var(--primary-accent-color);
            border-radius: 0.9375em;
            box-sizing: border-box;
            color: var(--primary-accent-color);
            cursor: pointer;
            display: inline-block;
            font-family: Roobert, sans-serif;
            font-size: 16px;
            font-weight: 600;
            outline: none;
            padding: 0.2rem 1rem;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            will-change: transform;

            &:hover {
              color: var(--secondary-accent-color);
              border: 0.125em solid var(--secondary-accent-color);
              background-color: var(--tertiary-bg-color);
            }

            &:active {
              transform: translateY(0);
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
