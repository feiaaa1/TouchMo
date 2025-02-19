<template>
  <div v-if="isLoadComplete" class="correlate-container">
    <h1>{{ total }}个结果</h1>
    <FilmList :film-list="filmList" :is-show-duration="true" :columns="3" :isShowRate="true" />
  </div>
</template>

<script setup>
import FilmList from '@/components/FilmList.vue'
import { ref,watch } from 'vue'
import { getTagMediaList } from '@/api/movie'
import { useRoute } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'

const isLoadComplete = ref(false)
const route = useRoute()
const filmList = ref([])
const total = ref(0)


watch(() => route.params.tagId, async (newVal) => {
    isLoadComplete.value = false
    const res = await getTagMediaList({
      labelId: newVal,
      page: 1,
    })
    if(res.code === 200) {
      filmList.value = res.data.records
      total.value = res.data.total
      isLoadComplete.value = true
    } else {
      ElMessage({
        message: res.msg,
        type: 'error',
      })
    }

  },
  {
    immediate: true,
  }
)


</script>

<style lang="scss" scoped>
.correlate-container {
  padding: 2rem;
  animation: slideUp 0.5s ease;
  h1 {
    color: var(--primary-font-color);
    margin-bottom: 2rem;
  }
}
</style>
