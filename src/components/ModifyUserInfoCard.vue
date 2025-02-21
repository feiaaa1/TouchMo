<template>
  <transition name="modifyUserInfo">
    <div class="user-edit-form" v-if="styleStore.showBoxList.isShowModifyUserInfoCard">
      <h1>账号资料</h1>
      <form @submit.prevent="handleSubmit">
        <!-- 头像上传 -->
        <div class="avatar-upload">
          <label for="avatar">上传图片</label>
          <input type="file" id="avatar" @change="handleAvatarChange" />
          <img v-if="avatarUrl" :src="avatarUrl" alt="用户头像" class="avatar-preview" />
        </div>

        <!-- 名字输入 -->
        <div class="form-group">
          <label for="name">名字</label>
          <input type="text" id="name" v-model="name" />
        </div>

        <!-- 性别选择 -->
        <div class="form-group">
          <label for="sex">性别</label>
          <el-select v-model="sex" placeholder="Select" size="large" style="width: 240px">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="0" />
          </el-select>
        </div>

        <!-- 邮箱编写和验证
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="email" @blur="validateEmail" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div> -->

        <!-- 提交按钮 -->
        <ButtonEle
         type="submit"
          text="保存"
          height="3.2rem"
          padding="0.7rem 2rem"
          color="var(--primary-accent-color)"
          border-radius="100rem"
          :isLoading="isLoading"
        ></ButtonEle>
      </form>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useStyleStateStore } from '@/stores/styleState'
import ButtonEle from './ButtonEle.vue'
const styleStore = useStyleStateStore()
const userStore = useUserStore()

// 用户信息
const avatarFile = ref(null)
const avatarUrl = ref(null) // 新增一个用于存储头像URL的ref
const name = ref('')
const sex = ref(1) // 默认为男性
const email = ref('')
const emailError = ref('')
const isLoading = ref(false)

watch(styleStore.showBoxList, (newVal) => {
  if (newVal.isShowModifyUserInfoCard) {
    name.value = userStore.userInfo.name
    sex.value = userStore.userInfo.sex
    email.value = userStore.userInfo.email
    avatarUrl.value = userStore.userInfo.avatar
  }
})

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
import { ElMessage, ElNotification } from 'element-plus'
const handleSubmit = async () => {
  try {
    isLoading.value = true
    // 处理图片上传 更新数据为返回的url
    const formData = new FormData()
    formData.append('file', avatarFile.value)
    const uploadRes = await upload(formData)
    console.log('uploadRes--->', uploadRes)
    avatarFile.value = uploadRes.data

    const params = {
      avatar: avatarFile.value,
      name: name.value,
      sex: sex.value,
    }
    const res = await modifyUserInfo(params)
    console.log('modifyRes-->', res)
    if (res.code === 200) {
      userStore.getUser()
      ElMessage({
        type: 'success',
        message: '修改成功！',
      plain: true,

      })
    styleStore.closeBox()
    isLoading.value = false
    }
    else {
      ElMessage({
        type: 'error',
        message: `修改失败${res.msg}`,
      plain: true,

      })
      isLoading.value = false
    }
  } catch (error) {
    {
      ElMessage({
        type: 'error',
        message: `修改失败${error}`,
      plain: true,

      })
      isLoading.value = false
    }
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.user-edit-form {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  z-index: 25;
  width: 30vw;
  max-width: 500px;
  padding: 2rem;
  border-radius: 10px;
  background-color: var(--tertiary-bg-color);
  color: var(--primary-font-color);

  .avatar-upload {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 1rem 0rem;

    label {
      cursor: pointer;
      padding: 0.2rem 0.5rem;
      color: var(--primary-font-color);
      border: 1.5px solid var(--primary-font-color);
      border-radius: 100rem;
      transition: all 0.3s;
      &:hover {
        color: var(--tertiary-font-color);
        border: 1.5px solid var(--tertiary-font-color);
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
      display: block;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--primary-border-color);
      border-radius: 0.4rem;
      font-size: 1rem;
      background-color: transparent;
      color: var(--primary-font-color);
      outline: none;
      transition: all 0.3s;
      cursor: text;

      &:hover {
        border-color: var(--primary-font-color);
      }

      &:focus {
        border-color: var(--primary-accent-color);
      }
    }

    .el-select {
      width: 100% !important;
      :deep(.el-select__wrapper) {
        font-size: 1rem;
        padding: 0.5rem;
        background-color: transparent;
        border-radius: 0.4rem;
        box-shadow: 0 0 0 1px var(--primary-border-color) inset;
        transition: all 0.3s;

        &:hover {
          box-shadow: 0 0 0 1px var(--primary-font-color) inset;
        }
      }

      :deep(.is-focused) {
        box-shadow: 0 0 0 1px var(--primary-accent-color) inset !important;
      }

      :deep(.el-select__placeholder) {
        color: var(--primary-font-color);
      }
    }

    .error {
      color: red;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
  }
}

.modifyUserInfo-enter-active,
.modifyUserInfo-leave-active {
  transition: all 0.5s;
}

.modifyUserInfo-enter-from {
  transform: translate(-50%, -50%) scale(0.7);
  opacity: 0;
}

.modifyUserInfo-leave-to {
  transform: translate(-50%, -50%) translateY(3rem);
  opacity: 0;
}
</style>
