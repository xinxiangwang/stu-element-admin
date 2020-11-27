import Vue from 'vue'
import Main from './index.vue'
import { isVNode } from '../../utils/vdom'
import { PopupManager } from '../../utils/popup'

const MessageConstructor = Vue.extend(Main)
let seed = 1
let instance
const instances = []

const Message = function(options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  const userOnClose = options.onClose // 用户定义的onClose保存起来
  const id = 'message_' + seed++

  options.onClose = function() { // 重新定义options里面的 onClose
    Message.close(id, userOnClose)
  }
  instance = new MessageConstructor({
    data: options
  })
  instance.id = id
  if (isVNode(instance.message)) { // 如果传的是个vnode 直接放入插槽
    instance.$slots.default = [instance.message]
    instance.message = null
  }
  instance.$mount() // 主动让组件mount
  document.body.appendChild(instance.$el)
  let verticalOffset = options.offset || 20
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  instance.verticalOffset = verticalOffset
  instance.visible = true
  instance.$el.style.zIndex = PopupManager.nextZIndex()
  instances.push(instance)

  return instance
}

void ['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

Message.close = function(id, userOnClose) {
  const len = instances.length
  let index = -1
  let removeHeight
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removeHeight = instances[i].$el.offsetHeight
      index = i
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }

  if (len <= 1 || index === -1 || index > instances.length - 1) return
  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].$el
    dom.style['top'] = parseInt(dom.style['top'], 10) - removeHeight - 16 + 'px'
  }
}

Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default Message
