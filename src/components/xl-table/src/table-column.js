import { compose, mergeOptions, parseMinWidth, parseWidth } from './utils'
import { cellForced, cellStarts, defaultRenderCell, treeCellPrefix } from './config'

let columnIdSeed = 1
export default {
  name: 'XlTableColumn',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    label: String,
    prop: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    sortable: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      isSubColumn: false
    }
  },
  computed: {
    owner() {
      let parent = this.$parent
      while (parent && !parent.tableId) {
        parent = parent.$parent
      }
      return parent
    },
    columnOrTableParent() {
      let parent = this.$parent
      while (parent && !parent.tableId && !parent.columnId) {
        parent = parent.$parent
      }
      return parent
    },
    realWidth() {
      return parseWidth((this.width))
    },
    realMinWidth() {
      return parseMinWidth(this.minWidth)
    },
    realAlign() {
      return this.align ? 'is-' + this.align : null
    },
    realHeaderAlign() {
      return this.headerAlign ? 'is-' + this.headerAlign : this.realAlign
    }
  },
  created() {
    const parent = this.columnOrTableParent
    this.isSubColumn = parent !== this.owner
    this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++
    const type = this.type
    const sortable = this.sortable === '' ? true : this.sortable
    const defaults = {
      ...cellStarts[type],
      id: this.columnId,
      type: type,
      property: this.prop || this.property,
      align: this.realAlign,
      headerAlign: this.realHeaderAlign,
      // showOverflowTooltip: this.showOverflowTooltip || this.showTooltipWhenOverflow,
      // filterable: this.filter,
      index: this.index
    }
    const basicProps = ['columnKey', 'label', 'className', 'labelClassName', 'type', 'renderHeader', 'formatter', 'fixed', 'resizable']
    const sortProps = ['sortMethod', 'sortBy', 'sortOrders']
    const selectProps = ['selectable', 'reserveSelection']
    const filterProps = ['filterMethod', 'filters', 'filterMultiple', 'filterOpened', 'filteredValue', 'filterPlacement']
    let column = this.getPropsData(basicProps, sortProps, selectProps, filterProps)
    column = mergeOptions(defaults, column)
    const chains = compose(this.setColumnRenders, this.setColumnWidth, this.setColumnForcedProps)
    column = chains(column)
    this.columnConfig = column
  },
  mounted() {
    const owner = this.owner
    const parent = this.columnOrTableParent
    const children = this.isSubColumn ? parent.$el.children : parent.$refs.hiddenColumns.children
    const columnIndex = this.getColumnElIndex(children, this.$el)
    console.log(this.columnConfig)
    owner.store.commit('insertColumn', this.columnConfig, columnIndex, this.isSubColumn ? parent.columnConfig : null)
  },
  render(h) {
    console.log('zxczxc')
    return h('div', this.$slots.default)
  },
  methods: {
    // 当el-table-column的类型为特殊的几个类型时，有些值需要做一些强制处理
    setColumnForcedProps(column) {
      const type = column.type
      const source = cellForced[type] || {}
      Object.keys(source).forEach(prop => {
        const value = source[prop]
        if (value !== undefined) {
          // 此处是将cellForced 与 props中传的className合并，
          column[prop] = prop === 'className' ? `${column[prop]} ${value}` : value
        }
      })
      return column
    },
    setColumnWidth(column) {
      if (this.realWidth) {
        column.width = this.realWidth
      }
      if (this.realMinWidth) {
        column.minWidth = this.realMinWidth
      }
      if (!column.minWidth) {
        column.minWidth = 80
      }
      column.realWidth = column.width === undefined ? column.minWidth : column.width
      return column
    },
    setColumnRenders(column) {
      if (this.renderHeader) {
        console.warn('用slot，别用这个了')
      } else if (column.type !== 'selection') {
        column.renderHeader = (h, scope) => {
          const renderHeader = this.$scopedSlots.header
          return renderHeader ? renderHeader(scope) : column.label
        }
      }
      let originRenderCell = column.renderCell
      if (column.type === 'expand') {
        // 待实现
      } else {
        originRenderCell = originRenderCell || defaultRenderCell
        column.renderCell = (h, data) => {
          let children = null
          if (this.$scopedSlots.default) {
            children = this.$scopedSlots.default(data)
          } else {
            children = originRenderCell(h, data)
          }
          const prefix = treeCellPrefix(h, data)
          const props = {
            class: 'cell',
            style: {}
          }
          if (column.showOverflowTooltip) {
            props.class += ' el-tooltip'
            props.style = { width: (data.column.realWidth || data.column.width) - 1 + 'px' }
          }
          return (<div>
            { prefix }
            { children }
          </div>)
        }
      }
      return column
    },
    getColumnElIndex(children, child) {
      return [].indexOf.call(children, child)
    },
    getPropsData(...props) {
      return props.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
          cur.forEach((key) => {
            prev[key] = this[key]
          })
        }
        return prev
      }, {})
    }
  }
}
