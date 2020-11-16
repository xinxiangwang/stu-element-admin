<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <ul v-show="showPopper" class="el-dropdown-menu el-popper" :class="[size && `el-dropdown-menu--${size}`]">
      <slot />
    </ul>
  </transition>
</template>
<script>
import Popper from '@/utils/vue-popper'
export default {
  name: 'XlDropdownMenu',
  componentName: 'XlDropdownMenu',
  inject: ['dropdown'],
  mixins: [Popper],
  props: {
    visibleArrow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      size: this.dropdown.dropdownSize
    }
  },
  mounted() {
    this.dropdown.popperElm = this.popperElm = this.$el
    this.referenceElm = this.dropdown.$el
    this.dropdown.initDomOperation()
  },
  methods: {
    doDestroy() {
    }
  }
}
</script>
