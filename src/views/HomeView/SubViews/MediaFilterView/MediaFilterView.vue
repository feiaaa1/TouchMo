<template>
  <div v-if="isLoadComplete" class="mediaFilterView-container">
    <div class="filter-container">
      <div class="filter-bar">
        <SelectEle
          :is-required="true"
          v-model:optionId="currentCategoryId"
          filter-type="分类筛选"
          :options="allCategories"
          @change-option="getFilmList()"
        />
        <SelectEle
          v-model:optionId="currentLabelId"
          filter-type="标签筛选"
          :options="otherFilterOptions.labels"
          @change-option="getFilmList()"
        />
        <SelectEle
          @change-option="getFilmList()"
          v-model:optionId="currentAreaId"
          filter-type="地区筛选"
          :options="otherFilterOptions.areas"
        />
        <SelectEle
          @change-option="getFilmList()"
          v-model:optionId="currentLanguageId"
          filter-type="语言筛选"
          :options="otherFilterOptions.languages"
        />
      </div>
      <div class="filter-bar">
        <SelectEle
          @change-option="getFilmList()"
          v-model:optionId="currentYearId"
          filter-type="年份筛选"
          :options="otherFilterOptions.releaseYears"
        />
        <SelectEle
          :is-required="true"
          @change-option="getFilmList()"
          v-model:optionId="currentSortId"
          filter-type="排序方式"
          :options="sortTypeList"
        />
        <SelectEle
          :is-required="true"
          @change-option="getFilmList()"
          v-model:optionId="currentOrder"
          filter-type="排序顺序"
          :options="[
            { id: 0, name: '升序', _label: '升序' },
            { id: 1, name: '降序', _label: '降序' },
          ]"
        />
      </div>
    </div>
    <div class="MediaList-container">
      <FilmList :columns="3" :film-list="filmList" :is-show-release-time="true" />
    </div>
    <div class="pagination-container">
      <PaginationEle
        v-model:currentPage="currentPage"
        :total="totalPage"
        :show-total="true"
        :pager-count="15"
        @page-change="getFilmList()"
      />
    </div>
  </div>
</template>

<script setup>
import PaginationEle from '@/components/PaginationEle.vue'
import SelectEle from '@/components/SelectEle.vue'
import FilmList from '@/components/FilmList.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import { getFilterMediaList } from '@/api/movie'

const isLoadComplete = ref(true)
const route = useRoute()
const filmList = ref([])
const allCategories = ref([]) //总分类
const otherFilterOptions = ref({}) //当前分类的标签、地区、年份、语言、等列表
const sortTypeList = ref([
  { id: 0, name: '热度', _label: '热度' },
  { id: 1, name: '评分', _label: '评分' },
  { id: 2, name: '更新时间', _label: '更新时间' },
])
const currentCategoryId = ref(null) //当前分类id
const currentLabelId = ref(null) //当前标签id
const currentAreaId = ref(null) //当前地区id
const currentYearId = ref(null) //当前年份id
const currentLanguageId = ref(null) //当前语言id
const currentSortId = ref(0) //当前排序id 0热度 1评分 2更新时间
const currentOrder = ref(1) //当前排序顺序 0升序 1降序
const currentPage = ref(1) //当前页数
const totalPage = ref(0) //总页数

//获取所有分类标签
import { getAllCategoryList } from '@/api/movie'
async function handleGetAllCategoryList() {
  try {
    const res = await getAllCategoryList()
    console.log('获取所有分类标签', res)
    if (res.code === 200) {
      allCategories.value = res.data.map((item) => {
        item._label = item.name
        return item
      })
      // 默认选择第一项分类标签
      currentCategoryId.value = allCategories.value[0].id
      //初始化获取电影列表
      await getFilmList()
      isLoadComplete.value = true
    } else {
      ElMessage.error('获取所有分类标签失败，' + res.msg)
    }
  } catch (error) {
    ElMessage.error('获取所有分类标签失败，' + error)
  }
}
//初始化获取所有分类标签
handleGetAllCategoryList()

//根据当前参数获取电影列表
async function getFilmList() {
  try {
    const params = {
      categoryId: currentCategoryId.value,
      labelId: currentLabelId.value,
      areaId: currentAreaId.value,
      releaseYear: currentYearId.value,
      languageId: currentLanguageId.value,
      sortType: currentSortId.value,
      sortOrder: currentOrder.value,
      page: currentPage.value,
    }
    const res = await getFilterMediaList(params)
    console.log('获取筛选电影列表--->', res)
    if (res.code === 200) {
      totalPage.value = res.data.total
      filmList.value = res.data.records
    } else {
      ElMessage.error('获取电影列表失败，' + res.msg)
    }
  } catch (error) {
    ElMessage.error('获取电影列表失败，' + error)
  }
}

//根据当前分类标签获取其他筛选条件列表
import { getOtherFilterList } from '@/api/movie'
async function handleGetOtherFilterList(categoryId) {
  try {
    const res = await getOtherFilterList(categoryId)
    console.log('获取所有其他筛选列表--->', res)
    if (res.code === 200) {
      const copyResData = JSON.parse(JSON.stringify(res.data))
      // 为每个列表增加_label属性用于在下拉框中展示
      copyResData.labels.forEach((item) => {
        item._label = item.name
      })
      copyResData.areas.forEach((item) => {
        item._label = item.name
      })
      copyResData.languages.forEach((item) => {
        item._label = item.name
      })
      copyResData.releaseYears = copyResData.releaseYears.map((item) => {
        return {
          _label: item,
          id: item,
        }
      })
      otherFilterOptions.value = copyResData
    } else {
      ElMessage.error('获取所有其他筛选列表失败，' + res.msg)
    }
  } catch (error) {
    ElMessage.error('获取所有其他筛选列表失败，' + error)
  }
}
watch(currentCategoryId, async (newVal) => {
  handleGetOtherFilterList(newVal)
})
</script>

<style lang="scss" scoped>
.mediaFilterView-container {
  padding: 2rem 4rem;
  animation: slideUp 0.5s ease;
  color: var(--primary-font-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  .filter-container {
    width: 100%;
    border: 1px solid var(--primary-border-color);
    border-radius: 1rem;
    padding: 1rem;
    transition: border 0.2s;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 1rem;
    &:hover {
      border: 1px solid var(--secondary-border-color);
    }
    .filter-bar {
      width: 100%;
      display: flex;
      gap: 1.2rem;
    }
  }
  .MediaList-container {
    width: 100%;
  }
}
</style>
