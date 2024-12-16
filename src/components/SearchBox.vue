<template>
  <div class="search-container" v-if="store.showBoxList.isShowSearchBox">
    <div class="flur" @click="closeBox()"></div>
    <div class="searchBox" >
      <header>
        <p class="title">搜索</p>
        <input @change="getFilmArr()" type="text" v-model="input" />
      </header>
      <main>
        <FilmList :film-list="filmList" :columns="1" />
      </main>
    </div>
  </div>
</template>

<script setup>
import FilmList from './FilmList.vue';
import { useStyleStateStore } from '@/stores/styleState'
import { ref } from 'vue';
const store = useStyleStateStore()
function closeBox() {
  store.closeBox()
}

const input = ref('')
const filmList = ref([])
function getFilmArr() {

}


</script>

<style lang="scss" scoped>
.search-container{
  width: 100%;
  height: 100%;
  .flur{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 14;
    width: 100%;
    height: 100%;
    background-color: #0000009a;
  }
  .searchBox {
    position: absolute;
    z-index: 15;
    left: 50%;
    top: 5rem;
    transform: translateX(-50%);
    width: 30rem;
    height: 85vh;
    border-radius: 0.8rem;
    border: 1px solid var(--primary-border-color);
    background-color: var(--tertiary-bg-color);
    padding: 1rem;

    header {
      color: var(--primary-func-color);

       p{
        font-size: 1.4rem;
      }
      input {
        outline: none;
        width: 100%;
        background-color: var(--secondary-bg-color);
        border-radius: 100rem;
        border: 1px solid var(--primary-border-color);
        padding: 0.2rem 0.5rem;
        color: var(--primary-font-color);

        &:focus {
          border: 1px solid var(--primary-func-color);
        }
      }
    }
  }
}
</style>
