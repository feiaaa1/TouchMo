<template>
  <div class="modify-container" v-if="styleStore.showBoxList.isShowModifyCard">
    <div class="flur" @click="styleStore.closeBox()"></div>
    <div class="user-edit-form">
      <h1>编辑用户信息</h1>
      <form @submit.prevent="handleSubmit">
        <!-- 头像上传 -->
        <div class="avatar-upload">
          <label for="avatar">头像上传</label>
          <input type="file" id="avatar" @change="handleAvatarChange" />
          <img v-if="avatarUrl" :src="avatarUrl" alt="用户头像" class="avatar-preview" />
        </div>

        <!-- 名字输入 -->
        <div class="form-group">
          <label for="name">名字</label>
          <input type="text" id="name" v-model="name" required />
        </div>

        <!-- 性别选择 -->
        <div class="form-group">
          <label for="sex">性别</label>
          <select id="sex" v-model="sex" required>
            <option :value="1">男</option>
            <option :value="0">女</option>
          </select>
        </div>

        <!-- 邮箱编写和验证 -->
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="email" @blur="validateEmail" required />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <!-- 提交按钮 -->
        <button class="submitBtn" type="submit" :disabled="isSubmitting">提交</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useStyleStateStore } from '@/stores/styleState'
const styleStore = useStyleStateStore()
const userStore = useUserStore()

// 用户信息
const avatarFile = ref(null)
const avatarUrl = ref(null) // 新增一个用于存储头像URL的ref
const name = ref('')
const sex = ref(1) // 默认为男性
const email = ref('')
const emailError = ref('')
const isSubmitting = ref(false)



name.value = userStore.userInfo.name;
sex.value = userStore.userInfo.sex;
email.value = userStore.userInfo.email;
avatarUrl.value = userStore.userInfo.avatar




// 处理头像上传
const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    avatarFile.value = file
    avatarUrl.value = URL.createObjectURL(file) // 生成文件URL用于预览
  }
}



// 验证邮箱
const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    emailError.value = '请输入有效的邮箱地址'
  } else {
    emailError.value = ''
  }
}



// 处理表单提交
import { modifyUserInfo } from '@/api/user'
import { upload } from '@/api/user'
const handleSubmit = async () => {
  isSubmitting.value = true

  // 处理图片上传 更新数据为返回的url
  const formData = new FormData()
  formData.append('file', avatarFile.value)
  const uploadRes = await upload(formData)
  console.log('uploadRes--->', uploadRes)
  avatarFile.value = uploadRes.data

  const params = {
    id: userStore.userInfo.id,
    avatar: avatarFile.value,
    name: name.value,
    sex: sex.value,
    email: email.value,
  }

  try {
    const res = await modifyUserInfo(params)
    console.log('modify res-->', res.msg)
    userStore.getUser()
  } catch (error) {
    console.error('提交用户信息时出错：', error)
  } finally {
    styleStore.closeBox()
    isSubmitting.value = false
  }
}


</script>

<style lang="scss" scoped>
.modify-container {
  width: 100%;
  height: 100%;
  color: var(--primary-font-color);

  .flur {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 14;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .user-edit-form {
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%,-50%);
    z-index: 15;
    width: 30vw;
    max-width: 500px;
    padding: 2rem;
    border-radius: 10px;
    background-color: var(--tertiary-bg-color);

    .avatar-upload {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin:1rem 0rem;

      label {
        cursor: pointer;
        padding: 0.2rem 0.5rem;
        color: var(--primary-accent-color);
        border: 2px solid var(--primary-accent-color);
        border-radius: 100rem;
        &:hover{
        color: var(--secondary-accent-color);
        border: 2px solid var(--secondary-accent-color);
        }
      }

      input[type='file'] {
        display: none;
      }

      .avatar-preview {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--primary-font-color);
      }
    }

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: inline-block;
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }

      input,
      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--primary-font-color);
        border-radius: 5px;
        font-size: 1rem;
        background-color: transparent;
        color: var(--primary-font-color);
      }

      .error {
        color: red;
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }
    }

    .submitBtn {
      width: 100%;
        appearance: none;
        background-color: transparent;
        border: 0.125em solid var(--primary-accent-color);
        border-radius: 0.9375em;
        box-sizing: border-box;
        color: var(--primary-accent-color);
        cursor: pointer;
        display: inline-block;
        font-family: Roobert, sans-serif;
        font-size: 16px;
        font-weight: 600;
        outline: none;
        padding: 1rem 2.3rem;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        will-change: transform;
        font-size: 1.2rem;

        &:hover {
          color: var(--secondary-accent-color);
        border: 0.125em solid var(--secondary-accent-color);
          background-color: var(--tertiary-bg-color);
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }
  }
}
</style>
