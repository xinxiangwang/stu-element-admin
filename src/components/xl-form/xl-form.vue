<template>
  <form
    class="el-form"
    :class="[
      labelPosition ? 'el-form--label-' + labelPosition : '',
      { 'el-form--inline': inline }
    ]"
  >
    <slot />
  </form>
</template>
<script>
import objectAssign from '@/utils/merge'
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
    inline: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    validateOnRuleChange: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fields: [], // 存放el-form-item
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
  watch: {
    rules() {
      this.fields.forEach(field => { // 请除子组件注册的事件，重新注册
        field.removeValidateEvents()
        field.addValidateEvents()
      })
      if (this.validateOnRuleChange) {
        this.validate(() => {})
      }
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
    resetFields() {
      if (!this.model) {
        return
      }
      this.fields.forEach(field => {
        field.resetField()
      })
    },
    clearValidate(props = []) {
      const fields = props.length ? 
    },
    validate(callback) {
      if (!this.model) {
        return
      }
      let promise
      if ((typeof callback !== 'function') && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function(valid) {
            valid ? resolve(valid) : reject(valid)
          }
        })
      }
      let valid = true
      let count = 0
      if (this.fields.length === 0 && callback) {
        callback(true)
      }
      let invalidFields = {}
      this.fields.forEach(field => {
        field.validate('', (message, field) => {
          if (message) {
            valid = false
          }
          invalidFields = objectAssign({}, invalidFields, field)
          if (typeof callback === 'function' && ++count === this.fields.length) { // 循环到最后一次
            // 如果有一个验证错误 valid就为false， invalidFields为验证没有通过的项
            callback(valid, invalidFields)
          }
        })
      })
      if (promise) return promise
    },
    clearValidate(props = []) {
      const fields = props.length
        ? this.fields.filter(field => {
          return typeof props === 'string'
            ? props === field.prop
            : props.indexOf(field.prop) > -1
        }) : this.fields
    },
    validateField(props, cb) {
      props = [].concat(props)
      const fields = this.fields.filter(field => props.indexOf(field.prop) !== -1)
      if (!fields.length) {
        return
      }
      fields.forEach(field => {
        field.validate('', cb)
      })
    },
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
