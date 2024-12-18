<template>
  <div class="tags-container">
    <div class="left-container">
      <h1>标签</h1>
      <div class="tags-list-container">
        <tag-component
          :font-size="2"
          v-for="item in tagsList"
          :key="item.id"
          :name="item.name"
          :id="item.id"
          :isborder="true"
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

const tagsList = ref([])
getAllTagsList().then((res) => {
  console.log('getTagsList----->', res)
  tagsList.value = res.data
})
</script>

<style lang="scss" scoped>
.tags-container {
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  gap: 1rem;
  color: var(--secondary-font-color);
  .left-container {
    width: 75%;
    padding: 2rem;
    flex-shrink: 0;
    min-height: 20rem;
    border-radius: 0.8rem;
    background-color: var(--tertiary-bg-color);
    border: 1px solid var(--primary-border-color);

    .tags-list-container {
      margin-top: 2rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 1rem;
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
