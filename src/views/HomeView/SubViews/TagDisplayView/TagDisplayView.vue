<template>
  <div v-if="isLoadComplete" class="tags-container">
    <div class="left-container">
      <h1>标签</h1>
      <div class="tags-list-container">
        <tag-component
        :font-size="1.5"
        v-for="(item, index) in tagsList"
        :key="item.id"
        :name="item.name"
        :id="item.id"
        :filmNum="item.total"
        :is-show-film-num="true"
        :isborder="true"
        :class="[`delay-${index}`]"
        />
      </div>
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAllTagsList } from '@/api/movie'
import TagComponent from '@/components/TagComponent.vue'
const isLoadComplete = ref(false)

const tagsList = ref([])
getAllTagsList().then((res) => {
  console.log('getTagsList----->', res)
  tagsList.value = res.data
  isLoadComplete.value = true
})
</script>

<style lang="scss" scoped>
.tags-container {
  width: 100%;
  min-height: 100vh;
  padding: 3rem;
  display: flex;
  gap: 1rem;
  color: var(--secondary-font-color);
  animation: slideUp 1.2s ease;
  .left-container {
    width: 75%;
    height: fit-content;
    padding: 2rem;
    flex-shrink: 0;
    min-height: 20rem;
    border-radius: 0.8rem;
    background-color: var(--tertiary-bg-color);
    border: 1px solid var(--primary-border-color);
    animation: slideUp 1.1s ease;
    .tags-list-container {
      margin-top: 2rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      @for $i from 0 through 500 {
  .delay-#{$i} {
    animation:slideUp #{$i * 0.08s} ease; // 每个div延迟增加0.05s
  }
}
    }
  }

  .right-container {
    width: 100%;
    height: 20rem;
    position: sticky;
    top: 5rem;
    border-radius: 0.8rem;
    background-color: var(--tertiary-bg-color);
    border: 1px solid var(--primary-border-color);
  }
}
</style>
