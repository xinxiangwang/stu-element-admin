<template>
  <label
    class="el-radio"
    :class="[
      border && radioSize ? 'el-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-checked': model === label }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span class="el-radio__input" :class="{ 'is-disabled': isDisabled, 'is-checked': model === label }">
      <span
        class="el-radio__inner"
        :class="{ 'is-disabled': isDisabled, 'is-checked': model === label }"
      />
      <input
        ref="radio"
        v-model="model"
        class="el-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>
    <span class="el-radio__label">
      <slot />
      <template v-if="!$slots.default">
        {{ label }}
      </template>
    </span>
  </label>
</template>
<script>
import Emitter from '@/mixins/emitter'
export default {
  name: 'XlRadio',
  componentName: 'XlRadio',
  mixins: [Emitter],
  model: {
    prop: 'radioValue',
    event: 'radioValueChange'
  },
  props: {
    radioValue: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String
  },
  data() {
    return {
      focus: false
    }
  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.radioValue
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('XlRadioGroup', 'input', val)
        } else {
          this.$emit('radioValueChange', val)
        }
      }
    },
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'XlRadioGroup') {
          parent = parent.$parent
        } else {
          this.setParent(parent)
          return true
        }
      }
      return false
    },
    radioSize() {
      return this.size
    },
    isDisabled() {
      return this.isGroup ? this.disabled : this.disabled
    },
    tabIndex() {
      return 0
    }
  },
  mounted() {
    console.log(this.$vnode)
  },
  methods: {
    setParent(parent) {
      this._radioGroup = parent
    }
  }
}
</script>
