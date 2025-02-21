//同步延时器
export function delay(ms){
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
