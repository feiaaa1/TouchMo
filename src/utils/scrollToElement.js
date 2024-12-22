export function scrollToElementCenter(elementId) {
  const element = document.getElementById(elementId)
  if (element) {
    // 获取元素的边界
    const rect = element.getBoundingClientRect()

    // 获取页面高度
    const windowHeight = window.innerHeight

    // 计算滚动位置，使得元素位于页面中间
    const scrollToPosition = element.offsetTop - (windowHeight - rect.height) / 2

    // 平滑滚动到指定位置
    window.scrollTo({
      top: scrollToPosition,
      behavior: 'smooth',
    })
  }
}
