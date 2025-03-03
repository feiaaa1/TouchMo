<template>
  <div v-if="isLoadComplete" class="moviePlayer-container">
    <main>
      <div class="left-container">
        <!-- 视频播放区域 -->
        <div class="videoPlayer">
          <M3U8Player :video-url="videoUrl" />
        </div>
        <!-- 线路选择区域 -->
        <div class="LineGroup-conatiner">
          <div class="button" :key="item" v-for="item in lineGroup">
            <ButtonEle
              @click="((currentLine = item), handleGetMediaVideo())"
              width="fit-content"
              height="3"
              padding="0 1.5rem"
              :text="item + '线路'"
              :color="
                item == currentLine ? 'var(--primary-func-color)' : 'var(--primary-font-color)'
              "
            />
          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="episode-container">
          <div v-for="episodeItem in episodeList" :key="episodeItem.id" class="episode-item">
            <ButtonEle
              @click="handleGetMediaVideoUrl(episodeItem)"
              height="3.5"
              :text="episodeItem.description"
              :color="
                episodeItem.episode == currentEpisode
                  ? 'var(--primary-accent-color)'
                  : 'var(--primary-font-color)'
              "
            />
          </div>
        </div>
        <div class="pagination-container">
          <PaginationEle
            v-model:currentPage="currentPage"
            :total="total"
            :show-total="true"
            :pager-count="4"
            @page-change="handleGetMediaVideo()"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ButtonEle from '@/components/ButtonEle.vue'
import M3U8Player from '@/components/M3U8Player.vue'
import PaginationEle from '@/components/PaginationEle.vue'
const isLoadComplete = ref(false)
const route = useRoute()
const lineGroup = ref([]) //存储线路列表
const episodeList = ref([]) //存储集数列表
const currentLine = ref(null) //存储当前选中线路
const currentEpisode = ref(null) //存储当前集数
const currentPage = ref(1) //存储当前页
const videoUrl = ref('') //存储当前视频播放路径
const sortOrder = ref(0) //升序0 降序1状态
const total = ref(null) //存储总集数

//获取所有线路
import { getMediaLineList } from '@/api/movie'
import { ElMessage } from 'element-plus'
async function handleGetMediaLineList() {
  try {
    const res = await getMediaLineList(route.params.id)
    if (res.code === 200) {
      lineGroup.value = res.data
      //第一个线路为默认
      currentLine.value = lineGroup.value[0]
      console.log('获取电影线路--->', res)
    } else {
      ElMessage.error('线路获取失败，' + res.msg)
    }
  } catch (error) {
    ElMessage.error('线路获取失败，' + error)
  }
}
//初始获取所有线路
handleGetMediaLineList()
//线路变化时更新集数信息列表
watch(currentLine, () => {
  handleGetMediaVideo()
})

//获取当前线路集数
import { getMediaVideo } from '@/api/movie'
async function handleGetMediaVideo() {
  try {
    const res = await getMediaVideo({
      mediaId: route.params.id,
      line: currentLine.value,
      page: currentPage.value,
      sortOrder: sortOrder.value,
    })
    console.log('获取电影集数信息--->', res)
    if (res.code === 200) {
      episodeList.value = res.data.records
      isLoadComplete.value = true
      total.value = res.data.total
    } else {
      ElMessage.error('获取集数失败，' + res.msg)
    }
  } catch (error) {
    ElMessage.error('获取集数失败，' + error)
  }
}

//获取视频播放路径
import { getMediaVideoUrl } from '@/api/movie'
async function handleGetMediaVideoUrl(episodeItem) {
  currentEpisode.value = episodeItem.episode
  try {
    const res = await getMediaVideoUrl({
      mediaId: episodeItem.mediaId,
      videoId: episodeItem.id,
    })
    console.log('获取视频播放器地址--->', res)

    if (res.code === 200) {
      videoUrl.value = res.data
    } else {
      ElMessage.error('视频播放地址获取失败，' + res.msg)
    }
  } catch (error) {
    ElMessage.error('视频播放地址获取失败，' + error)
  }
}
</script>

<style lang="scss" scoped>
.moviePlayer-container {
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

      .videoPlayer {
        margin-bottom: 2rem;
      }

      .LineGroup-conatiner {
        width: 100%;
        overflow: scroll;
        overflow-y: hidden;
        display: flex;
        gap: 1rem;
        padding-bottom: 1rem;
        &::-webkit-scrollbar {
          height: 10px;
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
        .button {
          flex-shrink: 0;
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
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .episode-container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .pagination-container {
        width: 100%;
      }
    }
  }
}
</style>
