<template>
  <div>
    <!-- 加载蒙层 -->
    <div v-if="!isPlaying" class="loading-overlay">
      <div class="loading-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: loadingProgress + '%' }"></div>
        </div>
        <span>{{ Math.floor(loadingProgress) }}%</span>
      </div>
    </div>

    <video id="videoPlayer" autoplay controls @playing="onVideoPlaying"></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Hls from 'hls.js'

const props = defineProps({
  videoUrl: { type: String, required: true },
})

const loadingProgress = ref(0)
const isPlaying = ref(true)
let hlsInstance = null
let bufferCheckInterval = null

// 分阶段进度更新
const updateProgress = (base, increment) => {
  loadingProgress.value = Math.min(base + Math.random() * increment, 95)
}

// 初始化播放器
const initPlayer = () => {
  const video = document.getElementById('videoPlayer')
  if (!video) return

  if (Hls.isSupported()) {
    hlsInstance = new Hls()

    // HLS 事件监听
    hlsInstance.on(Hls.Events.MANIFEST_LOADED, () => {
      updateProgress(30, 5) // 清单加载完成
    })

    hlsInstance.on(Hls.Events.FRAG_LOADING, () => {
      updateProgress(50, 1)
    })

    hlsInstance.on(Hls.Events.FRAG_LOADED, (_, data) => {
      if (data.frag.sn === 0) {
        // 第一个分片
        updateProgress(80, 5)
      }
    })

    hlsInstance.loadSource(props.videoUrl)
    hlsInstance.attachMedia(video)

    // 启动缓冲检查
    startBufferCheck(video)
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = props.videoUrl
    startBufferCheck(video)
  }
}

// 开始缓冲检查
const startBufferCheck = (video) => {
  bufferCheckInterval = setInterval(() => {
    if (video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1)
      const duration = video.duration || 1
      const bufferPercent = (bufferedEnd / duration) * 100
      loadingProgress.value = Math.max(loadingProgress.value, Math.min(95, bufferPercent))
    }
  }, 500)
}

// 视频开始播放
const onVideoPlaying = () => {
  loadingProgress.value = 100
  setTimeout(() => {
    isPlaying.value = true
  }, 300) // 保持进度条完成动画
}

// 生命周期
onMounted(initPlayer)
onUnmounted(() => {
  if (hlsInstance) hlsInstance.destroy()
  clearInterval(bufferCheckInterval)
})

// 监听 URL 变化
watch(
  () => props.videoUrl,
  (newVal) => {
    if (newVal) {
      loadingProgress.value = 0
      isPlaying.value = false
      initPlayer()
    }
  },
)
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.loading-progress {
  width: 300px;
  text-align: center;
  color: white;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-fill {
  height: 100%;
  background: #00a1ff;
  transition: width 0.3s ease;
}

#videoPlayer {
  width: 100%;
  height: auto;
}
</style>
