<template>
  <div v-if="isLoadingComplete" class="actor-container">
    <div class="left-container">
      <div class="detail-container">
        <img :src="actorProfile.avatar" alt="" />
        <div class="title-container">
          <h1>{{ actorProfile.name }}</h1>
          <button v-if="!actorProfile.isFollow" class="followBtn btn" @click="submitFollow()">
            关注
          </button>
          <button v-else class="removeFollowBtn btn" @click="submitRemoveFollow()">已关注</button>
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

const isLoadingComplete = ref(false)
const actorProfile = ref([])

async function getInfo() {
  try {
    const res = await getActorProfile(route.params.actorId)
    actorProfile.value = res.data
    console.log('actorProfile-->', actorProfile.value)
    isLoadingComplete.value = true
  } catch (error) {
    ElMessage({
      message: '获取演员信息失败' + error,
      type: 'error',
    })
  }
}

getInfo()

//添加关注逻辑
import { follow } from '@/api/user'
async function submitFollow() {
  try {
    const res = await follow(route.params.actorId)
    console.log('followRes-->', res)
    ElMessage({
      message: '关注成功',
      type: 'success',
    })
  } catch (error) {
    ElMessage({
      message: '关注失败' + error,
      type: 'error',
    })
  } finally {
    getInfo()
  }
}

//取消关注逻辑
import { deleteFollow } from '@/api/user'
async function submitRemoveFollow() {
  try {
    const res = await deleteFollow(route.params.actorId)
    console.log('deleteFollowRes-->', res)
    ElMessage({
      message: '取消关注成功',
      type: 'success',
    })
  } catch (error) {
    ElMessage({
      message: '取消关注失败' + error,
      type: 'error',
    })
  } finally {
    getInfo()
  }
}
</script>

<style lang="scss" scoped>
.actor-container {
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  gap: 1rem;
  color: var(--secondary-font-color);
  animation: slideUp 0.5s ease;
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
        .removeFollowBtn {
          border: 0.125em solid var(--primary-font-color);
          color: var(--primary-font-color);
          padding: 0.2rem 1rem;
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
