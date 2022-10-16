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
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <div v-if="showHeader" class="el-table__header-wrapper" ref="headerWrapper">
      <xl-table-header
        ref="tableHeader"
        :store="store"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }"></xl-table-header>
    </div>
  </div>
</template>
<script>
import TableLayout from 'element-ui/packages/table/src/table-layout'
import { createStore, mapStates } from './store/helper'
import { debounce } from 'throttle-debounce'
import XlTableHeader from './table-header'
let tableIdSeed = 1
export default {
  name: 'XlTable',
  components: { XlTableHeader },
  props: {
    fit: {
      type: Boolean,
      default: true
    },
    stripe: Boolean,
    border: Boolean,
    maxHeight: [String, Number],
    height: [String, Number],
    showHeader: {
      type: Boolean,
      default: true
    },
    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        }
      }
    }
  },
  created() {
    this.tableId = 'el-table_' + tableIdSeed++
    this.debouncedUpdateLayout = debounce(50, () => this.doLayout())
  },
  mounted() {
    this.store.updateColumns()
    this.doLayout()
    this.$ready = true
  },
  computed: {
    ...mapStates({
      selection: 'selection',
      columns: 'columns',
      tableData: 'data',
      fixedColumns: 'fixedColumns',
      rightFixedColumns: 'rightFixedColumns'
    }),
    shouldUpdateHeight() {
      return this.height ||
        this.maxHeight ||
        this.fixedColumns.length > 0 ||
        this.rightFixedColumns.length > 0
    },
    bodyWidth() {
      const { bodyWidth, scrollY, gutterWidth } = this.layout
      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : ''
    }
  },
  data() {
    const { hasChildren, children } = this.treeProps
    this.store = createStore(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate,
      indent: this.indent,
      lazy: this.lazy,
      lazyColumnIdentifier: hasChildren,
      childrenColumnName: children
    })
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
  },
  methods: {
    doLayout() {
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight()
      }
      this.layout.updateColumnsWidth()
    }
  }
}
</script>
<style>

</style>
