export default {
  methods: {
    dispatch(componentName, eventName, params) {
      console.log(this)
      let parent = this.$parent || this.$root
      let name = parent.$options.componentName
      console.log(this.parent)
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit(eventName, params)
      }
    }
  }
}
