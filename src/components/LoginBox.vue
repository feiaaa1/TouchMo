<template>
  <transition name="login">
    <div class="login-box" v-if="store.showBoxList.isShowLoginBox">
      <h1 v-if="title === 'Login'">Welcome!</h1>
      <h1 v-else>Sign up</h1>
      <form @submit.prevent="submit()" class="login-form">
        <div class="input-container">
          <span class="icon iconfont icon-username"></span>
          <input
            type="text"
            v-model="username"
            placeholder="Enter your username"
            id="username"
          />
        </div>

        <div class="input-container">
          <span class="icon iconfont icon-password"></span>
          <input
            type="password"
            v-model="password"
            placeholder="Enter your password"
            id="password"
          />
        </div>

        <p class="forgot" v-if="title === 'Login'">{{ 'Forgot password?' }}</p>
        <!-- 占位当作空格 -->
        <p v-else class="forgot"></p>
        <ButtonEle
        type="submit"
          :text="title"
          height="3.2rem"
          padding="0.7rem 2rem"
          color="var(--primary-accent-color)"
          border-radius="100rem"
          :isLoading="isLoading"
        ></ButtonEle>
      </form>
      <div class="change-container">
        <p v-if="title === 'Login'">{{ "Don't have an account?" }}</p>
        <p v-else>{{ 'Change to' }}</p>
        <p class="changeButton" @click="switchForm()">
          {{ title === 'Login' ? 'Sign up' : 'Login' }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useStyleStateStore } from '@/stores/styleState'
import { useUserStore } from '@/stores/user'
const styleStore = useStyleStateStore()
const userStore = useUserStore()
const store = useStyleStateStore()
import { ref, watch } from 'vue'
const title = ref('Login')

//更改注册、登录页面
function switchForm() {
  title.value = title.value === 'Login' ? 'Sign up' : 'Login'
  username.value = ''
  password.value = ''
}

//双向绑定用户名和密码
const username = ref('')
const password = ref('')
const isLoading = ref(false)
import { userLogin, userRegister } from '@/api/user'
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'
//表单验证逻辑
function validation() {
  const reg = /.{6,}/
  if (!reg.test(username.value)) {
    ElMessage({
      message: '用户名长度至少为6位',
      type: 'warning',
      plain: true,
    })
    return false
  }
  if (!reg.test(password.value)) {
    ElMessage({
      message: '密码长度至少为6位',
      type: 'warning',
      plain: true,

    })
    return false
  }
  return true
}



import ButtonEle from './ButtonEle.vue'
//提交登录、注册逻辑
async function submit() {
  //开启加载动画
      isLoading.value = true
  try {
    if (title.value === 'Login') {
      //表单验证
      if (!validation()) {
        return
      }
      //登录请求
      const res = await userLogin(username.value, password.value)
      console.log('Login--->', res)
      //成功状态码为200
      if (res.code === 200) {
        localStorage.setItem('token', res.data.token)
        await userStore.getUser()
        ElNotification({
          title: 'Success',
          message: '登录成功',
          type: 'success',
        })
        store.closeBox()
        //登陆成功后刷新页面 重新获取资源
        location.reload(true)
      } else {
        ElNotification({
          title: 'Error',
          message: '登录失败，' + res.msg,
          type: 'error',
        })
      }
    } else {
      if (!validation()) {
        return
      }
      const res = await userRegister(username.value, password.value)
      console.log('Register--->', res)
      if (res.code === 200) {
        switchForm()
        ElNotification({
          title: 'Success',
          message: '注册成功',
          type: 'success',
        })
      } else {
        ElNotification({
          title: 'Error',
          message: '注册失败，'+res.msg,
          type: 'error',
        })
      }
    }
  }
  //状态码不为200，网络错误, 关闭加载动画
  catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false

  }
}

//关闭逻辑 关闭后 清空输入框内容
watch(styleStore.showBoxList, (newVal) => {
  if (!newVal.isShowSearchBox) {
    username.value = ''
    password.value = ''
  }
})
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
  background: linear-gradient(to top, var(--secondary-bg-color), var(--tertiary-bg-color));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--primary-border-color);

  h1 {
    font-family: 'Chewy-Regular';
    color: var(--secondary-font-color);
  }

  .change-container {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tertiary-font-color);
    font-size: 0.8rem;
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
    gap: 0.3rem;
    align-items: center;
    .input-container {
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
        border-radius: 0.6rem;
        padding: 0.6rem 1rem;
        padding-left: 2.5rem;
        transition: all 0.3s;
        &:focus {
          border: 1px solid var(--primary-accent-color);
        }
        &::placeholder {
          font-style: italic;
          font-weight: 300;
        }
      }
    }
  }

  .forgot {
    cursor: pointer;
    margin: 0.7rem 0;
    text-decoration-line: underline;
    font-style: italic;
    color: var(--primary-accent-color);
    font-size: 0.9rem;
    &:hover {
      color: var(--secondary-accent-color);
    }
  }

}

.login-enter-active,
.login-leave-active {
  transition: all 0.5s;
}

.login-enter-from {
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
}

.login-leave-to {
  transform: translate(-50%, -50%) translateY(3rem) scale(1.2);
  opacity: 0;
}
</style>
