<template>
  <form
    class="el-form"
    :class="[
      labelPosition ? 'el-form--label-' + labelPosition : '',
      { 'el-form--inline': inline }
    ]">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'XlForm',
  componentName: 'XlForm',
  provide() {
    return {
      xlForm: this
    }
  },
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    inline: Boolean
  },
  data() {
    return {
      fields: [],
      potentialLabelWidthArr: [] // 存放label宽度
    }
  },
  computed: {
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length) return 0
      const max = Math.max(...this.potentialLabelWidthArr)
      return max ? `${max}px` : ''
    }
  },
  created() {
    this.$on('xl.form.addField', (field) => {
      if (field) {
        this.fields.push(field)
      }
    })

    this.$on('xl.form.removeField', (field) => {
      if (field.prop) {
        this.fileds.splice(this.fileds.indexOf(field), 1)
      }
    })
  },
  methods: {
    registerLabelWidth(val, oldVal) {
      if (val && oldVal) {
        const index = this.getLabelWidthIndex(oldVal)
        this.potentialLabelWidthArr.splice(index, 1, val)
      } else if (val) {
        this.potentialLabelWidthArr.push(val)
      }
    },
    deregisterLabelWidth(val) {
      const index = this.getLabelWidthIndex(val)
      this.potentialLabelWidthArr.splice(index, 1)
    },
    getLabelWidthIndex(width) {
      const index = this.potentialLabelWidthArr.indexOf(width)
      if (index === -1) {
        throw new Error()
      }
      return index
    }
  }
}
</script>
