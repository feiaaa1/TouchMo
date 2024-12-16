<template>
    <div :class="['home-container',isDark?'dark-theme':'light-theme']">
          <canvas id="starfield"></canvas>
      <NavigationBar />
      <RouterView />
      <FooterComponent />
      <SearchBox />
      <LoginBox />
    </div>
</template>

<script setup>
import NavigationBar from './NavigationBar/NavigationBar.vue';
import FooterComponent from './FooterComponent/FooterComponent.vue';
import SearchBox from '@/components/SearchBox.vue';
import LoginBox from '@/components/LoginBox.vue';
import { useStyleStateStore } from '@/stores/styleState';
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

onMounted(() => {
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
    if (i < 2) {
      // 创建流星
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: Math.random() * 0.5 + 3, // 水平速度，调整为较快的流星
        speedY: -Math.random() * 0.5 - 3, // 垂直速度，调整为较快的流星
        size: Math.random() * 0.3 + 1.3,
        color: getRandomColor(),
        trail: [], // 存储流星的轨迹
        trailLength: 10, // 轨迹长度
        trailOpacity: 0.2, // 轨迹透明度
      })
    } else {
      // 创建普通星星
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: Math.random() * 0.2 + 0.05,
        speedY: -Math.random() * 0.2 - 0.05,
        size: Math.random() * 1 + 0.6,
        color: getRandomColor(),
      })
    }
  }

  // 动画函数
  function animate() {
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制星星和流星
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i]

      // 绘制普通星星
      if (!star.trail) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()

        // 更新星星位置
        star.x += star.speedX
        star.y += star.speedY

        // 检查星星是否超出画布边界
        if (star.x > canvas.width || star.y < 0) {
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
          star.color = getRandomColor()
        }
      } else {
        // 绘制流星及其轨迹
        ctx.beginPath()
        for (let j = star.trail.length - 1; j >= 0; j--) {
          const segment = star.trail[j]
          const opacity = star.trailOpacity - (j / star.trail.length) * star.trailOpacity
          if (opacity > 0) {
            ctx.arc(segment.x, segment.y, star.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${parseInt(star.color.slice(1, 3), 16)}, ${parseInt(star.color.slice(3, 5), 16)}, ${parseInt(star.color.slice(5, 7), 16)}, ${opacity})`
            ctx.fill()
          }
        }

        // 更新流星位置，并将当前位置添加到轨迹中
        star.x += star.speedX
        star.y += star.speedY
        star.trail.push({ x: star.x, y: star.y })

        // 如果轨迹太长，则移除最旧的点
        if (star.trail.length > star.trailLength) {
          star.trail.shift()
        }

        // 检查流星是否超出画布边界，并重置
        if (star.x > canvas.width || star.y < 0) {
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
          star.trail = []
          star.trailOpacity = 1
          star.color = getRandomColor()
        }

        // 逐渐降低轨迹透明度
        star.trailOpacity -= 0.01
        if (star.trailOpacity < 0.1) {
          star.trailOpacity = 1
        }
      }
    }

    // 请求下一帧
    requestAnimationFrame(animate)
  }

  animate()

  // 调整画布大小
  window.addEventListener('resize', () => {
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
  })
})

const store = useStyleStateStore()
const isDark = ref(true)

const { ThemeStyle } = storeToRefs(store)


watch(ThemeStyle, (newValue) => {
  isDark.value = newValue === 'dark'?true:false
})

</script>

<style lang="scss" scoped>

.dark-theme {
    --primary-bg-color: #000000;
    --secondary-bg-color: #111014;
    --tertiary-bg-color: #1d1e22;
    --quaternary-bg-color:#121212;
    --primary-border-color: #373737;
    --primary-font-color: #adadad;
    --secondary-font-color: #fafafa;
    --tertiary-font-color: #b8b8b8;
    --primary-accent-color: #e9bb5f;
    --secondary-accent-color: #d5a62f;
    --primary-func-color: #2d6cf5;
    background-color: var(--secondary-bg-color);
}

.light-theme {
    --primary-bg-color: #dddddd;
    --secondary-bg-color: #f5f5f5;
    --tertiary-bg-color: #ebebeb;
    --primary-border-color: #b8b8b8;
    --primary-font-color: #4d4d4d;
    --secondary-font-color: #fafafa;
    --primary-accent-color: #2d6cf5;
    --secondary-accent-color: #2f56d5;
    background-color: var(--secondary-bg-color);
}

.home-container {
  position: relative;
  width: 100%;
  z-index: 1;

    #starfield {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    opacity: 0.4;
  }
}


</style>
