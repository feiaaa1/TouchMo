<template>
  <div class="detail-container">
    <header>
      <img :src="filmDetail.cover" alt="" />
      <h1>{{ '【' + filmDetail.language + '】' + filmDetail.title }}</h1>
    </header>
    <main>
      <div class="left-container">
        <h1>电影介绍</h1>
        <p>{{ filmDetail.description }}</p>
        <h1>电影海报</h1>
        <img :src="filmDetail.cover" alt="" />
        <h1>工作人员</h1>
        <div class="workers-container">
          <div
            @click="navigateToActorProfile(item)"
            v-for="item in worksList"
            :key="item.id"
            class="workers-box"
          >
            <img :src="item.avatar" alt="" />
            <div class="workers-details-container">
              <h2>{{ item.name }}</h2>
              <p>{{ item.role === 1 ? '演员' : '导演' }}</p>
            </div>
          </div>
        </div>

         <h1>评分</h1>
        <div class="rating-container">
          <span @click="rateMovie(item)" v-for="item in [1, 2, 3, 4, 5]" :key="item">
            {{ item }} ★
          </span>
        </div>

        <h1>评论区</h1>
        <div class="comments-container">
          <div class="comment-box" v-for="comment in comments" :key="comment.id">
            <p><strong>{{ comment.user.name }}</strong>: {{ comment.text }}</p>
            <div>
              <button @click="likeComment(comment.id)">点赞 ({{ comment.likes }})</button>
              <button @click="deleteComment(comment.id)" v-if="comment.user.id === userId">删除</button>
              <button @click="editComment(comment)" v-if="comment.user.id === userId">编辑</button>
            </div>
            <input v-if="editingCommentId === comment.id" v-model="editingCommentText" @blur="saveComment(comment.id)" />
          </div>
        </div>
        <input v-model="newComment" @keyup.enter="addComment" placeholder="添加评论..." />
        <h1>电影资源</h1>
        <button class="source-btn">点我获取</button>
      </div>
      <div class="right-container"></div>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

function navigateToActorProfile(data) {
  router.push({
    name: 'actors',
    params: {
      actorId: data.id,
    },
  })
}

import { getMovieDetail } from '@/api/movie'
import { computed, ref } from 'vue'

const filmDetail = ref({})
const worksList = computed(() => {
  if (filmDetail.value.directors || filmDetail.value.actors) {
    return [...filmDetail.value.directors, ...filmDetail.value.actors]
  } else {
    return []
  }
})

getMovieDetail(route.params.id).then((data) => {
  filmDetail.value = data.data
  console.log(filmDetail.value)
})




//评论区和评分逻辑
const newComment = ref('');
const comments = ref([]);
const editingCommentId = ref(null);
const editingCommentText = ref('');
const userId = ref(1); // 假设用户 ID 为 1，实际应从认证系统中获取

getMovieDetail(route.params.id).then((data) => {
  filmDetail.value = data.data;
  comments.value.push(...filmDetail.value.comments); // 假设电影详情中包含评论数据
});

function addComment() {
  if (newComment.value.trim()) {
    comments.value.push({
      id: Date.now(),
      user: { id: userId.value, name: '用户' + userId.value },
      text: newComment.value,
      likes: 0,
    });
    newComment.value = '';
  }
}

function deleteComment(commentId) {
  comments.value = comments.value.filter(comment => comment.id !== commentId);
}

function editComment(comment) {
  editingCommentId.value = comment.id;
  editingCommentText.value = comment.text;
}

function saveComment(commentId) {
  const comment = comments.value.find(comment => comment.id === commentId);
  if (comment) {
    comment.text = editingCommentText.value;
  }
  editingCommentId.value = null;
  editingCommentText.value = '';
}

function likeComment(commentId) {
  const comment = comments.value.find(comment => comment.id === commentId);
  if (comment) {
    comment.likes++;
  }
}

function rateMovie(rating) {
  // 实现评分逻辑，例如发送请求到后端保存评分
  console.log('Rated:', rating);
}
</script>

<style lang="scss" scoped>
.detail-container {
  header {
    position: relative;
    width: 100%;
    height: 20rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 20px 0px 0px 5rem;

    img {
      width: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      filter: blur(100px);
    }

    h1 {
      color: var(--secondary-font-color);
      font-size: 3rem;
    }
  }

  main {
    width: 100%;
    padding: 2rem;
    display: flex;
    gap: 1rem;

    .left-container {
      width: 75%;
      flex-shrink: 0;
      font-size: 0.8rem;
      color: var(--secondary-font-color);
      border-radius: 0.8rem;
      padding: 2.3rem;
      border: 1px solid var(--primary-border-color);
      background-color: var(--tertiary-bg-color);

      .rating-container {
  display: flex;
  gap: 1rem;
  cursor: pointer;
}

.comments-container {
  margin-top: 2rem;
}

.comment-box {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
}

      .workers-container {
        width: 100%;
        display: flex;
        overflow: scroll;
        gap: 2rem;
        overflow-y: hidden;
        cursor: pointer;

        &::-webkit-scrollbar {
          width: 10px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: rgba(0, 255, 255, 1);
        }
        &::-webkit-scrollbar-track {
          border-radius: 10px;
          background: #104681;
        }
        .workers-box {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;

          img {
            width: 5rem;
            height: 5rem;
            border-radius: 100rem;
          }

          .workers-details-container {
            width: 5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }
      }

      h1 {
        margin-bottom: 0.8rem;
        margin-top: 2rem;
      }

      p {
        color: var(--primary-font-color);
        width: 50%;
        font-size: 1rem;
        line-height: 2rem;
      }

      img {
        border-radius: 0.9rem;
      }

      .source-btn {
        cursor: pointer;
        color: var(--tertiary-bg-color);
        font-size: 1.8rem;
        border-radius: 100rem;
        background-color: var(--primary-font-color);
        width: 12rem;
        height: 4rem;
      }
    }

    .right-container {
      position: sticky;
      top: 5rem;
      width: 100%;
      border: 1px solid var(--primary-border-color);
      border-radius: 0.8rem;
      height: 30rem;
      background-color: var(--tertiary-bg-color);
    }
  }
}
</style>
