<template>
  <transition name="login">
    <div class="login-box" v-if="store.showBoxList.isShowLoginBox">
      <h1 v-if="title === 'Login'">Welcome!</h1>
      <h1 v-else>Sign up</h1>
      <form @submit.prevent="handleLogin" class="login-form">


        <div class="input-container">
          <span class="icon iconfont icon-username"></span>
          <input type="text" v-model="username"
          placeholder="Enter your username" id="username" required />
        </div>


        <div class="input-container">
          <span class="icon iconfont icon-password"></span>
        <input type="password" v-model="password"
        placeholder="Enter your Password" id="password" required />
        </div>


                <p class="forgot" v-if="title === 'Login'">{{ "Forgot password?"}}</p>
                <!-- 占位当作空格 -->
                <p v-else class="forgot"></p>
        <button class="btn submit-btn" @click="submit()" type="submit">{{ title }}</button>
      </form>
      <div class="change-container">
        <p v-if="title === 'Login'">{{ "Don't have an account?"}}</p>
        <p v-else>{{'Change to'}}</p>
        <p class="changeButton" @click="switchForm()">{{title === 'Login'?'Sign up':'Login'}}</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const store = useStyleStateStore()
import { ref } from 'vue'
const title = ref('Login')

function switchForm() {
  title.value = title.value === 'Login' ? 'Sign up' : 'Login'
  username.value = ''
  password.value = ''
}

const username = ref('')
const password = ref('')
import { userLogin, userRegister } from '@/api/user'
import { ElNotification } from 'element-plus'
function submit() {
  if (title.value === 'Login') {
    userLogin(username.value, password.value).then(async (data) => {
      localStorage.setItem('token', data.data)
      await userStore.getUser()
      ElNotification({
        title: 'Success',
        message: '登录成功',
        type: 'success',
      })
      store.closeBox()
    })
  } else {
    userRegister(username.value, password.value).then(() => {
      ElNotification({
        title: 'Success',
        message: '注册成功',
        type: 'success',
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  position: fixed;
  z-index: 25;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.2);
  width: 20rem;
  height: fit-content;
  padding: 2rem;
  border-radius: 0.8rem;
  color: var(--secondary-font-color);
  background-color: var(--tertiary-bg-color);
  background: linear-gradient(to top,var(--secondary-bg-color),var(--tertiary-bg-color));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--primary-border-color);

  h1{
    font-family: 'Chewy-Regular';
    color: var(--secondary-font-color);
  }

  .change-container{
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tertiary-font-color);
    font-size: .8rem;
    .changeButton {
      cursor: pointer;
    text-decoration-line: underline;
    font-style: italic;
    color: var(--primary-accent-color);

    &:hover {
      color: var(--secondary-accent-color);
    }
  }
}

  .login-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .3rem;
    align-items: center;
    .input-container{
      position: relative;
      .icon {
        position: absolute;
        top: 50%;
        left: 1rem;
        transform: translateY(-40%);
        color: var(--primary-accent-color);
      }
      input {
        background: none;
        border: 1px solid var(--primary-border-color);
        outline: none;
        width: 100%;
        color: #d3d3d3;
        margin-top: 0.5rem;
        background-color: var(--secondary-bg-color);
        border-radius: .6rem;
        padding: 0.6rem 1rem;
        padding-left: 2.5rem;
        &:focus{
          border: 1px solid var(--primary-accent-color);
        }
        &::placeholder{
          font-style: italic;
          font-weight: 300;
        }
      }
    }
  }

  .forgot{
    cursor: pointer;
    margin: .7rem 0;
     text-decoration-line: underline;
    font-style: italic;
    color: var(--primary-accent-color);
  font-size: .9rem;
  &:hover{
    color: var(--secondary-accent-color);
  }
  }

  .submit-btn{
    width: 100%;
    color: var(--primary-accent-color);
    border-color: var(--primary-accent-color);
    padding: .7rem 2rem;
    border-radius: 100rem;
  }
}

.login-enter-active,
.login-leave-active {
  transition: all 0.5s;
}

.login-enter-from {
  transform: translate(-50%, -50%) scale(.9);
  opacity: 0;
}

.login-leave-to {
  transform: translate(-50%, -50%) translateY(3rem) scale(1.2);
  opacity: 0;
}
</style>
