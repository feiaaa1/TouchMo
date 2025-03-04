<template>
  <div class="workers-container">
    <div
      @click="navigateToMemberProfile(item)"
      v-for="item in filmDetail.memberRoleListMap['导演']"
      :key="item.id"
      class="workers-box"
    >
      <img :src="item.img" alt="" />
      <div class="workers-details-container">
        <h2>{{ item.name }}</h2>
        <p>导演</p>
      </div>
    </div>
    <div
      @click="navigateToMemberProfile(item)"
      v-for="item in filmDetail.memberRoleListMap['演员']"
      :key="item.id"
      class="workers-box"
    >
      <img :src="item.img" alt="" />
      <div class="workers-details-container">
        <h2>{{ item.name }}</h2>
        <p>演员</p>
      </div>
    </div>
    <div
      @click="navigateToMemberProfile(item)"
      v-for="item in filmDetail.memberRoleListMap['编剧']"
      :key="item.id"
      class="workers-box"
    >
      <img :src="item.img" alt="" />
      <div class="workers-details-container">
        <h2>{{ item.name }}</h2>
        <p>编剧</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const filmDetail = inject('filmDetail')
//跳转人员详情逻辑
function navigateToMemberProfile(data) {
  router.push({
    name: 'member',
    params: {
      memberId: data.id,
    },
  })
}
</script>

<style lang="scss" scoped>
.workers-container {
  width: 100%;
  display: flex;
  overflow: scroll;
  gap: 2rem;
  overflow-y: hidden;
  cursor: pointer;
  padding: 1rem 0;

  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: var(--primary-border-color);
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: var(--quaternary-bg-color);
  }
  .workers-box {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 0.4rem;
    img {
      width: 7rem;
      height: 10rem;
      border-radius: 0.4rem;
      object-fit: cover;
    }

    .workers-details-container {
      width: 5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;

      h2 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: -5px;
      }
      p {
        opacity: 0.6;
      }
    }
  }
}
</style>
