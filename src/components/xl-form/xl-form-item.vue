<template>
  <div class="el-form-item">
    <labelWrap
      :is-auto-width="labelStyle && labelStyle.width === 'auto'"
      :update-all="form.labelWidth === 'auto'">
      <label class="el-form-item__label" :for="labelFor" v-if="label || $slots.label">
        <slot name="label">{{ label }}</slot>
      </label>
    </labelWrap>
  </div>
</template>
<script>
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
    }
  },
  data() {
    return {
      validateDisabled: false
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
    fieldValue() {
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
  methods: {
    validate(trigger, callback = noop) {
      this.validateDisabled = false
      const rules = this.getFilteredRule(trigger)
    },
    getRules() {
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
      console.log('123')
      this.validate('blur')
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }
      this.validate('change')
    },
    addValidateEvents() {
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
  }
}
</script>
