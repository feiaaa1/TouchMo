<template>
  <div class="push-container">
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
        <FilmList :filmList="movieList" :columns="2" />
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
import FilmList from '@/components/FilmList.vue'
import RankingBox from './SubComponents/RankingBox.vue'
import { ref } from 'vue'
import { getPushMovieList } from '@/api/movie'
const movieList = ref([])
getPushMovieList().then((data) => {
  console.log(data)
  movieList.value = data.data
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
  .header-section {
    width: 100%;
    height: 21.5rem;
    display: flex;
    gap: 1rem;

    .header-left {
      flex-shrink: 0;
      width: 53%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow: hidden;

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
      width: 75%;
      display: flex;
      flex-direction: column;
  animation: slideUp 1.1s ease;

    }

    .ranking-section {
      position: sticky;
      top: 5rem;
      width: 100%;
  animation: slideUp 1.1s ease -.1s;
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
