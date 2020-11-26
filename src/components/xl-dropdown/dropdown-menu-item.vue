<template>
  <li
    class="el-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'el-dropdown-menu__item--divided': divided
    }"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
    @click="handleClick"
  >
    <i v-if="icon" :class="icon" />
    <slot />
  </li>
</template>
<script>
import Emitter from '../../mixins/emitter'
export default {
  name: 'XlDropdownItem',
  mixins: [Emitter],
  props: {
    command: {},
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },
  methods: {
    handleClick(e) {
      this.dispatch('XlDropdown', 'menu-item-click', [this.command, this])
    }
  }
}
</script>
