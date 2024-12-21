<template>
  <div v-if="isLoadComplete" class="detail-container">
    <header>
      <img :src="filmDetail.cover" alt="" />
      <div class="header-main-container">
        <div class="tags-container">
          <TagComponent
          v-for="item in filmDetail.categories"
          :key="item.id"
          :name="item.name"
          :id="item.id"
          :fontSize="1"
        />
      </div>

        <h1>{{ '【' + filmDetail.language + '】' + filmDetail.title }}</h1>
        <div class="releaseTime-container">
          <span class="icon iconfont icon-calendar"></span>
          <span>{{ '发表于 ' + filmDetail.releaseTime }}</span>
        </div>
      </div>
    </header>
    <main>










      <div class="left-container">
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>电影介绍</h1>
        </div>
        <p>{{ filmDetail.description }}</p>







        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>电影海报</h1>
        </div>
        <img :src="filmDetail.cover" alt="" />











        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>电影PV</h1>
        </div>
        <video :src="filmSource" width="100%" height="auto" controls></video>





        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>演职员</h1>
        </div>
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





        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>评个分吧</h1>
        </div>
        <el-rate
          style="transform: scale(1.5) translateX(1.2rem)"
          :allow-half="true"
          size="large"
          v-model="rateVal"
          :colors="colors"
          @change="handleRateMovie()"
        />




          <div class="title-container">
    <span class="icon iconfont icon-deloperator"></span>
    <h1>点击收藏</h1>
  </div>
  <button v-if="true" @click="styleStore.showBox('isShowModifyFavoritesCard',filmDetail.id)"  class="source-btn">收藏</button>
    <button v-else class="removeFollowBtn btn" @click="submitRemoveFollow()">已关注</button>






  <div class="title-container">
    <span class="icon iconfont icon-deloperator"></span>
    <h1>电影资源</h1>
  </div>
  <button class="source-btn">点我获取</button>











        <div class="title-container">
          <span class="icon iconfont icon-comment"></span>
          <h1>{{ isEdit ? '修改评论' : '评论' }}</h1>
        </div>
        <div class="comments-container">
          <textarea id="comment-textarea" v-model="commentInput" class="comments-area"></textarea>
          <button @click="handleSubmitComment()" class="submitBtn">发布</button>

          <div v-for="item in commentsList" :key="item.id" class="comment-item">
            <div class="comment-item-header">
              <img :src="item.avatar" alt="" />
              <div class="header-detail-container">
                <p>{{ item.name + (item.userId === userStore.userInfo.id ? '(我)' : '') }}</p>
                <p class="createTimeText">{{ item.createTime }}</p>
              </div>
            </div>
            <div class="comment-item-main">
              <p>{{ item.content }}</p>
              <div class="main-detail-container">
                <span
                  @click="handleStarComment(item.id)"
                  v-show="!item.isStar"
                  class="icon iconfont icon-love-empty"
                ></span>
                <span
                  @click="handleRemoveStarComment(item.id)"
                  v-show="item.isStar"
                  class="icon iconfont icon-love-fill"
                ></span>
                <span class="starCount">{{ item.star }}</span>
                <span
                  v-if="item.userId === userStore.userInfo.id"
                  @click="handleEditComment(item.content, item.id)"
                  class="icon iconfont icon-more"
                ></span>
                <span
                  v-if="item.userId === userStore.userInfo.id"
                  @click="handleDeleteComment(item.id)"
                  class="icon iconfont icon-delete"
                ></span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="right-container"></div>
    </main>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
// import { ElRate,ElInput } from 'element-plus';
import { useUserStore } from '@/stores/user'
import { useStyleStateStore } from '@/stores/styleState'
const userStore = useUserStore()
const styleStore = useStyleStateStore()
const route = useRoute()
const router = useRouter()
const isLoadComplete = ref(false)

//获取电影详情信息逻辑
import { getMovieDetail, getMovieSource } from '@/api/movie'
import { computed, ref, watch } from 'vue'

const filmDetail = ref({})
const filmSource = ref('')
//工作人员数组
const worksList = computed(() => {
  if (filmDetail.value.directors || filmDetail.value.actors) {
    return [...filmDetail.value.directors, ...filmDetail.value.actors]
  } else {
    return []
  }
})
//跳转人员详情逻辑
function navigateToActorProfile(data) {
  router.push({
    name: 'actors',
    params: {
      actorId: data.id,
    },
  })
}




//获取电影详情信息
function getMovie() {
  getMovieDetail(route.params.id).then((res) => {
    filmDetail.value = res.data
    console.log('getFilmDetail--->', filmDetail.value)
    isLoadComplete.value = true
})

//获取电影pv资源
getMovieSource(route.params.id).then((res) => {
  filmSource.value = res.data
})

}


//获取电影所有评论
import { getMovieComment } from '@/api/movie'
const commentsList = ref([])
async function getComment() {
  const res = await getMovieComment({
    filmId: route.params.id,
    page: 1,
    pageSize: 10,
  })
  console.log('getMovieComment--->', res)
  commentsList.value = res.data.record
}

getComment()
getMovie()

watch(() => route.params.id, () => {
  getMovie()
  getComment()
})



//评论区和评分逻辑
import { subMovieComment } from '@/api/movie'
import { editMovieComment } from '@/api/movie'
const isEdit = ref(false)
const commentInput = ref('')
const currentCommentId = ref(null)
async function handleSubmitComment() {
  try {
    const params = {
      id: currentCommentId.value,
      content: commentInput.value,
      filmId: route.params.id,
      userId: userStore.userInfo.id,
    }
    if (!isEdit.value) {
      const res = await subMovieComment(params)
      console.log('submitComment--->', res)
    } else {
      const res = await editMovieComment(params)
      console.log('editComment--->', res)
    }
    getComment()
  } catch (error) {
    console.log('评论提交失败', error)
  } finally {
    commentInput.value = ''
    isEdit.value = false
    currentCommentId.value = null
  }
}

//修改用户评论
// import { scrollToElementCenter } from '@/utils/scrollToElement';
async function handleEditComment(content, commentId) {
  commentInput.value = content
  isEdit.value = true
  currentCommentId.value = commentId
  // scrollToElementCenter('comment-textarea')
}
//删除用户评论
import { deleteMovieComment } from '@/api/movie'
async function handleDeleteComment(commentId) {
  try {
    const res = await deleteMovieComment(commentId)
    console.log('deleteComment--->', res)
  } catch (error) {
    console.log(error)
  } finally {
    getComment()
  }
}

//点赞功能
import { starMovieComment } from '@/api/movie'
import { removeStarMovieComment } from '@/api/movie'
async function handleStarComment(commentId) {
  try {
    const res = await starMovieComment(commentId)
    console.log('starComment--->', res)
  } catch (error) {
    console.log(error)
  } finally {
    getComment()
  }
}
async function handleRemoveStarComment(commentId) {
  try {
    const res = await removeStarMovieComment(commentId)
    console.log('removeStarComment--->', res)
  } catch (error) {
    console.log(error)
  } finally {
    getComment()
  }
}

// 实现评分逻辑，例如发送请求到后端保存评分
import { rateMovie } from '@/api/user'
const colors = ref(['var(--primary-border-color)', 'var(--primary-accent-color)', 'var(--secondary-accent-color)'])
const rateVal = ref(0)
async function handleRateMovie() {
  const params = {
    id: route.params.id,
    score: +rateVal.value * 2,
    userId: userStore.userInfo.id,
  }

  try {
    const res = await rateMovie(params)
    console.log('rate--->', res)
    ElMessage({
      message: '评分成功',
      type: 'success',
    })
  } catch (error) {
    console.error('提交用户信息时出错：', error)
    ElMessage({
      message: '评分失败',
      type: 'error',
    })
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  header {
    position: relative;
    width: 100%;
    height: 30rem;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0px 0px 5rem;
    gap: 0.5rem;
    color: var(--always-entire-white-color);
    img {
      width: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      filter: blur(100px);
      transform: scale(1.4);
    }

    .header-main-container{
      display: flex;
      flex-direction: column;
      gap: .7rem;
      animation: slideUp 1.1s ease -.2s;
      h1 {
        transform: translateX(-1.5rem);
        font-size: 3.5rem;
      }

      .tags-container {
        display: flex;
        align-items: center;
        justify-content: start;
        opacity: .9;
      }

      .releaseTime-container {
        opacity: .7;
        display: flex;
        gap: 5px;
      }
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
      animation: slideUp 1.1s ease -.1s;

      video {
        border-radius: 0.7rem;
        transition: all 0.2s;
        &:hover {
          box-shadow: 3px 16px 22px -1px rgba(0, 0, 0, 0.65);
        }
      }

      .title-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 3rem;
        margin-bottom: 0.6rem;
        &:first-child {
          margin-top: 1rem;
        }
        .icon {
          font-size: 1.2rem;
        }
      }

      .rating-container {
        display: flex;
        gap: 1rem;
        cursor: pointer;

        .icon {
          font-size: 2rem;
        }
      }

      .comments-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .comments-area {
          width: 100%;
          height: 10rem;
          background-color: transparent;
          border-radius: 0.8rem;
          color: var(--primary-font-color);
          font-size: 1rem;
          padding: 0.7rem;
        }
        .submitBtn {
          appearance: none;
          background-color: transparent;
          border: 0.125em solid var(--primary-accent-color);
          border-radius: 0.5rem;
          box-sizing: border-box;
          color: var(--primary-accent-color);
          cursor: pointer;
          display: inline-block;
          font-family: Roobert, sans-serif;
          font-size: 16px;
          font-weight: 600;
          outline: none;
          padding: 0.6rem 1rem;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          will-change: transform;
          width: 8rem;
          align-self: flex-end;

          &:hover {
            color: var(--secondary-accent-color);
            border: 0.125em solid var(--secondary-accent-color);
            background-color: var(--tertiary-bg-color);
            transform: translateY(-2px);
          }

          &:active {
            transform: translateY(0);
          }
        }

        .comment-item {
          border-bottom: 1px solid var(--primary-border-color);
          width: 100%;
          min-height: 3rem;
          display: flex;
          flex-direction: column;
          padding-bottom: 1rem;
          gap: 1rem;

          &:last-child {
            border: none;
          }

          .comment-item-header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            align-self: flex-start;
            gap: 1rem;
            img {
              height: 3.5rem;
              width: 3.5rem;
              border: 1px solid var(--primary-accent-color);
              border-radius: 50%;
              object-fit: cover;
            }

            .header-detail-container {
              display: flex;
              width: 100%;
              flex-direction: column;
              p {
                font-size: 1.2rem;
              }
              .createTimeText {
                font-size: 0.8rem;
                opacity: 0.4;
              }
            }
          }

          .comment-item-main {
            display: flex;
            flex-direction: column;
            padding-left: 4rem;
            width: 100%;
            > p {
              font-size: 1.3rem;
            }

            .main-detail-container {
              display: flex;
              align-items: center;
              justify-content: flex-end;

              .icon {
                margin-left: 1rem;
                font-size: 1.3rem;
                cursor: pointer;
              }

              .icon-delete {
                &:hover {
                  color: #ff0000;
                }
              }

              .icon-love-empty,
              .icon-love-fill {
                font-size: 1.5rem;
                &:hover {
                  color: var(--primary-accent-color);
                }
              }

              .icon-more {
                font-size: 1.4rem;
                &:hover {
                  color: var(--primary-func-color);
                }
              }

              .starCount {
                margin-top: 0.2rem;
                font-weight: 300;
                font-size: 1rem;
                margin-left: 4px;
                user-select: none;
              }

              span {
                display: inline-block;
              }
            }
          }
        }
      }

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
          background: var(--secondary-accent-color);
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
            h2 {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: -5px;
            }
          }
        }
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
        appearance: none;
        background-color: transparent;
        border: 0.125em solid var(--primary-accent-color);
        border-radius: 0.5rem;
        box-sizing: border-box;
        color: var(--primary-accent-color);
        cursor: pointer;
        display: inline-block;
        font-family: Roobert, sans-serif;
        font-size: 16px;
        font-weight: 600;
        outline: none;
        padding: 0.6rem 1rem;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        will-change: transform;
        width: 8rem;
        align-self: flex-end;

        &:hover {
          color: var(--secondary-accent-color);
          border: 0.125em solid var(--secondary-accent-color);
          background-color: var(--tertiary-bg-color);
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
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
      animation: slideUp 1.1s ease ;
    }
  }
}
</style>
