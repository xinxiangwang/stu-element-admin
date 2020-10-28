<script>
/**
 * 组件进入时
 * 1，先通过getLabelWidth方法获取到组件的label宽度
 * 2，保存在data中的computedWidth中
 * 3，computedWidth改变，将值注册到form组件中的potentialLabelWidthArr数组中
 * 4，potentialLabelWidthArr改变， 父组件中的autoLabelWidth会随之改变 autoLabelWidth始终为potentialLabelWidthArr最大值
 * 5，组件更新时 重复上面
 * 大概说明：el-form label auto时 el-form保存所有label宽度, 计算出最大宽度 每个label-wrap中的label margin-left + label本身宽度 = 最大宽度
 */
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
      // 如果是xl-form上写了label-width="auto" 那么组件每次更新都修改xlForm中的 autoLabelWidth
      if (this.updateAll) {
        this.xlForm.registerLabelWidth(val, oldVal)
      }
    }
  },
  mounted() {
    this.updateLabelWidth('update')
  },
  updated() {
    this.updateLabelWidth('update')
  },
  beforeDestroy() {
    // this.updateLabelWidth('remove')
  }
}
</script>
