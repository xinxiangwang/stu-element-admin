<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
<script>
import { isExternal } from '@/utils/validate'
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      return this.isExternal ? {
        href: to,
        target: '_blank',
        rel: 'noopener'
      } : {
        to
      }
    }
  }
}
</script>
<style>
</style>
