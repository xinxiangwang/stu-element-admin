<template>
  <div
    :class="[
      type === 'textarea' ? 'el-textarea' : 'el-input',
      inputSize ? 'el-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'el-input-group': $slots.prepend || $slots.append,
        'el-input-group--append': $slots.append,
        'el-input-group--append': $slots.append,
        'el-input-group--prepend': $slots.prepend,
        'el-input--prefix': $slots.prefix || prefixIcon,
        'el-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="el-input-group__prepend">
        <slot name="prepend" />
      </div>
      <input
        v-if="type !== 'textarea'"
        ref="input"
        :tabindex="tabindex"
        class="el-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="inputDisabled"
        :autocomplete="autocomplete || autoComplete"
        :readonly="readonly"
        @compositionstart="onCompositionStart"
        @compositionupdate="onCompositionUpdate"
        @compositionend="onCompositionEnd"
        @input="onInput"
        @focus="onFocus"
        @change="handleChange"
        @blur="onBlur"
      >
      <span v-if="$slots.prefix || prefixIcon" class="el-input__prefix">
        <slot name="prefix" />
        <i v-if="prefixIcon" class="el-input__icon" :class="prefixIcon" />
      </span>
      <span v-if="getSuffixVisible()" class="el-input__suffix">
        <span class="el-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix" />
            <i v-if="suffixIcon" class="el-input__icon" :class="suffixIcon" />
          </template>

          <i
            v-if="showClear"
            class="el-input__icon el-icon-circle-close el-input_clear"
            @click="clear"
          />
          <i
            v-if="showPwdVisible"
            class="el-input__icon el-icon-view el-input__clear"
            @click="handlePasswordVisible"
          />
        </span>
      </span>
      <div v-if="$slots.append" class="el-input-group__append">
        <slot name="append" />
      </div>
    </template>
  </div>
</template>
<script>
import Emitter from '@/mixins/emitter'
export default {
  name: 'XlInput',
  componentName: 'XlInput',
  mixins: [Emitter],
  props: {
    type: {
      type: String,
      defualt: 'text'
    },
    size: String,
    disabled: Boolean,
    tabindex: String,
    prefixIcon: String,
    suffixIcon: String,
    readonly: Boolean,
    autocomplete: {
      type: String,
      default: 'off'
    },
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' && console.warn('autoComplete × ==========>>>>>>> autoComplete √')
        return true
      }
    },
    showPassword: {
      type: Boolean,
      defualt: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    }
  },
  computed: {
    inputSize() {
      return this.size
    },
    inputDisabled() {
      return this.disabled
    },
    showClear() {
      return this.clearable &&
        (this.focused || this.hovering)
    },
    upperLimit() {
      return this.$attrs.maxLength
    },
    textLength() {
      return typeof this.value === 'number' ? String(this.value).length : (this.value || '').length
    },
    isWordLimitVisible() {
      return this.showWordLimit &&
        this.$attrs.maxLength &&
        (this.type === 'text' || this.type === 'textarea') &&
        !this.readonly &&
        !this.inputDisabled &&
        !this.showPassword
    },
    inputExceed() {
      return this.isWordLimitVisible && (this.textLength > this.upperLimit)
    },
    showPwdVisible() {
      return this.showPassword &&
        !this.inputDisabled &&
        !this.readonly
    }
  },
  mounted() {
    this.updateIconOffset()
  },
  methods: {
    onCompositionStart() {
      this.isComposing = true
    },
    onCompositionUpdate(event) {
      this.isComposing = true
    },
    onCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false
        this.onInput(event)
      }
    },
    onInput(event) {
      if (this.isComposing) return
      console.log(this.$attrs)
      this.$emit('input', event.target.value)
    },
    onFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    onBlur(event) {
      this.focused = false
      this.$emit('blur', event)
      console.log(this)
      if (this.validateEvent) {
        this.dispatch('XlFormItem', 'xl.form.blur', [this.value])
      }
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea
    },
    updateIconOffset() {
      this.calcIconOffset('prefix')
      this.calcIconOffset('suffix')
    },
    calcIconOffset(place) { // 找到prefix或suffix那个元素 计算位置
      const elList = Array.from(this.$el.querySelectorAll(`.el-input__${place}`))
      if (!elList.length) return
      let el = null
      elList.some(item => {
        if (item.parentNode === this.$el) {
          el = item
          return true
        }
      })
      if (!el) return
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      }
      const pendant = pendantMap[place]
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}` +
        `${this.$el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`
      }
    },
    getSuffixVisible() {
      return this.$slots.suffix || this.suffixIcon
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
      console.log()
      this.getInput().focus()
    }
  }
}
</script>
