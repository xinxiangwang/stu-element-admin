import { mapStates } from './store/helper'

const convertToRows = (originColumns) => {
  let maxLevel = 1
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1
      if (maxLevel < column.level) {
        maxLevel = column.level
      }
    }
    if (column.children) {
      let colSpan = 0
      column.children.forEach(subColumn => {
        traverse(subColumn, column)
        colSpan += subColumn.colSpan
      })
      column.colSpan = colSpan
    } else {
      column.colSpan = 1
    }
  }
  originColumns.forEach(column => {
    column.level = 1
    traverse(column)
  })
  const rows = []
  for (let i = 0; i < maxLevel; i++) {
    rows.push([])
  }
  const allColumns = getAllColumns(originColumns)
  allColumns.forEach(column => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1
    } else {
      column.rowSpan = 1
    }
    rows[column.level - 1].push(column)
  })
  return rows
}
const getAllColumns = (columns) => {
  const result = []
  columns.forEach(column => {
    result.push(column)
    if (column.children) {
      result.push.apply(result, getAllColumns(column.children))
    }
  })
  return result
}
export default {
  name: 'ElTableHeader',
  props: {
    fixed: String,
    store: {
      required: true
    },
    defaultSort: {
      type: Object,
      default: () => {
        return {
          prop: '',
          order: ''
        }
      }
    }
  },
  computed: {
    table() {
      return this.$parent
    },
    ...mapStates({
      columns: 'columns'
    })
  },
  render(h) {
    const originColumns = this.store.states.originColumns
    const columnRows = convertToRows(originColumns, this.columns)
    const isGroup = columnRows.length > 1
    if (isGroup) {
      this.$parent.isGroup = true
    }
    return (
      <table class='el-table__header' cellspacing='0' cellpadding='0' border='0'>
        {
          // this._l
        }
      </table>
    )
  }
}
