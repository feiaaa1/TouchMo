import { useStyleStateStore } from '@/stores/styleState'
import { delay } from './delay'
export const downloadProgress = async (progressEvent) => {
  const styleStore = useStyleStateStore()
  const currentVersion = styleStore.currentVersion // 获取当前版本号
  if (progressEvent.total > 0) {
    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    console.log('进度条' + percent + '%', progressEvent.total, progressEvent.loaded)
    styleStore.enqueueProgress(percent, currentVersion) // 传递版本号
  }
}
