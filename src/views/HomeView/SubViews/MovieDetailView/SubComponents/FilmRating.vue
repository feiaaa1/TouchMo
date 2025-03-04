<template>
  <div>
    <el-rate
      style="transform: scale(1.5) translateX(1.2rem)"
      :allow-half="true"
      size="large"
      v-model="rateVal"
      :colors="colors"
      @change="handleRateMovie"
      show-score
      text-color="var(--primary-accent-color)"
    />
  </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { firstRateMovie, modifyRateMovie } from '@/api/user'
const route = useRoute()
const colors = ref([
  'var(--primary-border-color)',
  'var(--primary-accent-color)',
  'var(--secondary-accent-color)',
])
const rateVal = ref(0)
const isScore = ref(false)
const filmDetail = inject('filmDetail')//接收注入前filmDetail就已经是真实数据了，因为在父组件中是当filmDetail有值的时候才进行子组件的渲染
if (filmDetail.value.userScore !== null) {
  isScore.value = true
  rateVal.value = filmDetail.value.userScore / 2
}
watch(filmDetail, (newVal) => {
  console.log(1111111)
  if (newVal.value.userScore !== null) {
    isScore.value = true
    rateVal.value = newVal.value.userScore / 2
  }
})
async function handleRateMovie() {
  const params = {
    mediaId: +route.params.id,
    score: +rateVal.value * 2,
  }
  try {
    let res
    if (!isScore.value) {
      res = await firstRateMovie(params)
    } else {
      res = await modifyRateMovie(params)
    }

    console.log('rate--->', res)
    if (res.code === 200) {
      ElMessage({
        message: '评分提交成功',
        type: 'success',
        plain: true,
      })
      isScore.value = true
    } else {
      ElMessage({
        message: '评分提交失败，' + res.msg,
        type: 'error',
        plain: true,
      })
    }
  } catch (error) {
    ElMessage({
      message: '评分提交失败，' + error,
      type: 'error',
      plain: true,
    })
  }
}
</script>

<style lang="scss" scoped></style>
