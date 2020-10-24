<script>
export default {
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean
  },
  inject: ['xlForm', 'xlFormItem'],
  data() {
    return {
      computedWidth: 0
    }
  },
  render() {
    const slots = this.$slots.default
    if (!slots) return null
    if (this.isAutoWidth) {
      const autoLabelWidth = this.xlForm.autoLabelWidth
      const style = {}
      console.log(autoLabelWidth)
      if (autoLabelWidth && autoLabelWidth !== 'auto') {
        const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth
        if (marginLeft) {
          style.marginLeft = marginLeft + 'px'
        }
      }
      return (<div class='el-form-item__label-wrap' style={style}>
        { slots }
      </div>)
    } else {
      return slots[0]
    }
  },
  methods: {
    getLabelWidth() {
      if (this.$el && this.$el.firstElementChild) {
        const computedWidth = window.getComputedStyle(this.$el.firstElementChild).width
        console.log(computedWidth)
        return Math.ceil(parseFloat(computedWidth))
      } else {
        return 0
      }
    },
    updateLabelWidth(action = 'update') {
      if (this.$slots.default && this.isAutoWidth && this.$el.firstElementChild) {
        if (action === 'update') {
          this.computedWidth = this.getLabelWidth()
        } else if (action === 'remove') {
          this.xlForm.deregisterLabelWidth(this.computedWidth)
        }
      }
    }
  },
  watch: {
    computedWidth(val, oldVal) {
      if (this.updateAll) {
        this.xlForm.registerLabelWidth(val, oldVal)
      }
    }
  },
  mounted() {
    this.updateLabelWidth('update')
  }
}
</script>
