<template>
  <div
    class="el-form-item"
    :class="[{
      'is-error': validateState === 'error',
      'is-validateing': validateState === 'validateing',
      'is-success': validateState === 'success'
    }]"
  >
    <labelWrap
      :is-auto-width="labelStyle && labelStyle.width === 'auto'"
      :update-all="form.labelWidth === 'auto'"
    >
      <label v-if="label || $slots.label" class="el-form-item__label" :for="labelFor">
        <slot name="label">{{ label }}</slot>
      </label>
    </labelWrap>
    <div class="el-form-item__content">
      <slot />
      <transition name="el-zoom-in-top">
        <slot
          v-if="validateState === 'error' && showMessage && form.showMessage"
          name="error"
          :error="validateMessage"
        >
          <div
            class="el-form-item__error"
            :class="{}"
          >
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import labelWrap from './label-wrap'
import Emitter from '@/mixins/emitter'
import { noop, getPropByPath } from '@/utils/util'
import objectAssign from '@/utils/merge'
export default {
  name: 'XlFormItem',
  componentName: 'XlFormItem',
  components: { labelWrap },
  mixins: [Emitter],
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    for: String,
    rules: [Array, Object],
    required: {
      type: Boolean,
      defualt: undefined
    },
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      validateDisabled: false,
      validateState: '',
      validateMessage: ''
    }
  },
  computed: {
    labelFor() {
      return this.for || this.prop
    },
    labelStyle() {
      const ret = {}
      if (this.form.labelPosition === 'top') return ret
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        ret.width = labelWidth
      }
      return ret
    },
    fieldValue() { // el-form-item上prop对应el-form的model 的 初始值
      const model = this.form.model
      if (!model || !this.prop) return
      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }
      return getPropByPath(model, path, true).v
    },
    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'XlForm') {
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('XlForm', 'xl.form.addField', [this])
      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })
      this.addValidateEvents()
    }
  },
  methods: {
    clearValidate() {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = false
    },
    validate(trigger, callback = noop) { // 用async-validate插件验证， 验证后通知el-form
      this.validateDisabled = false
      const rules = this.getFilteredRule(trigger)
      console.log(rules)
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback()
        return true
      }
      this.validateState = 'validating'
      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = {}
      model[this.prop] = this.fieldValue
      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage, invalidFields)
        this.elForm && this.elForm.$emit('validate')
      })
    },
    getRules() { // 获取到父组件el-form的rule和自己的
      let formRules = this.form.rules // Object
      const selfRules = this.rules // Object or Array
      const requiredRule = this.required !== undefined ? { required: !!this.required } : []
      const prop = getPropByPath(formRules, this.prop || '')
      formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : []
      return [].concat(selfRules || formRules || []).concat(requiredRule)
    },
    getFilteredRule(trigger) {
      const rules = this.getRules()
      return rules.filter(rule => { // 筛选出没有trigger或trigger等于rule.trigger的
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1 // 如果传入的是数组，判断数组内是否存在当前trigger
        } else {
          return rule.trigger === trigger
        }
      }).map(rule => objectAssign({}, rule))
    },
    onFieldBlur() {
      this.validate('blur')
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }
      this.validate('change')
    },
    addValidateEvents() { // 发布blur change 事件， 给input等组件触发
      const rules = this.getRules()
      if (rules.length || this.required !== undefined) {
        this.$on('xl.form.blur', this.onFieldBlur)
        this.$on('xl.form.change', this.onFieldChange)
      }
    }
  },
  inject: ['xlForm'],
  provide() {
    return {
      xlFormItem: this
    }
  }
}
</script>
