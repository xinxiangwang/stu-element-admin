import { on } from './dom'

const nodeList = []
const ctx = '@@clickoutsideContext'

let startClick
let seed = 0

on(document, 'mousedown', e => (startClick = e)) // 记录鼠标按下时的元素
on(document, 'mouseup', e => {
  // 鼠标抬起时 调用函数传递 抬起时所在的元素 e，以及抬起之前按下鼠标所在的那个元素 startClick
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick))
})

function createDocumentHandler(el, binding, vnode) {
  return function(mouseup = {}, mousedown = {}) { // 参数鼠标抬起以及鼠标按下时所在元素
    if (!vnode ||
        !vnode.context ||
        !mouseup.target ||
        !mousedown.target ||
        // 按下时所在元素包含在指令绑定元素内
        el.contains(mousedown.target) ||
        // 抬起时所在元素包含在指令绑定元素内
        el.contains(mouseup.target) ||
        // 抬起时所在元素正好是指令绑定元素
        el === mouseup.target ||
        // 抬起时或按下时所在元素正好在dropdown menu中
        (vnode.context.popperElm &&
          (
            vnode.context.popperElm.contains(mouseup.target) ||
            vnode.context.popperElm.contains(mousedown.target)
          )
        )
    ) return
    el[ctx].bindingFn && el[ctx].bindingFn()
  }
}

export default {
  bind(el, binding, vnode) {
    nodeList.push(el)
    const id = seed++
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    }
  },
  update(el, binding, vnode) {
    el[ctx] = {
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    }
  },
  unbind(el) { // 解绑时 从nodeList中删除对应dom，并且删除dom对象中的ctx属性
    const len = nodeList.length
    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1)
        break
      }
    }
    delete el[ctx]
  }
}
