import { kebabCase } from 'element-ui/src/utils/util'
export default {
  mounted() {
    if (!this.$vnode) return
    // 获取组件要迁移的props或events 如果没有 就是默认的空对象
    const { props = {}, events = {}} = this.getMigratingConfig()
    const { data, componentOptions } = this.$vnode
    // 获取子组件使用处传递的prop
    const definedProps = data.attrs || {}
    // 获取子组件使用处传递的event
    const definedEvents = componentOptions.listeners || {}
    for (let propName in definedProps) {
      propName = kebabCase(propName)
      if (props[propName]) {
        console.warn(`[Xlement Migrating][${this.$options.name}][Attribute]: ${props[propName]}`)
      }
    }
    for (let eventName in definedEvents) {
      eventName = kebabCase(eventName)
      if (events[eventName]) {
        console.warn(`[Xlement Migrating][${this.$options.name}][Event]: ${events[eventName]}`)
      }
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {},
        events: {}
      }
    }
  }
}
