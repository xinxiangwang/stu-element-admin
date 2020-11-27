import Vue from 'vue'

let hasInitZIndex = false
let zIndex

const PopupManager = {
  nextZIndex() {
    return PopupManager.zIndex++
  }
}

Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    if (!hasInitZIndex) { // 是否第一次定义zIndex
      zIndex = zIndex || (Vue.prototype.$ELEMENT || {}).zIndex || 2000
      hasInitZIndex = true
    }
    return zIndex
  },
  set(value) {
    zIndex = value
  }
})
export { PopupManager }
