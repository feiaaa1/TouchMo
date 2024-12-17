<template>
  <div class="modifyFavorite-container" v-if="styleStore.showBoxList.isShowModifyFavoritesCard">
    <div class="flur" @click="closeBox()"></div>
    <div class="modifyFavorite-Box" >
      <header>
        <h2 v-show="!isCreate" class="title">收藏至</h2>
        <p @click="isCreate = !isCreate">{{isCreate?'返回':'新建收藏夹'}}</p>
      </header>
      <main>
        <div @click="addMovie(item.id)" v-for="item in userStore.userInfo.favorites" :key="item.id" v-show="!isCreate" class="favorites-container">
          <h1>{{ item.name||'无名字' }}</h1>
          <p>{{ item.description||'无描述' }}</p>
        </div>
        <div v-show="isCreate" class="create-container">
          <label for="name">名字</label>
          <input v-model="name" id="name" type="text">
          <label for="description">描述</label>
          <input v-model="description" id="description" type="text">
          <button @click="submitCreatFavorite()">提交</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
const styleStore = useStyleStateStore()
const userStore = useUserStore()

const isCreate = ref(false)



//新建收藏夹
import { createFavorites } from '@/api/user';
const name = ref('')
const description = ref(null)
function submitCreatFavorite() {
  const params = {
    id: null,
    name: name.value,
    userId: userStore.userInfo.id,
    description: description.value
  }
  createFavorites(params).then(res => {
    console.log(res);
    userStore.getUser()
  })
}


//收藏电影进入指定收藏夹
import { addMovieToFavorites } from '@/api/user';
function addMovie(favoritesId) {
  const params = {
    filmId: styleStore.currentFilmId,
    favoritesId
  }
  addMovieToFavorites(params).then(res => {
    console.log(res);
    styleStore.closeBox()
    alert('收藏成功')
  })
}




//关闭后 1.清空电影list 2.清空输入框内容
function closeBox() {
  styleStore.closeBox()
}

</script>

<style lang="scss" scoped>
.modifyFavorite-container{
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
  .modifyFavorite-Box {
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
    display: flex;
    flex-direction: column;
    gap: 3rem;

    header {
      color: var(--primary-func-color);

       p{
        cursor: pointer;
        &:hover{
          color: var(--primary-accent-color);
        }
      }

    }

    main {
      overflow: scroll;

      &::-webkit-scrollbar{
        display: none;
      }

      .favorites-container {
        color: var(--primary-font-color);
        cursor: pointer;
        border: 1px solid var(--primary-border-color);
        padding: 1rem;
        border-radius: 0.8rem;
        margin-bottom: 1rem;

        &:hover{
          h1{
          color: var(--primary-accent-color);
        }
      }
      }

      .create-container{
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
}
</style>
