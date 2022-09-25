import { compose, mergeOptions, parseMinWidth, parseWidth } from './utils'
import { cellForced } from './config'

let columnIdSeed = 1
export default {
  name: 'ElTableColumn',
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
      columns: [],
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
    }
  },
  created() {
    const parent = this.columnOrTableParent
    this.isSubColumn = parent !== this.owner
    this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++
    const type = this.type
    const sortable = this.sortable === '' ? true : this.sortable
    const defaults = {}
    const basicProps = ['columnKey', 'label', 'className', 'labelClassName', 'type', 'renderHeader', 'formatter', 'fixed', 'resizable']
    const sortProps = ['sortMethod', 'sortBy', 'sortOrders']
    const selectProps = ['selectable', 'reserveSelection']
    const filterProps = ['filterMethod', 'filters', 'filterMultiple', 'filterOpened', 'filteredValue', 'filterPlacement']
    let column = this.getPropsData(basicProps, sortProps, selectProps, filterProps)
    column = mergeOptions(defaults, column)
    const chains = compose(this.setColumnWidth, this.setColumnForcedProps)
  },
  methods: {
    // 当el-table-column的类型为特殊的几个类型时，有些值需要做一些强制处理
    setColumnForcedProps(column) {
      const type = column.type
      const source = cellForced[type] || {}
      Object.keys(source).forEach(prop => {
        let value = source[prop]
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
      } else {}
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
