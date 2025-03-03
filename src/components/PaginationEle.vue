<template>
  <div v-if="totalPages > 1" class="pagination" :style="paginationStyleObj">
    <!-- 总页数 -->
    <span v-if="showTotal" class="total"> 共 {{ totalPages }} 页 </span>
    <!-- 上一页 -->
    <button
      v-if="currentPage !== 1"
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      上一页
    </button>

    <!-- 动态页码 -->
    <div class="pageListContainer">
      <button
        v-for="page in pageRange"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </button>
    </div>

    <!-- 下一页 -->
    <button
      v-if="currentPage !== totalPages"
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      下一页
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: { type: Number, default: 1 }, // 当前页码
  pageSize: { type: Number, default: 12 }, // 每页条数
  total: { type: Number, required: true }, // 数据总量
  showTotal: { type: Boolean, default: false }, // 是否显示总页数
  pagerCount: { type: Number, default: 5 }, // 分页按钮数量（动态页码范围）
  fontColor: { type: String, default: 'var(--primary-font-color)' },
  fontSize: { type: Number, default: 1 },
})

import { computed, ref } from 'vue'

// 计算总页数
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const paginationStyleObj = ref({
  color: props.fontColor,
  fontSize: props.fontSize + 'rem',
})

// 生成动态页码范围
const pageRange = computed(() => {
  const current = props.currentPage
  const count = props.pagerCount
  const range = []
  let start = Math.max(1, current - Math.floor(count / 2))
  let end = Math.min(totalPages.value, start + count - 1)

  if (end - start < count - 1) {
    start = Math.max(1, end - count + 1)
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  return range
})
const emit = defineEmits(['update:currentPage', 'update:pageSize', 'page-change'])

// 翻页操作
const handlePageChange = (page) => {
  if (page < 1 || page > totalPages.value) return
  emit('update:currentPage', page)
  emit('page-change', page)
}

// 每页条数切换
const handleSizeChange = (size) => {
  emit('update:pageSize', size)
  emit('page-change', 1) // 重置到第一页
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  padding-top: 12px;
  width: fit-content;
  button {
    border: none;
    cursor: pointer;
    background: transparent;
    font-size: 1rem;
    color: inherit;
    transition: color 0.3s;
    &:hover {
      color: var(--primary-accent-color);
    }
  }
  .active {
    color: var(--primary-accent-color);
  }
}
</style>
