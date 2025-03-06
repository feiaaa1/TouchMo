<template>
  <div
    class="messageButton-container"
    :style="{
      color: `${styleStore.NavigationState.isMovieDetail ? (styleStore.NavigationState.isScrollTop ? 'white' : 'var(--primary-font-color)') : 'var(--primary-font-color)'}`,
    }"
  >
    <!-- 消息图标 -->
    <span
      @click.stop="isShowMessageBox = !isShowMessageBox"
      class="icon iconfont icon-message"
    ></span>
    <Transition name="messageBox">
      <!-- 消息容器  -->
      <div v-if="isShowMessageBox" class="message-container">
        <!-- 消息列表框 -->
        <div
          class="message-box"
          :style="{ transform: `translateX(${isActionBoxVisible ? '-10rem' : '0'})` }"
        >
          <!-- 消息框头部 -->
          <div class="message-box-header">
            <h3>Notifications</h3>
            <span
              @click.stop="isActionBoxVisible = !isActionBoxVisible"
              class="icon iconfont icon-showMore"
            ></span>
          </div>
          <!-- 消息框主体 -->
          <div class="message-box-body">
            <template v-if="messageList.length > 0">
              <!-- 消息主体 -->
              <div
                @click="clickMessageItem(item)"
                class="message-item"
                :class="{ 'message-item-active': selectedItems.has(item.id) }"
                v-for="item in messageList"
                :key="item.id"
              >
                <div class="item-body">
                  <div class="content">
                    <span class="content-type">{{
                      item.type === 0 ? '点赞' : item.type === 1 ? '回复' : '系统消息'
                    }}</span
                    ><span class="content-text">{{ item.content }}</span>
                  </div>
                  <div class="createTime">{{ item.createTime }}</div>
                </div>
                <div class="item-footer">
                  <div v-if="!isBatchSelect && status === 0" class="redPoint"></div>
                  <div v-if="isBatchSelect" class="checkBox">
                    <span
                      v-if="selectedItems.has(item.id)"
                      class="icon iconfont icon-checkMark"
                    ></span>
                  </div>
                </div>
              </div>
              <!-- 分页器 -->
              <div class="pageSelect">
                <PaginationEle
                  :total="total"
                  :current-page="current_page"
                  :pager-count="4"
                  :show-total="true"
                  @page-change="handlePageChange"
                />
              </div>
            </template>
            <template v-else>
              <div class="message-noMsg">暂无消息</div>
            </template>
          </div>
        </div>
        <!-- 消息选择框 -->
        <Transition name="actionBox">
          <div v-if="isActionBoxVisible" class="message-select-box">
            <div class="message-select-box-header"></div>
            <div class="message-select-box-body">
              <div class="switch-box">
                <p>未读</p>
                <el-switch
                  v-model="status"
                  style="
                    --el-switch-on-color: var(--primary-accent-color);
                    --el-switch-off-color: var(--primary-func-color);
                  "
                  :active-value="1"
                  :inactive-value="0"
                  @change="getMessageList()"
                />
                <p>已读</p>
              </div>
              <div class="switch-box">
                <p>升序</p>
                <el-switch
                  v-model="sortOrder"
                  style="
                    --el-switch-on-color: var(--primary-accent-color);
                    --el-switch-off-color: var(--primary-func-color);
                  "
                  :active-value="1"
                  :inactive-value="0"
                  @change="getMessageList()"
                />
                <p>降序</p>
              </div>
              <ButtonEle
                @click="((isBatchSelect = !isBatchSelect), selectedItems.clear())"
                width="100%"
                :text="`${!isBatchSelect ? '批量选择' : '取消选择'}`"
                padding="1rem 0rem"
              />
              <template v-if="isBatchSelect">
                <ButtonEle
                  @click.stop="handleRemoveMessage()"
                  color="var(--secondary-func-color)"
                  width="100%"
                  text="删除"
                  padding="1rem 0rem"
                  :is-loading="isDeleteLoading"
                />
                <ButtonEle
                  @click.stop="handleSetMessagesReadBatch()"
                  color="var(--primary-func-color)"
                  width="100%"
                  text="已读"
                  padding="1rem 0rem"
                  :is-loading="isReadLoading"
                />
              </template>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStyleStateStore } from '@/stores/styleState'
import { fetchMessage, removeMessage, setMessagesReadBatch } from '@/api/user'
import { ElMessage, ElNotification } from 'element-plus'
import ButtonEle from '@/components/ButtonEle.vue'
import PaginationEle from '@/components/PaginationEle.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const styleStore = useStyleStateStore()
//请求参数
const messageList = ref([]) //当前页消息列表
const total = ref(0) //总条目数
const current_page = ref(1) //当前页码
const isActionBoxVisible = ref(false) //操作框显示状态
const isShowMessageBox = ref(false) //消息框显示状态
const status = ref(0) //未读 已读状态
const sortOrder = ref(1) //升序 降序状态
const isBatchSelect = ref(false) //批量选择状态
const selectedItems = ref(new Set()) //批量选择的消息列表id集合

async function handlePageChange(page) {
  console.log(page)
  const prePage = current_page.value
  current_page.value = page
  const res = await getMessageList()
  if (!res) {
    current_page.value = prePage
  }
}

//拉取消息列表
async function getMessageList() {
  try {
    const params = {
      status: status.value,
      page: current_page.value,
      sortOrder: sortOrder.value,
    }
    const res = await fetchMessage(params)
    console.log('获取消息列表--->', res)
    if (res.code === 200) {
      messageList.value = res.data.records
      total.value = res.data.total
      return true
    } else {
      ElMessage.error('消息获取失败，' + res.msg)
      return false
    }
  } catch (error) {
    ElMessage.error('消息获取失败，' + error)
    return false
  }
}

//点击消息
async function clickMessageItem(msgItemObj) {
  //情况一：不是批量选择状态 点击跳转到指定电影页面(待定)
  if (!isBatchSelect.value) {
    // router.push({
    //   name: 'movieDetail',
    //   params: {id: msgItemObj.}
    // })
  } else {
    // 情况二：批量选择状态，将消息id添加或移除到集合中
    if (!selectedItems.value.has(msgItemObj.id)) {
      selectedItems.value.add(msgItemObj.id)
    } else {
      selectedItems.value.delete(msgItemObj.id)
    }
  }
}

//批量删除消息
const isDeleteLoading = ref(false)
async function handleRemoveMessage() {
  isDeleteLoading.value = true
  try {
    const res = await removeMessage(
      [...selectedItems.value].map((id) => `messageIds=${id}`).join('&'),
    )
    console.log('删除消息---->', res)
    if (res.code === 200) {
      getMessageList()
      ElMessage.success('删除成功')
      selectedItems.value.clear()
    } else {
      ElMessage.error(`删除失败，${res.msg}`)
    }
  } catch (error) {
    ElMessage.error(`删除失败，${error}`)
  } finally {
    isDeleteLoading.value = false
  }
}

//批量已读消息
const isReadLoading = ref(false)
async function handleSetMessagesReadBatch() {
  isReadLoading.value = true
  try {
    const res = await setMessagesReadBatch(
      [...selectedItems.value].map((id) => `messageIds=${id}`).join('&'),
    )
    console.log('批量已读消息---->', res)
    if (res.code === 200) {
      getMessageList()
      ElMessage.success('批量已读成功')
      selectedItems.value.clear()
    } else {
      ElMessage.error(`批量已读失败，${res.msg}`)
    }
  } catch (error) {
    ElMessage.error(`批量已读失败，${error}`)
  } finally {
    isReadLoading.value = false
  }
}

//与服务器建立websocket连接
function connectWebSocket() {
  // 从本地存储（例如 localStorage）获取 token
  const token = localStorage.getItem('token')
  const ws = new WebSocket('wss://kyz.free.svipss.top/ws?token=' + token)
  ws.onopen = async () => {
    ElNotification({
      title: '消息',
      message: 'websocket连接已建立',
      type: 'success',
    })
    await getMessageList(0, 1, 0)
  }
  ws.onmessage = async (e) => {
    ElNotification({
      title: '消息',
      message: '收到新消息',
      type: 'success',
    })
    await getMessageList()
  }
  ws.onclose = () => {
    ElNotification({
      title: '消息',
      message: 'websocket连接已关闭',
      type: 'warning',
    })
  }
  ws.onerror = () => {
    ElNotification({
      title: '消息',
      message: 'websocket连接出错',
      type: 'error',
    })
  }
}

connectWebSocket()
</script>

<style lang="scss" scoped>
.messageButton-container {
  position: relative;
  box-sizing: border-box;
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

  &:has(.icon-message:hover) {
    background-color: var(--primary-accent-color);
  }
  .icon-message {
    font-size: 2rem;
    cursor: pointer;

    &:hover {
      color: var(--secondary-font-color);
    }
  }
  .message-container {
    position: absolute;
    z-index: 1;
    top: 120%;
    right: 0;
    transition: transform 0.5s;
    .message-box {
      position: relative;
      z-index: 2;
      width: 20rem;
      border-radius: 6px;
      box-shadow: 0px 0px 10px 3px rgba(0, 0, 0);
      background-color: var(--tertiary-bg-color);
      transition: transform 0.5s;
      overflow: hidden;
      .message-box-header {
        padding: 0.5rem 1rem;
        height: 3rem;
        background-color: var(--secondary-bg-color);
        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon-showMore {
          font-size: 1.3rem;
          transition: all 0.3s;
          height: 2rem;
          width: 2rem;
          border-radius: 50%;
          text-align: center;
          line-height: 2rem;
          &:hover {
            color: var(--secondary-font-color);
            background-color: var(--primary-accent-color);
          }
        }
      }

      .message-box-body {
        height: 18rem;
        overflow-y: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          width: 10px;
        }

        &::-webkit-scrollbar-track {
          background: var(--quaternary-bg-color);
        }

        &::-webkit-scrollbar-thumb {
          background: var(--primary-border-color);
          border-radius: 10px;
        }
        &::-webkit-scrollbar-button {
          display: none;
        }
        .message-item-active {
          border: 1px solid var(--primary-accent-color);
        }
        .message-item {
          cursor: pointer;
          padding: 0.5rem 1rem;
          height: 5.6rem;
          background-color: var(--tertiary-bg-color);
          color: var(--primary-font-color);
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          &:hover {
            background-color: var(--tertiary-border-color);
            color: var(--secondary-font-color);
          }
          .item-body {
            .content {
              display: -webkit-box; /* 将元素设置为弹性盒子 */
              -webkit-line-clamp: 2; /* 限制显示的行数 */
              -webkit-box-orient: vertical; /* 设置盒子的方向为垂直 */
              overflow: hidden; /* 隐藏溢出的内容 */
              text-overflow: ellipsis; /* 溢出时显示省略号 */

              .content-type {
                font-weight: 600;
                color: var(--primary-accent-color);
                display: inline-block;
                margin-right: 0.4rem;
              }
            }
            .createTime {
              color: var(--secondary-border-color);
            }
          }

          .item-footer {
            .redPoint {
              height: 0.4rem;
              width: 0.4rem;
              background-color: #e63838;
              border-radius: 50%;
            }
            .checkBox {
              height: 1.2rem;
              width: 1.2rem;
              text-align: center;
              line-height: 1.2rem;
              border: 1px solid var(--primary-accent-color);
              .icon-checkMark {
                color: var(--primary-accent-color);
              }
            }
          }
        }
        .message-noMsg {
          padding: 0.5rem 0;
          text-align: center;
          color: var(--primary-font-color);
        }

        .pageSelect {
          background-color: transparent !important;
          margin-left: 1rem;
        }
      }
    }
    .message-select-box {
      height: 21rem;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 0;
      width: 10rem;
      border-radius: 0 6px 6px 0;
      overflow: hidden;
      box-shadow: 0px 0px 10px 3px rgba(0, 0, 0);
      background-color: var(--tertiary-bg-color);

      .message-select-box-header {
        height: 3rem;
        background-color: var(--secondary-bg-color);
      }
      .message-select-box-body {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        .switch-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
}
.actionBox-enter-active,
.actionBox-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.actionBox-enter-from,
.actionBox-leave-to {
  opacity: 0;
  transform: translateX(-5rem);
}

.messageBox-leave-active,
.messageBox-enter-active {
  transition: all 0.3s ease !important;
}

.messageBox-enter-from,
.messageBox-leave-to {
  opacity: 0 !important;
  transform: translateY(2rem) !important;
}
</style>
