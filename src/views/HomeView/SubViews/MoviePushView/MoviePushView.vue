<template>
  <div class="push-container">
    <canvas id="starfield"></canvas>
    <div class="header-section">
      <div class="header-left">
        <WelcomCard />
        <div class="tab-container">
          <CategoryButton />
          <ForumButton />
          <MessageButton />
        </div>
      </div>
      <div class="header-right">
        <ExplainCard />
      </div>
    </div>

    <div class="main-content">
      <div class="film-list-section">
        <FilmList />
      </div>
      <div class="ranking-section">
        <RankingBox />
      </div>
    </div>
  </div>
</template>

<script setup>
import WelcomCard from './SubComponents/WelcomCard.vue'
import ExplainCard from './SubComponents/ExplainCard.vue'
import CategoryButton from './SubComponents/CategoryButton.vue'
import ForumButton from './SubComponents/ForumButton.vue'
import MessageButton from './SubComponents/MessageButton.vue'
import FilmList from './SubComponents/FilmList.vue'
import RankingBox from './SubComponents/RankingBox.vue'
import { onMounted} from 'vue'
onMounted(() => {
  // 获取Canvas元素和上下文
  const canvas = document.querySelector('#starfield')
  const container = document.querySelector('.push-container')
  const ctx = canvas.getContext('2d')
  const colors = ['#fffb1c', '#ffffff']
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  // 设置Canvas大小
  canvas.width = container.offsetWidth
  canvas.height = container.offsetHeight

  // 星星数量
  const numStars = 500

  // 星星对象数组
  const stars = []

  // 创建星星对象
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedX: Math.random() * 0.2 + 0.05, // 水平速度，调整为左下到右上的方向
      speedY: -Math.random() * 0.2 - 0.05, // 垂直速度，调整为左下到右上的方向
      size: Math.random() * 1 + 0.6,
      color: getRandomColor(),
    })

    if (i < 5) {
          stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedX: Math.random() * 0.2 + 0.05+1, // 水平速度，调整为左下到右上的方向
      speedY: -Math.random() * 0.2 - 0.05-1, // 垂直速度，调整为左下到右上的方向
      size: Math.random() * 1 + 1.3,
      color: getRandomColor(),
    })
    }
  }

  // 动画函数
  function animate() {
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制星星
    for (let i = 0; i < numStars; i++) {
      const star = stars[i]
      // 设置星星或流星颜色

      // 绘制星星
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = star.color
      ctx.fill()

      // 更新星星或流星位置
      star.x += star.speedX
      star.y += star.speedY

      // 检查星星或流星是否超出画布边界
      if (
        star.x > canvas.width ||
        star.y < 0 ||
        (star.isMeteor && star.x > canvas.width && star.y < 0)
      ) {
        // 如果是流星，则移除它
        // 普通星星重置到左下角并赋予新颜色
        star.x = Math.random() * canvas.width
        star.y = Math.random() * canvas.height
        star.color = getRandomColor()
      }
    }

    // 请求下一帧
    requestAnimationFrame(animate)
  }

  // 开始动画
  animate()

  // 调整画布大小
  window.addEventListener('resize', () => {
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
  })
})
</script>

<style lang="scss" scoped>
.push-container {
  color: #fffb1c;
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  padding: 1.5rem 2.5rem;
  flex-direction: column;
  gap: 2rem;
  overflow: hidden;
  #starfield {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    opacity: 0.4;
  }
  .header-section {
    width: 100%;
    height: 20.5rem;
    display: flex;
    gap: 1rem;

    .header-left {
      flex-shrink: 0;
      width: 53%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .tab-container {
        flex-shrink: 1;
        width: 100%;
        height: 100%;
        display: flex;
        gap: 1rem;
      }
    }

    .header-right {
      width: 100%;
      height: 100%;
    }
  }

  .main-content {
    width: 100%;
    display: flex;
    gap: 1rem;
    .film-list-section {
      flex-shrink: 0;
      width: 80%;
      display: flex;
      flex-direction: column;
    }

    .ranking-section {
      width: 100%;
    }
  }
}
@media (max-width: 1024px) {
  .header-left {
    width: 100% !important;
  }
  .header-right {
    display: none;
  }
  .main-content {
    .film-list-section {
      flex-shrink: 0;
      width: 100% !important;
      display: flex;
      flex-direction: column;
    }

    .ranking-section {
      display: none;
    }
  }
}
</style>
