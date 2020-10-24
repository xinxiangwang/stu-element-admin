<template>
  <div>
    <labelWrap :is-auto-width="true" :update-all="true">
      <label class="el-form-item__label" for="测试" v-if="label || $slots.label">
        <slot name="label">{{ label }}</slot>
      </label>
    </labelWrap>
  </div>
</template>
<script>
import labelWrap from './label-wrap'
export default {
  name: 'XlFormItem',
  components: { labelWrap },
  props: {
    label: String
  },
  provide() {
    return {
      xlFormItem: this
    }
  }
}
</script>
