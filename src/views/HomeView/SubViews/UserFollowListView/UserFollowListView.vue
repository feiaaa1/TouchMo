<template>
  <div class="followList-container">
    <div class="left-container">
      <h1 class="title">关注列表</h1>
      <div v-for="item in followList" :key="item.id" class="actor-box">
        <div class="detail-container">
          <img :src="item.avatar" alt="" />
          <div class="title-container">
            <h1>{{ item.name }}</h1>
            <button class="removeFollowBtn" @click="subDeleteFollow(item.id)">取消关注</button>
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
import FilmList from '@/components/FilmList.vue'
import { getFollow } from '@/api/user'
import { ElMessage } from 'element-plus'

const followList = ref([])
function getFollowList() {
  getFollow().then((res) => {
    followList.value = res.data
  })
}

getFollowList()

import { deleteFollow } from '@/api/user'
function subDeleteFollow(id) {
  deleteFollow(id).then((res) => {
    if (res.code === 0) {
      ElMessage({
        message: '取消成功',
        type: 'success',
      })
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

    .title {
      color: var(--primary-accent-color);
    }

    .actor-box {
      width: 100%;
      margin-bottom: 3rem;

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
          .removeFollowBtn {
            appearance: none;
            background-color: transparent;
            border: 0.125em solid var(--primary-font-color);
            border-radius: 0.9375em;
            box-sizing: border-box;
            color: var(--primary-font-color);
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
              color: var(--primary-func-color);
              border: 0.125em solid var(--primary-func-color);
              background-color: var(--tertiary-bg-color);
            }

            &:active {
              transform: translateY(0);
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
