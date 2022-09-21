<template>
  <div
    class="el-table"
    :class="[
      {
        'el-table--fit': fit,
        'el-table--striped': stripe,
        'el-table--border': border || isGroup,
        'el-table--group': isGroup,
        'el-table--fluid-height': maxHeight,
        'el-table--scrollable-x': layout.scrollX,
        'el-table--scrollable-y': layout.scrollY,
        'el-table--enable-row-hover': !store.states.isComplex,
        'el-table--enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
      }
    ]"
  >

  </div>
</template>
<script>
import TableLayout from 'element-ui/packages/table/src/table-layout'

export default {
  name: 'XLTable',
  props: {
    fit: {
      type: Boolean,
      default: true
    },
    stripe: Boolean,
    border: Boolean,
    maxHeight: [String, Number],
  },
  data() {
    const layout = new TableLayout({
      store: this.store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    })
    return {
      layout,
      isGroup: false
    }
  }
}
</script>
<style>

</style>
