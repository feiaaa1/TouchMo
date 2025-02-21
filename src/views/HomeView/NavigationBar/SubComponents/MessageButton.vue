<template>
  <div
    class="message-container"
    :style="{
      color: `${styleStore.NavigationState.isMovieDetail ? (styleStore.NavigationState.isScrollTop ? 'white' : 'var(--primary-font-color)') : 'var(--primary-font-color)'}`,
    }"
  >
    <span class="icon iconfont icon-message"></span>
    <div class="message-box">
      <div class="message-box-header">
        <h3>Notifications</h3>
      </div>
      <div class="message-box-body">
        <template v-if="messageList.length > 0">
          <div class="message-item" v-for="item in messageList" :key="item.id"></div>
        </template>
        <template v-else>
          <div class="message-noMsg">暂无消息</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStyleStateStore } from '@/stores/styleState'
const styleStore = useStyleStateStore()

const messageList = ref([
  //记录数组
  {
    id: 1, //消息id
    userId: 2, //用户id
    type: 2, //消息类型（0表示点赞、1表示回复、2表示系统消息）
    sourceId: 10, //消息源id
    sourceType: 1, //源类型（0表示收藏夹、1表示评论）
    operatorId: 1, //动作发起者id（即点赞或回复人id）
    status: 0, //消息读取状态（0表示未读，1表示已读）
    content: '您发布的评论内容正在审核中，请耐心等待', //消息内容
    createTime: '2025-02-14 20:17:32', //创建时间
  },
  {
    id: 1, //消息id
    userId: 2, //用户id
    type: 2, //消息类型（0表示点赞、1表示回复、2表示系统消息）
    sourceId: 10, //消息源id
    sourceType: 1, //源类型（0表示收藏夹、1表示评论）
    operatorId: 1, //动作发起者id（即点赞或回复人id）
    status: 0, //消息读取状态（0表示未读，1表示已读）
    content: '您发布的评论内容正在审核中，请耐心等待', //消息内容
    createTime: '2025-02-14 20:17:32', //创建时间
  },
  {
    id: 1, //消息id
    userId: 2, //用户id
    type: 2, //消息类型（0表示点赞、1表示回复、2表示系统消息）
    sourceId: 10, //消息源id
    sourceType: 1, //源类型（0表示收藏夹、1表示评论）
    operatorId: 1, //动作发起者id（即点赞或回复人id）
    status: 0, //消息读取状态（0表示未读，1表示已读）
    content: '您发布的评论内容正在审核中，请耐心等待', //消息内容
    createTime: '2025-02-14 20:17:32', //创建时间
  },
  {
    id: 2, //消息id
    userId: 2, //用户id
    type: 0, //消息类型（0表示点赞、1表示回复、2表示系统消息）
    sourceId: 10, //消息源id
    sourceType: 1, //源类型（0表示收藏夹、1表示评论）
    operatorId: 1, //动作发起者id（即点赞或回复人id）
    status: 0, //消息读取状态（0表示未读，1表示已读）
    content: '您发布的评论内容正在审核中，请耐心等待', //消息内容
    createTime: '2025-02-14 20:17:32', //创建时间
  },
  {
    id: 1, //消息id
    userId: 2, //用户id
    type: 2, //消息类型（0表示点赞、1表示回复、2表示系统消息）
    sourceId: 10, //消息源id
    sourceType: 1, //源类型（0表示收藏夹、1表示评论）
    operatorId: 1, //动作发起者id（即点赞或回复人id）
    status: 0, //消息读取状态（0表示未读，1表示已读）
    content: '您发布的评论内容正在审核中，请耐心等待', //消息内容
    createTime: '2025-02-14 20:17:32', //创建时间
  },
])
</script>

<style lang="scss" scoped>
.message-container {
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  height: 2.2rem;
  width: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100rem;
  font-size: medium;
  font-weight: 400;
  color: var(--primary-font-color);
  transition: all 0.3s;

  &:has(.icon:hover) {
    background-color: var(--primary-accent-color);
  }
  .icon {
    font-size: 2rem;
    &:hover {
      color: var(--secondary-font-color);
    }
  }

  .message-box {
    position: absolute;
    top: 120%;
    right: 0;
    width: 20rem;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0);

    .message-box-header {
      padding: 0.5rem 1rem;
      height: 3rem;
      background-color: var(--secondary-bg-color);
    }

    .message-box-body {
      max-height: 18rem;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        background: rgb(9, 9, 9);
      }

      &::-webkit-scrollbar-thumb {
        background: var(--primary-border-color);
        border-radius: 10px;
      }
      &::-webkit-scrollbar-button {
        display: none;
      }
      .message-item {
        padding: 0.5rem 1rem;
        height: 4rem;
        background-color: var(--tertiary-bg-color);
        color: var(--primary-font-color);
        transition: all 0.3s;
        &:hover {
          background-color: var(--primary-accent-color);
          color: var(--secondary-font-color);
        }
      }
      .message-noMsg {
        padding: 0.5rem 0;
        text-align: center;
        background-color: var(--secondary-border-color);
        color: var(--primary-font-color);
      }
    }
  }
}
</style>
