<template>
  <div>
    <video id="videoPlayer" controls></video>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import Hls from 'hls.js'
import { ElMessage } from 'element-plus'
const props = defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
})
// 使用 ref 来引用视频元素（虽然在这个例子中没有特别需要，但这是一个常见的做法）

onMounted(() => {
  refreshVideo()
})

watch(
  () => props.videoUrl,
  (newVal) => {
    refreshVideo()
  },
)

function refreshVideo() {
  const video = document.querySelector('#videoPlayer')
  if (Hls.isSupported()) {
    const hls = new Hls()
    hls.loadSource(props.videoUrl)
    hls.attachMedia(video)
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // 如果浏览器原生支持 HLS（如 Safari），则直接设置视频源
    video.src = props.videoUrl
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
  } else {
    console.error('Your browser does not support HLS')
    ElMessage.error('视频播放失败')
  }
}
</script>

<style lang="scss" scoped>
/* 添加一些基本的样式 */
video {
  width: 100%;
  height: auto;
  border-radius: 0.7rem;
  transition: all 0.2s;
  &:hover {
    box-shadow: 3px 16px 22px -1px rgba(0, 0, 0, 0.65);
  }
}
</style>
