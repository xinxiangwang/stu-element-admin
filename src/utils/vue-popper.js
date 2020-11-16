import Vue from 'vue'
const PopperJS = require('./popper')
const stop = e => e.stopPropagation()

export default {
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    popperOptions: {
      type: Object,
      default() {
        return {
          gpuAcceleration: false
        }
      }
    }
  },
  data() {
    return {
      showPopper: false,
      currentPlacement: ''
    }
  },
  methods: {
    createPopper() {
      this.currentPlacement = this.currentPlacement || this.placement
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return
      }
      const options = this.popperOptions
      const popper = this.popperElm
      const reference = this.referenceElm
      if (!popper || !reference) return
      if (this.visibleArrow) this.appendArrow(popper)
    },
    updatePopper() {
      this.createPopper()
    },
    appendArrow(element) {
      let hash
      if (this.appended) return
      this.appended = true
      console.log(element)
    }
  }
}
