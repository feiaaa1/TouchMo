<template>
  <div class="pagination">
    <button @click="handlePageChange(1)" :disabled="currentPage === 1">首页</button>
    <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
    <button
      v-for="page in visiblePageNumbers"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="handlePageChange(page)"
    >
      {{ page }}
    </button>
    <button @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages">
      下一页
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalItems: { type: Number, required: true }, // 总数据条数
  itemsPerPage: { type: Number, default: 10 }, // 每页条数
  currentPage: { type: Number, default: 1 }, // 当前页码
  visiblePages: { type: Number, default: 5 }, // 显示的页码按钮数（如显示5个数字）
  showTotal: { type: Boolean, default: false }, // 是否显示总页数
})

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})
//动态生成页码范围
const visiblePageNumbers = computed(() => {
  let start = Math.max(1, props.currentPage - Math.floor(props.visiblePages / 2))
  let end = Math.min(start + props.visiblePages - 1, totalPages.value)

  // 处理边界情况
  if (end - start < props.visiblePages - 1) {
    start = Math.max(1, end - props.visiblePages + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>

<style lang="scss" scoped></style>
