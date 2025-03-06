// 新增节流函数
export function throttle(fn, delay = 100) {
  let lastCall = 0
  return function (...args) {
    const now = new Date().getTime()
    if (now - lastCall < delay) return
    lastCall = now
    return fn.apply(this, args)
  }
}
