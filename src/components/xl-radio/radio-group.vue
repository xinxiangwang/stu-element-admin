<template>
  <component
    :is="_elTag"
    class="el-radio-group"
    role="radiogroup">
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: 'XlRadioGroup',
  componentName: 'XlRadioGroup',
  props: {
    value: {}
  },
  created() {
    this.$on('handleChange', value => {
      this.$emit('change', value)
    })
  },
  computed: {
    _elTag() {
      return (this.$vnode.data || {}).tag || 'div'
    }
  }
}
</script>
