<template>
  <transition name="modifyUserInfo">
    <!-- <div class="user-edit-form" v-if=""> -->
    <div class="user-edit-form" v-if="styleStore.showBoxList.isShowModifyUserInfoCard">
      <h1 style="pointer-events: none; user-select: none">修改资料</h1>
      <form @submit.prevent="handleSubmit">
        <!-- 头像上传 -->
        <div class="avatar-upload">
          <!-- 图片裁剪区域 -->
          <div v-if="isCrop" class="crop-image-container">
            <!-- <img id="image" :src="avatarUrl" alt="Image" /> -->
            <canvas ref="cropCanvas" class="cropCanvas"></canvas>
            <div
              ref="cropBox"
              class="crop-box"
              :style="{
                top: `${cropBoxTop}px`,
                left: `${cropBoxLeft}px`,
                width: `${cropBoxWidth}px`,
              }"
            >
              <div id="top-left" class="crop-handle top-left"></div>
              <div id="top-right" class="crop-handle top-right"></div>
              <div id="bottom-left" class="crop-handle bottom-left"></div>
              <div id="bottom-right" class="crop-handle bottom-right"></div>
            </div>
            <div ref="overlay" class="overlay"></div>
          </div>
          <!-- 图片上传区域 -->
          <div
            ref="avatarUploadBtns"
            @click="avatarInput.click()"
            v-if="!isCrop"
            class="avatar-upload-btns"
          >
            <span class="icon iconfont icon-imgAdd"></span>
            <input ref="avatarInput" type="file" id="avatar" @change="handleAvatarChange" />
          </div>
          <!-- 图片预览区域 -->
          <div
            style="
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div class="preview-img">
              <img v-if="avatarUrl && !isCrop" :src="avatarUrl" alt="用户头像" />
              <canvas v-show="isCrop" ref="croppedCanvas" class="croppedCanvas"></canvas>
            </div>
            <ButtonEle text="取消" @click="ResetCroppedAvatarVariables" v-if="isCrop" />
          </div>
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
          height="3.2"
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
import { nextTick, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useStyleStateStore } from '@/stores/styleState'
import ButtonEle from './ButtonEle.vue'
import { throttle } from '@/utils/throttle'
const styleStore = useStyleStateStore()
const userStore = useUserStore()
// 用户信息
const avatarFile = ref(null)
const avatarUrl = ref(null)
const name = ref('')
const sex = ref(1) // 默认为男性
const email = ref('')
const isLoading = ref(false)
watch(styleStore.showBoxList, (newVal) => {
  if (newVal.isShowModifyUserInfoCard) {
    name.value = userStore.userInfo.name
    sex.value = userStore.userInfo.sex
    email.value = userStore.userInfo.email
    avatarUrl.value = userStore.userInfo.avatar
    nextTick(() => {
      if (!isAddDragEvent.value) {
        handleDragEnter()
      }
    })
  } else {
    ResetCroppedAvatarVariables()
  }
})

//实现图片拖拽上传逻辑
const avatarUploadBtns = ref(null)
const isAddDragEvent = ref(false)
//当拖拽的东西进入拖拽框时触发
function handleDragEnter() {
  avatarUploadBtns.value.addEventListener('dragenter', (e) => {
    e.preventDefault()
  })
  //当拖拽的东西一直在拖拽框内时不断触发
  avatarUploadBtns.value.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
  //当拖拽的东西拖动到拖动框内放手时触发
  avatarUploadBtns.value.addEventListener('drop', (e) => {
    e.preventDefault()
    handleAvatarChange(e.dataTransfer.files[0])
  })
  isAddDragEvent.value = true
}

//实现图片裁剪逻辑
const croppedCanvas = ref(null) // 获取裁剪后的canvas元素
const cropCanvas = ref(null) // 获取canvas元素
const cropBox = ref(null) // 获取裁剪框元素
const overlay = ref(null) // 获取遮罩层元素
const cropBoxLeft = ref(0) // 裁剪框左边距
const cropBoxTop = ref(0) // 裁剪框上边距
const cropBoxWidth = ref(5) // 裁剪框宽度
const avatarInput = ref(null) //获取头像上传的input元素
const isCrop = ref(false) // 是否裁剪状态
let isDragging = false // 是否正在拖拽
let currentHandleId = null // 当前拖拽的裁剪框边角id
//处理File对象转换为二进制在本地进行预览
let startX, startWidth, startLeft, startTop, cropCanvasWidth, cropCanvasHeight

//处理文件上传后的逻辑
const handleAvatarChange = async (event) => {
  // 通过拖拽或点击触发onchange事件获取file对象
  const file = event.target ? event.target.files[0] : event

  if (file) {
    ResetCroppedAvatarVariables() //先重置一遍所有裁剪相关变量
    isCrop.value = true
    //2.将file对象转换成img再通过canvas在本地进行绘制
    nextTick(async () => {
      // 确保DOM元素已经渲染完成
      //将图片绘制到canvas中
      await drawImageToCanvas(file, cropCanvas.value)
      updateAvatarPreview() //更新预览和本地file对象
      updateOverlay() //更新蒙层裁剪位置
      // 3.设置裁剪框初始位置以及拖拽逻辑
      //获取所有拖动角的引用
      const cropHandles = document.querySelectorAll('.crop-handle')
      //遍历添加鼠标按下事件获取初始值
      cropHandles.forEach((handle) => {
        handle.addEventListener('mousedown', handleMouseDown)
      })
      // 修改事件监听
      document.addEventListener('mousemove', throttle(handleMouseMove, 10))
      document.addEventListener('mouseup', () => {
        isDragging = false
        currentHandleId = null
      })
    })
  }
}
// 将file对象绘制到canvas中
function drawImageToCanvas(file, canvas) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const ctx = canvas.getContext('2d')
    // 图片完成加载后进行canvas绘制
    img.onload = () => {
      // 设置 canvas 宽高比与图片一致,但最长边不超过320px
      const imgAspectRatio = img.width / img.height
      if (imgAspectRatio > 1) {
        canvas.width = 320
        canvas.height = 320 / imgAspectRatio
      } else {
        canvas.width = 320 * imgAspectRatio
        canvas.height = 320
      }
      cropCanvasWidth = canvas.width
      cropCanvasHeight = canvas.height
      // 绘制图片到 canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve()
    }
    img.onerror = (err) => {
      ElMessage.error('图片加载失败,' + err)
      reject(err)
    }
    // 将 File 对象转换为图片 URL
    img.src = URL.createObjectURL(file)
  })
}

//裁剪框移动时鼠标按下逻辑
function handleMouseDown(event) {
  isDragging = true
  currentHandleId = event.target.id
  startX = event.clientX
  startWidth = parseInt(document.defaultView.getComputedStyle(cropBox.value).width, 10)

  startLeft = parseInt(document.defaultView.getComputedStyle(cropBox.value).left, 10)
  startTop = parseInt(document.defaultView.getComputedStyle(cropBox.value).top, 10)
}

//裁剪框移动时鼠标移动逻辑
function handleMouseMove(event) {
  if (isDragging && currentHandleId) {
    const deltaX = event.clientX - startX

    let newWidth = startWidth
    let newLeft = startLeft
    let newTop = startTop

    switch (currentHandleId) {
      case 'top-left':
        newWidth = startWidth - deltaX
        newLeft = startLeft + deltaX
        newTop = startTop + deltaX
        break
      case 'top-right':
        newWidth = startWidth + deltaX
        newLeft = startLeft
        newTop = startTop - deltaX
        break
      case 'bottom-left':
        newWidth = startWidth - deltaX
        newLeft = startLeft + deltaX
        newTop = startTop
        break
      case 'bottom-right':
        newWidth = startWidth + deltaX
        newLeft = startLeft
        newTop = startTop
        break
    }
    const minSize = 5 // 最小裁剪尺寸
    const maxSize = parseInt(document.defaultView.getComputedStyle(cropCanvas.value).width, 10) // 最大裁剪尺寸

    // 在尺寸计算时
    newWidth = newWidth < minSize ? minSize : newWidth
    newWidth = newWidth > maxSize ? maxSize : newWidth
    newLeft = newLeft > 0 ? (newLeft < cropCanvasWidth - 5 ? newLeft : cropCanvasWidth - 5) : 0
    newTop = newTop > 0 ? (newTop < cropCanvasHeight - 5 ? newTop : cropCanvasHeight - 5) : 0
    // newLeft = newLeft + newWidth > cropCanvasWidth ? cropCanvasWidth - newWidth : newLeft
    // newTop = newTop + newWidth > cropCanvasHeight ? cropCanvasHeight - newWidth : newTop

    cropBoxWidth.value = newWidth
    cropBoxLeft.value = newLeft
    cropBoxTop.value = newTop
  }
  updateOverlay() //更新蒙层裁剪位置
  updateAvatarPreview() //更新预览和本地file对象
}

//重置裁剪框逻辑变量
function ResetCroppedAvatarVariables() {
  cropBoxWidth.value = 0
  cropBoxLeft.value = 0
  cropBoxTop.value = 0
  cropCanvasWidth = 0
  cropCanvasHeight = 0
  startX = 0
  startWidth = 0
  startLeft = 0
  startTop = 0
  cropCanvasWidth = 0
  cropCanvasHeight = 0
  isDragging = false
  currentHandleId = null
  avatarFile.value = null
  avatarUrl.value = null
  isCrop.value = false
}

//裁剪canvas实时预览并更新avatarFile逻辑
function updateAvatarPreview() {
  const x = cropBoxLeft.value
  const y = cropBoxTop.value
  const width = cropBoxWidth.value
  const height = cropBoxWidth.value

  croppedCanvas.value.width = 80
  croppedCanvas.value.height = 80
  const croppedCtx = croppedCanvas.value.getContext('2d')
  croppedCtx.drawImage(cropCanvas.value, x, y, width, height, 0, 0, 80, 80)
}

//更新遮罩层逻辑
function updateOverlay() {
  overlay.value.style.clipPath = `polygon(0 0,100% 0,100% 100%,0 100%,0 0,${cropBoxLeft.value}px ${cropBoxTop.value}px,${cropBoxLeft.value}px ${cropBoxTop.value + cropBoxWidth.value}px,${cropBoxLeft.value + cropBoxWidth.value}px ${cropBoxTop.value + cropBoxWidth.value}px,${cropBoxLeft.value + cropBoxWidth.value}px ${cropBoxTop.value}px,${cropBoxLeft.value}px ${cropBoxTop.value}px)`
}

// 处理表单提交
import { modifyUserInfo, upload } from '@/api/user'
import { ElMessage } from 'element-plus'
// 处理信息提交事件
const handleSubmit = async () => {
  isLoading.value = true
  // 1.若是处于裁剪状态首先将裁剪后的canvas转换为file对象，否则直接提交原来的头像
  try {
    if (isCrop.value) {
      // 等待异步的toBlob完成
      const blob = await toBlobAsync(croppedCanvas.value)
      avatarFile.value = new File([blob], 'avatar.png', { type: 'image/png' })
      // 2.处理图片上传 更新数据为后端返回的url
      //封装formData
      const formData = new FormData()
      formData.append('file', avatarFile.value)
      const uploadRes = await upload(formData)
      console.log('获取头像url结果--->', uploadRes)
      if (uploadRes.code === 200) {
        avatarUrl.value = uploadRes.data
      } else {
        ElMessage.error('上传头像获取url失败！' + uploadRes.msg)
      }
    }

    const params = {
      avatar: avatarUrl.value,
      name: name.value,
      sex: sex.value,
    }
    const res = await modifyUserInfo(params)
    console.log('修改用户信息结果-->', res)
    if (res.code === 200) {
      userStore.getUser()
      ElMessage({
        type: 'success',
        message: '修改成功！',
        plain: true,
      })
      styleStore.closeBox()
      isLoading.value = false
    } else {
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

function toBlobAsync(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Canvas toBlob failed'))
      }
    }, 'image/png')
  })
}
</script>

<style lang="scss" scoped>
.user-edit-form {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  z-index: 25;
  min-width: 30vw;
  max-width: 700px;
  padding: 2rem;
  border-radius: 10px;
  background-color: var(--tertiary-bg-color);
  color: var(--primary-font-color);

  .avatar-upload {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 1rem 0rem;
    margin-bottom: 2.5rem;

    .crop-image-container {
      position: relative;
      border: 1px solid var(--primary-border-color);
      .crop-box {
        position: absolute;
        z-index: 20;
        width: 5rem;
        aspect-ratio: 1 / 1;
        max-width: 100%;
        max-height: 100%;
        min-width: 5px;
        border: 1px solid var(--secondary-border-color);

        .crop-handle {
          position: absolute;
          width: 10px;
          aspect-ratio: 1 / 1;
          border: 1px solid var(--secondary-border-color);
          cursor: crosshair;
        }
        .top-left {
          top: 0;
          left: 0;
          transform: translate(-100%, -100%);
        }
        .top-right {
          top: 0;
          right: 0;
          transform: translate(100%, -100%);
        }
        .bottom-left {
          bottom: 0;
          left: 0;
          transform: translate(-100%, 100%);
        }
        .bottom-right {
          bottom: 0;
          right: 0;
          transform: translate(100%, 100%);
        }
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
        pointer-events: none; /* 防止蒙层拦截事件 */
      }
    }

    .avatar-upload-btns {
      cursor: pointer;
      height: 7rem;
      width: 7rem;
      border: 2px dashed var(--secondary-border-color);
      transition: all 0.3s;
      color: var(--secondary-border-color);
      text-align: center;
      line-height: 7rem;
      border-radius: 2px;
      input {
        display: none;
      }
      .icon-imgAdd {
        font-size: 2rem;
      }
      &:hover {
        border-color: var(--primary-func-color);
        color: var(--primary-func-color);
      }
    }

    .preview-img {
      height: 5rem;
      aspect-ratio: 1/1;
      border: 1px solid var(--primary-accent-color);
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 3rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
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
    }
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 1rem;
      &:hover {
        border-color: var(--primary-func-color);
      }
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
