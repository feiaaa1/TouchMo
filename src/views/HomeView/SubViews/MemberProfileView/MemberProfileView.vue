<template>
  <div v-if="isLoadingComplete" class="member-container">
    <div class="left-container">
      <div class="detail-container">
        <img :src="memberProfile.avatar" alt="" />
        <div class="title-container">
          <h1>{{ memberProfile.name }}</h1>
          <button v-if="!memberProfile.isFollow" class="followBtn btn" @click="submitFollow()">
            关注
          </button>
          <button v-else class="removeFollowBtn btn" @click="submitRemoveFollow()">已关注</button>
        </div>
      </div>
      <h1>参演作品</h1>
      <FilmList :filmList="memberProfile.films" />
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getMemberProfile } from '@/api/movie'
import { useRoute } from 'vue-router'
import FilmList from '@/components/FilmList.vue'
import { ElMessage } from 'element-plus'
const route = useRoute()

const isLoadingComplete = ref(false)
const memberProfile = ref([])

async function getInfo() {
  try {
    const res = await getMemberProfile(route.params.memberId, {
      page: 1,
      sortOrder: 1,
    })
    console.log('获取指定人员信息-->', memberProfile.value)
    if (res.code === 200) {
      memberProfile.value = res.data
      isLoadingComplete.value = true
    } else {
      ElMessage({
        message: '获取演员信息失败，' + res.msg,
        type: 'error',
        plain: true,
      })
    }
  } catch (error) {
    ElMessage({
      message: '获取演员信息失败，' + error,
      type: 'error',
      plain: true,
    })
  }
}

getInfo()

//添加关注逻辑
import { follow } from '@/api/user'
async function submitFollow() {
  try {
    const res = await follow(route.params.memberId)
    console.log('followRes-->', res)
    ElMessage({
      message: '关注成功',
      type: 'success',
      plain: true,
    })
  } catch (error) {
    ElMessage({
      message: '关注失败' + error,
      type: 'error',
      plain: true,
    })
  } finally {
    getInfo()
  }
}

//取消关注逻辑
import { deleteFollow } from '@/api/user'
import { sortOrders } from 'element-plus/es/components/table-v2/src/constants'
async function submitRemoveFollow() {
  try {
    const res = await deleteFollow(route.params.memberId)
    console.log('deleteFollowRes-->', res)
    ElMessage({
      message: '取消关注成功',
      type: 'success',
      plain: true,
    })
  } catch (error) {
    ElMessage({
      message: '取消关注失败' + error,
      type: 'error',
      plain: true,
    })
  } finally {
    getInfo()
  }
}
</script>

<style lang="scss" scoped>
.member-container {
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
