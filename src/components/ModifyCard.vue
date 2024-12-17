<template>
  <div class="modify-container" v-if="styleStore.showBoxList.isShowModifyCard">
    <div class="flur" @click="styleStore.closeBox()"></div>
    <div class="user-edit-form">
      <form @submit.prevent="handleSubmit">
        <!-- 头像上传 -->
        <div class="avatar-upload">
          <label for="avatar">头像上传</label>
          <input type="file" id="avatar" @change="handleAvatarChange" />
          <!-- <img v-if="avatarUrl" :src="avatarUrl" alt="用户头像" class="avatar-preview" /> -->
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
        <button type="submit" :disabled="isSubmitting">提交</button>
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
const name = ref('')
const sex = ref('male')
const email = ref('')
const emailError = ref('')
const isSubmitting = ref(false)

// 处理头像上传
const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  avatarFile.value = file
}
// 验证邮箱
// const validateEmail = () => {
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(email.value)) {
//     emailError.value = '请输入有效的邮箱地址';
//   } else {
//     emailError.value = '';
//   }
// };

// 处理表单提交
import { modifyUserInfo } from '@/api/user'
import { upload } from '@/api/user'
const handleSubmit = async () => {
  isSubmitting.value = true

  //处理图片上传 更新数据为返回的url
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
    // 模拟成功响应
    alert('用户信息更新成功！')
  } catch (error) {
    // 处理错误
    console.error('提交用户信息时出错：', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
.modify-container {
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
  .user-edit-form {
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

    .avatar-upload {
      // 头像上传样式
      // ...

      .avatar-preview {
        // 头像预览样式
        // ...
      }
    }

    .form-group {
      // 表单组样式
      // ...

      .error {
        // 错误消息样式
        // ...
      }
    }

    button {
      // 提交按钮样式
      // ...

      &:disabled {
        // 禁用状态样式
        // ...
      }
    }
  }
}
</style>
