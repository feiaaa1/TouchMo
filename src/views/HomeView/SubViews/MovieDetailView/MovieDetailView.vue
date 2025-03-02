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
        <!-- 电影介绍 -->
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>电影介绍</h1>
        </div>
        <p class="description">{{ filmDetail.description }}</p>
        <!-- 电影海报 -->
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>电影海报</h1>
        </div>
        <img :src="filmDetail.cover" alt="" />

        <!-- 演职员 -->
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

        <!-- 评分区 -->
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

        <!-- 收藏区 -->
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>点击收藏</h1>
        </div>
        <button
          v-if="true"
          @click="styleStore.showBox('isShowModifyFavoritesCard', filmDetail.id)"
          class="source-btn"
        >
          收藏
        </button>
        <button v-else class="removeFollowBtn btn" @click="submitRemoveFollow()">已关注</button>

        <!-- 资源获取区 -->
        <div class="title-container">
          <span class="icon iconfont icon-deloperator"></span>
          <h1>电影资源</h1>
        </div>
        <button class="source-btn">点我获取</button>

        <!-- 评论区 -->
        <div class="title-container">
          <span class="icon iconfont icon-comment"></span>
          <h1>{{ isEdit ? '修改评论' : '评论' }}</h1>
        </div>
        <div class="comments-container">
          <textarea id="comment-textarea" v-model="commentInput" class="comments-area"></textarea>
          <div class="button-group">
            <ButtonEle
              v-if="isEdit"
              @click="
                ((isEdit = false),
                (currentModifyCommentId = null),
                (commentInput = ''),
                (currentModifyRootComment = null))
              "
              color="var(--tertiary-font-color)"
              fontSize="16px"
              borderRadius="0.5rem"
              padding="0.6rem 1rem"
              width="8rem"
              height="3"
              type="button"
              text="取消"
            ></ButtonEle>
            <ButtonEle
              @click="handleSubmitComment()"
              color="var(--primary-accent-color)"
              fontSize="16px"
              borderRadius="0.5rem"
              padding="0.6rem 1rem"
              width="8rem"
              height="3"
              type="button"
              text="发布"
              :isLoading="isLoading"
            ></ButtonEle>
          </div>
          <!-- 评论列表 -->
          <div v-for="item in commentsList" :key="item.id" class="comment-item">
            <!-- 评论主体 -->
            <div class="comment">
              <!-- 评论左边区域 -->
              <div class="comment-item-left">
                <!-- 头像 -->
                <img :src="item.avatar" alt="" />
              </div>
              <!-- 评论右边区域 -->
              <div class="comment-item-right">
                <!-- 名字 -->
                <p class="comment-name">
                  {{ item.name + (item.userId === userStore.userInfo.id ? '(我)' : '') }}
                </p>
                <!-- 评论内容 -->
                <p class="comment-content">{{ item.content }}</p>
                <!-- 评论时间,点赞，删除，修改，踩操作区 -->
                <div class="main-detail-container">
                  <!-- 评论时间 -->
                  <div class="createTimeText">{{ item.createTime }}</div>
                  <!-- 点赞 -->
                  <div class="like">
                    <button>
                      <!-- 未点赞图标 -->
                      <span
                        @click="handleCommentAction(item.id, 1, item.id)"
                        v-show="item.actionType === null || item.actionType === 0"
                        class="icon iconfont icon-love-empty"
                      ></span>
                      <!-- 已点赞图标 -->
                      <span
                        @click="handleRemoveCommentAction(item.id, item.id)"
                        v-show="item.actionType === 1"
                        class="icon iconfont icon-love-fill"
                      ></span>
                      <!-- 点赞数 -->
                      <span class="starCount">{{ item.thumpsUpNum }}</span>
                    </button>
                  </div>
                  <!-- 踩 -->
                  <div class="dislike">
                    <button>
                      <!-- 未踩图标 -->
                      <span
                        @click="handleCommentAction(item.id, 0, item.id)"
                        v-show="item.actionType !== 0"
                        class="icon iconfont icon-hate-empty"
                      ></span>
                      <!-- 已踩图标 -->
                      <span
                        @click="handleRemoveCommentAction(item.id, item.id)"
                        v-show="item.actionType === 0"
                        class="icon iconfont icon-hate-fill"
                      ></span>
                    </button>
                  </div>
                  <!-- 回复按钮 -->
                  <div class="reply">
                    <!-- 初始状态点击显示回复框，再次点击相同评论回复隐藏回复框，点击其他评论回复隐藏之前评论的回复框 -->
                    <!-- 每次点击回复按钮改变或重置当前回复评论Id -->
                    <!-- 这里都是根评论，点击回复直接记录当前评论为根评论 -->
                    <button @click="handleReplyFocus(item.name, item.id, true, item.id)">
                      回复
                    </button>
                  </div>
                  <!-- 修改、删除评论 -->
                  <div class="more">
                    <PopupSelector
                      :options="[
                        { text: '删除', value: 0 },
                        { text: '修改', value: 1 },
                      ]"
                      @select="handleMoreBtnEvent($event, item.id, item.content, item.id)"
                    >
                      <button>
                        <!-- v-if="item.userId === userStore.userInfo.id" -->
                        <span class="icon iconfont icon-more"></span>
                      </button>
                    </PopupSelector>
                  </div>
                </div>
              </div>
            </div>
            <!-- 子评论 -->
            <div class="replies" v-if="item.children !== 0 && item.children > 0">
              <template v-if="repliesMap.has(item.id)">
                <!-- 子评论列表 -->
                <div
                  v-for="childItem in repliesMap.get(item.id).replies"
                  :key="childItem.id"
                  class="child-comment-item"
                >
                  <!-- 评论主体 -->
                  <div class="child-comment">
                    <!-- 评论左边区域 -->
                    <div class="child-comment-item-left">
                      <!-- 头像 -->
                      <img :src="childItem.avatar" alt="" />
                    </div>
                    <!-- 评论右边区域 -->
                    <div class="child-comment-item-right">
                      <div class="child-comment-content-name">
                        <!-- 名字 -->
                        <p class="child-comment-name">
                          {{
                            childItem.name +
                            (childItem.userId === userStore.userInfo.id ? '(我)' : '')
                          }}
                        </p>
                        <!-- 评论内容 -->
                        <p class="child-comment-content">{{ childItem.content }}</p>
                      </div>
                      <!-- 评论时间,点赞，删除，修改，踩操作区 -->
                      <div class="child-main-detail-container">
                        <!-- 评论时间 -->
                        <div class="createTimeText">{{ childItem.createTime }}</div>
                        <!-- 点赞 -->
                        <div class="like">
                          <button>
                            <!-- 未点赞图标 -->
                            <span
                              @click="handleCommentAction(childItem.id, 1, item.id)"
                              v-show="childItem.actionType === null || childItem.actionType === 0"
                              class="icon iconfont icon-love-empty"
                            ></span>
                            <!-- 已点赞图标 -->
                            <span
                              @click="
                                handleRemoveCommentAction(childItem.id, childItem.rootCommentId)
                              "
                              v-show="childItem.actionType === 1"
                              class="icon iconfont icon-love-fill"
                            ></span>
                            <!-- 点赞数 -->
                            <span class="starCount">{{ childItem.thumpsUpNum }}</span>
                          </button>
                        </div>
                        <!-- 踩 -->
                        <div class="dislike">
                          <button>
                            <!-- 未踩图标 -->
                            <span
                              @click="handleCommentAction(childItem.id, 0, item.id)"
                              v-show="childItem.actionType !== 0"
                              class="icon iconfont icon-hate-empty"
                            ></span>
                            <!-- 已踩图标 -->
                            <span
                              @click="
                                handleRemoveCommentAction(childItem.id, childItem.rootCommentId)
                              "
                              v-show="childItem.actionType === 0"
                              class="icon iconfont icon-hate-fill"
                            ></span>
                          </button>
                        </div>
                        <!-- 回复按钮 -->
                        <div class="reply">
                          <!-- 初始状态点击显示回复框，再次点击相同评论回复隐藏回复框，点击其他评论回复隐藏之前评论的回复框 -->
                          <!-- 每次点击回复按钮改变或重置当前回复评论Id -->
                          <!-- 这里都是根评论，点击回复直接记录当前评论为根评论 -->
                          <button
                            @click="
                              handleReplyFocus(
                                childItem.name,
                                childItem.id,
                                false,
                                childItem.rootCommentId,
                              )
                            "
                          >
                            回复
                          </button>
                        </div>
                        <!-- 修改、删除评论 -->
                        <!-- 修改、删除评论 -->
                        <div class="more">
                          <PopupSelector
                            :options="[
                              { text: '删除', value: 0 },
                              { text: '修改', value: 1 },
                            ]"
                            @select="
                              handleMoreBtnEvent(
                                $event,
                                childItem.id,
                                item.content,
                                childItem.rootCommentId,
                              )
                            "
                          >
                            <button>
                              <!-- v-if="item.userId === userStore.userInfo.id" -->
                              <span class="icon iconfont icon-more"></span>
                            </button>
                          </PopupSelector>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- 页脚 -->
              <div class="expander-footer">
                <!-- 子评论未展开时展示 -->
                <div class="show-more" v-if="!repliesMap.has(item.id)">
                  <span>{{ `共 ${item.children} 条回复，` }}</span>
                  <button @click="getRepliesComment(item.id, 1, item.children)">点击查看</button>
                </div>
                <!-- 子评论展开时展示 -->
                <div class="pagination" v-else>
                  <div class="pagination-head">
                    <span>共{{ Math.floor(+item.children / 10) + 1 }}页</span>
                  </div>
                  <div class="pagination-body">
                    <div
                      class="pageBtn"
                      :class="{ activePageBtn: repliesMap.get(item.id).curPage === pageIndex }"
                      v-for="pageIndex in repliesMap.get(item.id).pageList"
                      :key="pageIndex"
                    >
                      <button @click="getRepliesComment(item.id, pageIndex, item.children)">
                        {{ pageIndex }}
                      </button>
                    </div>
                    <div class="pageBtn">
                      <button
                        @click="getRepliesComment(item.id, repliesMap.get(item.id).curPage + 1)"
                        v-if="repliesMap.get(item.id).curPage < repliesMap.get(item.id).totalPage"
                      >
                        下一页
                      </button>
                      <button
                        @click="getRepliesComment(item.id, repliesMap.get(item.id).curPage - 1)"
                        v-if="repliesMap.get(item.id).curPage > 1"
                      >
                        上一页
                      </button>
                    </div>
                  </div>
                  <div class="pagination-footer">
                    <button @click="repliesMap.delete(item.id)">收起</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 回复框 -->
            <div class="reply-box" v-if="showReplyBoxId === item.id">
              <!-- 用户头像 -->
              <img class="user-avatar" :src="userStore.userInfo.avatar" />
              <div class="comment-area">
                <textarea
                  v-model="replyCommentInput"
                  ref="reply-comment-textarea"
                  id="reply-comment-textarea"
                  class="reply-comment-textarea"
                  :placeholder="`回复 @${replyCommentUserName}：`"
                ></textarea>
                <ButtonEle
                  @click="handleReplyComment()"
                  class="submitBtn"
                  color="var(--primary-accent-color)"
                  fontSize="13px"
                  borderRadius="0.5rem"
                  padding="0.6rem 1rem"
                  width="6rem"
                  height="2.7"
                  type="button"
                  text="发布"
                  :isLoading="isReplyLoading"
                ></ButtonEle>
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
import { delay } from '@/utils/delay'
import PopupSelector from '@/components/PopupSelector.vue'
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
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'

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
async function getMovie() {
  try {
    const res = await getMovieDetail(route.params.id)
    console.log('获取电影信息getFilmDetail--->', res)
    if (res.code === 200) {
      filmDetail.value = res.data
      isLoadComplete.value = true
    } else {
      ElMessage({
        type: 'error',
        message: '获取电影信息失败，' + res.msg,
        plain: true,
      })
      return
    }

    //获取电影pv资源
    getMovieSource(route.params.id).then((res) => {
      filmSource.value = res.data

      console.log('getMovieSource--->', filmSource.value)
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '获取电影信息失败，' + error,
      plain: true,
    })
  }
}

//获取电影所有评论
import { getMovieComment } from '@/api/movie'
//获取子评论列表
import { getRepliesCommentList } from '@/api/movie'
//根评论列表
const commentsList = ref([])
const repliesMap = ref(new Map()) //用Map存储子评论，键为根评论id，值为对象：子评论数组、当前页、页列表、总页
//获取根评论列表
async function getComment() {
  const res = await getMovieComment({
    mediaId: route.params.id,
    page: 1,
    sortType: 0,
    sortOrder: 1,
  })
  console.log('getMovieComment--->', res)
  commentsList.value = res.data.records
}
// 获取当前根评论页的子评论列表，刷新当前Map
async function refreshRepliesComment(rootCommentId) {
  //获取当前页
  console.log(repliesMap.value, rootCommentId)
  if (repliesMap.value.get(rootCommentId)) {
    let { curPage } = repliesMap.value.get(rootCommentId)
    await getRepliesComment(rootCommentId, curPage)
  } else {
    await getRepliesComment(rootCommentId, 1)
  }
}

getComment()
getMovie()

watch(
  () => route.params.id,
  () => {
    getMovie()
    getComment()
  },
)

//评论区和评分逻辑
//提交评论
import { subMovieComment, editMovieComment } from '@/api/movie'
const isEdit = ref(false) //是否在修改评论
const commentInput = ref('')
const currentModifyCommentId = ref(null)
const currentModifyRootComment = ref(null)
const isLoading = ref(false)

//提交评论逻辑
async function handleSubmitComment() {
  try {
    isLoading.value = true
    const params = {
      id: currentModifyCommentId.value,
      content: commentInput.value,
      mediaId: route.params.id,
    }
    if (!isEdit.value) {
      const res = await subMovieComment(params)
      console.log('submitComment--->', res)
      if (res.code === 200) {
        await getComment()
        ElMessage({
          message: '评论成功，请等待审核通过',
          type: 'success',
          plain: true,
        })
        commentInput.value = ''
      } else {
        ElMessage({
          message: `评论失败,${res.msg}`,
          type: 'error',
          plain: true,
        })
      }
    } else {
      const res = await editMovieComment(params)
      console.log('editComment--->', res)
      if (res.code === 200) {
        //审核通过执行成功逻辑
        if (currentModifyRootComment.value === currentModifyCommentId.value) {
          await getComment()
        } else {
          await refreshRepliesComment(currentModifyRootComment.value)
        }
        ElMessage({
          message: '修改成功，请等待审核通过',
          type: 'success',
          plain: true,
        })
        isEdit.value = false
        commentInput.value = ''
        currentModifyCommentId.value = null
        currentModifyRootComment.value = null
      } else {
        ElMessage({
          message: `修改失败,${res.msg}`,
          type: 'error',
          plain: true,
        })
      }
    }
    getComment()
  } catch (error) {
    ElMessage({
      message: '评论失败' + error,
      type: 'error',
      plain: true,
    })
  } finally {
    isLoading.value = false
  }
}

//回复评论逻辑
import { replyMovieComment } from '@/api/movie'
const isReplyLoading = ref(false) //回复按钮加载状态
const replyCommentInput = ref('') //回复框内容
const showReplyBoxId = ref(null) //显示回复框的根评论id
const replyCommentId = ref(null) //回复的评论id
const replyCommentUserName = ref(null) //回复的评论作者名,用于显示在回复框以及提交回复时使用
const isReplyRootComment = ref(false) //是否回复根评论
//提交回复评论
async function handleReplyComment() {
  try {
    isReplyLoading.value = true
    // 若回复的是子评论，则需要拼接回复内容
    const res = await replyMovieComment({
      parentCommentId: replyCommentId.value,
      content: isReplyRootComment.value
        ? replyCommentInput.value
        : `回复 @${replyCommentUserName.value}: ${replyCommentInput.value}`,
    })
    console.log('replyComment--->', res)
    if (res.code === 200) {
      // 根据当前回复的评论所在的根评论，刷新子评论列表，显示回复的评论
      await refreshRepliesComment(showReplyBoxId.value)
      //回复提交成功，将数据清空
      replyCommentInput.value = ''
      showReplyBoxId.value = null
      replyCommentId.value = null
      replyCommentUserName.value = null
      ElMessage({
        message: '回复成功，请等待审核通过',
        type: 'success',
        plain: true,
      })
    } else {
      ElMessage({
        message: `回复失败,${res.msg}`,
        type: 'error',
        plain: true,
      })
    }
  } catch (error) {
    ElMessage({
      message: '回复失败' + error,
      type: 'error',
      plain: true,
    })
  } finally {
    isReplyLoading.value = false
  }
}
//点击回复按钮逻辑
import { scrollToElementCenter } from '@/utils/scrollToElement'
const replyTextarea = useTemplateRef('reply-comment-textarea') //获取输入框元素
function handleReplyFocus(username, commentId, isRootComment, rootCommentId) {
  // 如果点击的是同一个评论，再次点击隐藏回复框 重置数据 退出函数
  if (replyCommentId.value === commentId) {
    showReplyBoxId.value = null
    replyCommentId.value = null
    replyCommentUserName.value = null
    return
  }
  // 每次点击回复都清空回复框内容,保证每次回复都是新的
  replyCommentInput.value = ''
  // 每次点击回复都收集当前回复的 1.评论id 2.用户名 3.是否是根评论 留给提交回复时使用
  replyCommentId.value = commentId
  replyCommentUserName.value = username
  isReplyRootComment.value = isRootComment
  showReplyBoxId.value = rootCommentId

  //数据改变后显示输入框，但等dom渲染完之后才聚焦
  nextTick(() => {
    console.log('replyTextarea--->', replyTextarea.value[0])
    replyTextarea.value[0].focus()
    scrollToElementCenter('reply-comment-textarea')
  })
}

// 点击更多按钮逻辑 删除或修改
import { deleteMovieComment } from '@/api/movie'
async function handleMoreBtnEvent(value, commentId, content, rootCommentId) {
  //value 0删除 1修改
  if (value === 0) {
    //执行删除逻辑
    try {
      const res = await deleteMovieComment(commentId)
      console.log('deleteComment--->', res)
      if (res.code === 200) {
        if (rootCommentId === commentId) {
          //为根评论，更新根组件列表
          getComment()
        } else {
          //为子评论，更新当前根组件子评论页列表
          refreshRepliesComment(rootCommentId)
        }
      } else {
        ElMessage({
          message: '删除失败,' + res.msg,
          type: 'error',
          plain: true,
        })
      }
    } catch (error) {
      ElMessage({
        message: '删除失败,' + error,
        type: 'error',
        plain: true,
      })
    }
  } else if (value === 1) {
    //执行修改逻辑
    commentInput.value = content
    isEdit.value = true
    currentModifyCommentId.value = commentId
    currentModifyRootComment.value = rootCommentId
    document.getElementById('comment-textarea').focus()
    scrollToElementCenter('comment-textarea')
  }
}

//点赞、踩 功能
import { MovieCommentAction } from '@/api/movie'
import { removeMovieCommentAction } from '@/api/movie'
//点赞、踩 评论
async function handleCommentAction(commentId, actionType, rootCommentId) {
  try {
    const res = await MovieCommentAction({
      commentId,
      actionType,
    })
    console.log('starComment--->', res)
    if (res.code === 200) {
      //成功重新获取数据 更新视图
      if (rootCommentId === commentId) {
        getComment()
      } else {
        refreshRepliesComment(rootCommentId)
      }
    } else {
      ElMessage({
        message: '操作失败,' + res.msg,
        type: 'error',
        plain: true,
      })
    }
  } catch (error) {
    ElMessage({
      message: '操作失败,' + error,
      type: 'error',
      plain: true,
    })
  }
}
//取消点赞、踩评论
async function handleRemoveCommentAction(commentId, rootCommentId) {
  try {
    const res = await removeMovieCommentAction(commentId)
    console.log('removeStarComment--->', res)
    if (res.code === 200) {
      //成功重新获取数据 更新视图
      if (rootCommentId === commentId) {
        getComment()
      } else {
        refreshRepliesComment(rootCommentId)
      }
    } else {
      ElMessage({
        message: '操作失败,' + res.msg,
        type: 'error',
        plain: true,
      })
    }
  } catch (error) {
    ElMessage({
      message: '操作失败,' + error,
      type: 'error',
      plain: true,
    })
  }
}

//实现子评论逻辑
//维护动态分页列表,返回分页列表
function calcPageList(totalPage, curPage) {
  console.log(totalPage)
  return Array.from({ length: totalPage }, (v, k) => k + 1)
}
//获取不同页子评论
async function getRepliesComment(commentId, page) {
  try {
    const res = await getRepliesCommentList({
      commentId,
      page,
    })
    console.log('getMoreComment--->', res)
    if (res.code === 200) {
      //成功后更新子评论列表和当前页码，重新计算分页列表，更新视图
      repliesMap.value.set(commentId, {
        replies: res.data.records,
        curPage: page,
        totalPage: Math.floor(res.data.total / 10) + 1,
        pageList: calcPageList(Math.floor(res.data.total / 10) + 1, 1),
      })
    } else {
      ElMessage({
        message: '获取子评论失败' + res.msg,
        type: 'error',
        plain: true,
      })
    }
  } catch (error) {
    ElMessage({
      message: '获取子评论失败' + error,
      type: 'error',
      plain: true,
    })
  }
}

// 实现评分逻辑，例如发送请求到后端保存评分
import { rateMovie } from '@/api/user'
import M3U8Player from '@/components/M3U8Player.vue'
import ButtonEle from '@/components/ButtonEle.vue'
const colors = ref([
  'var(--primary-border-color)',
  'var(--primary-accent-color)',
  'var(--secondary-accent-color)',
])
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
      plain: true,
    })
  } catch (error) {
    console.error('提交用户信息时出错：', error)
    ElMessage({
      message: '评分失败',
      type: 'error',
      plain: true,
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

    .header-main-container {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      animation: slideUp 1.1s ease -0.2s;
      h1 {
        transform: translateX(-1.5rem);
        font-size: 3.5rem;
      }

      .tags-container {
        display: flex;
        align-items: center;
        justify-content: start;
        opacity: 0.9;
      }

      .releaseTime-container {
        opacity: 0.7;
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
      animation: slideUp 1.1s ease -0.1s;

      /*
      用于设置电影介绍字体
      */
      .description {
        color: var(--primary-font-color);
        width: 50%;
        font-size: 1rem;
        line-height: 2rem;
      }

      img {
        border-radius: 0.9rem;
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
          border: 1px solid var(--primary-border-color);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

          &:focus,
          &:hover {
            border: 1px solid var(--primary-font-color);
          }
        }
        .button-group {
          align-self: flex-end;
          display: flex;
          gap: 1rem;
        }

        .comment-item {
          border-bottom: 1px solid var(--primary-border-color);
          width: 100%;
          min-height: 3rem;
          display: flex;
          flex-direction: column;
          padding-bottom: 1rem;

          /*清除原有按钮样式, 用于文字按钮*/
          button {
            padding: 0px;
            outline: none;
            border: none;
            background: transparent;
            height: 24px;
            font-size: 13px;
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            color: inherit;
            transition: color 0.1s;
            gap: 5px;

            &:hover {
              color: var(--primary-accent-color);
            }
          }

          &:last-child {
            border: none;
          }

          .comment {
            width: 100%;
            display: flex;
            gap: 1rem;

            .comment-item-left {
              flex-shrink: 0;
              img {
                height: 3rem;
                width: 3rem;
                border-radius: 50%;
                object-fit: cover;
              }
            }

            .comment-item-right {
              display: flex;
              flex-direction: column;
              width: 100%;
              align-items: start;
              gap: 0.5rem;
              flex-grow: 1;

              &:hover {
                .main-detail-container > .more {
                  opacity: 1;
                }
              }

              .comment-name {
                font-size: 1.1rem;
                color: var(--primary-accent-color);
              }

              .comment-content {
                font-size: 1.2rem;
                margin-top: 0.5rem;
                color: var(--quaternary-font-color);
                width: 100%;
              }

              .main-detail-container {
                display: flex;
                align-items: center;
                width: 100%;
                font-size: 0.8rem;
                color: var(--secondary-border-color);

                /*设置直接子元素除了第一个时间元素的所有子元素左边距*/
                > :not(:first-child) {
                  margin-left: 20px;
                }

                .more {
                  margin-left: auto;
                  margin-right: 20px;
                  opacity: 1;
                }
              }
            }
          }

          .replies {
            width: calc(100% - 4rem);
            margin-left: auto;

            .child-comment-item {
              width: 100%;
              min-height: 3rem;
              display: flex;
              flex-direction: column;
              padding-bottom: 1rem;
              margin-top: 1rem;

              .child-comment {
                width: 100%;
                display: flex;
                gap: 1rem;

                .child-comment-item-left {
                  flex-shrink: 0;
                  img {
                    height: 2rem;
                    width: 2rem;
                    border-radius: 50%;
                    object-fit: cover;
                  }
                }

                .child-comment-item-right {
                  display: flex;
                  flex-direction: column;
                  width: 100%;
                  align-items: start;
                  gap: 0.5rem;
                  flex-grow: 1;

                  &:hover {
                    .child-main-detail-container > .more {
                      opacity: 1;
                    }
                  }
                  .child-comment-content-name {
                    .child-comment-name {
                      font-size: 1.1rem;
                      color: var(--primary-accent-color);
                      width: auto;
                      display: inline-block;
                      margin-right: 0.7rem;
                    }

                    .child-comment-content {
                      width: auto;
                      font-size: 1.2rem;
                      color: var(--quaternary-font-color);
                      display: inline;
                    }
                  }
                  .child-main-detail-container {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    font-size: 0.8rem;
                    color: var(--secondary-border-color);

                    /*设置直接子元素除了第一个时间元素的所有子元素左边距*/
                    > :not(:first-child) {
                      margin-left: 20px;
                    }

                    .more {
                      margin-left: auto;
                      margin-right: 20px;
                      opacity: 0;
                    }
                  }
                }
              }
            }
            .expander-footer {
              margin-top: 1rem;
              .show-more {
                display: flex;
                align-items: center;
                color: var(--secondary-border-color);
                font-size: 0.8rem;
              }
              .pagination {
                display: flex;
                font-size: 0.8rem;
                align-items: center;
                .pagination-body {
                  display: flex;
                  margin-left: 1.5rem;
                  gap: 0.7rem;

                  .activePageBtn {
                    button {
                      color: var(--primary-accent-color);
                    }
                  }
                }
                .pagination-footer {
                  margin-left: 1rem;
                  margin-right: 1.5rem;
                }
              }
            }
          }

          .reply-box {
            display: flex;
            gap: 1rem;
            width: calc(100% - 4rem);
            margin-left: auto;
            margin-top: 2rem;
            .user-avatar {
              height: 3rem;
              width: 3rem;
              border-radius: 50%;
              object-fit: cover;
            }
            .comment-area {
              flex-grow: 1;
              .reply-comment-textarea {
                width: 100%;
                height: 5rem;
                background-color: transparent;
                border-radius: 0.4rem;
                color: var(--primary-font-color);
                font-size: 1rem;
                padding: 0.7rem;
                border: 1px solid var(--tertiary-font-color);
                transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

                &:focus {
                  border: 1px solid var(--primary-font-color);
                }
              }
              .submitBtn {
                display: block;
                margin-top: 1rem;
                margin-left: auto;
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

            h2 {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: -5px;
            }
          }
        }
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
      animation: slideUp 1.1s ease;
    }
  }
}
</style>
