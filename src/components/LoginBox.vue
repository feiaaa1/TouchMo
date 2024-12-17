<template>
  <div class="login-container" v-if="store.showBoxList.isShowLoginBox">
    <div class="flur" @click="store.closeBox()"></div>
    <div class="login-box">
      <h2>{{ title }}</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button @click="submit()" type="submit">{{ title }}</button>
      </form>
      <p @click="switchForm()">{{ '切换到' + title }}</p>
    </div>
  </div>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const store = useStyleStateStore()
import { ref } from 'vue'
const title = ref('登录')

function switchForm() {
  title.value = title.value === '登录' ? '注册' : '登录'
}

const username = ref('')
const password = ref('')
import { userLogin, userRegister } from '@/api/user'
function submit() {
  if (title.value === '登录') {
    userLogin(username.value, password.value).then(async (data) => {
      localStorage.setItem('token', data.data)
      await userStore.getUser()
      alert('登录成功!')
      store.closeBox()
    })
  } else {
    userRegister(username.value, password.value).then(() => {
      alert('注册成功!')
    })
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  .flur {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 14;
    width: 100%;
    height: 100%;
    background-color: #0000009a;
  }
  .login-box {
    position: absolute;
    z-index: 15;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30vw;
    height: 50vh;
    padding: 2rem;
    border: 1px solid var(--primary-border-color);
    border-radius: 0.8rem;
    color: var(--secondary-font-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: var(--tertiary-bg-color);

    p {
      cursor: pointer;
      &:hover {
        color: var(--primary-func-color);
      }
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 2rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #218838;
    }
  }
}
</style>
