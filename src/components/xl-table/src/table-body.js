import { mapStates } from './store/helper'
export default {
  name: 'XlTableBody',
  computed: {
    ...mapStates({
      data: 'data',
      columns: 'columns',
      leftFixedLeafCount: 'fixedLeafColumnsLength',
      rightFixedLeafCount: 'rightFixedLeafColumnsLength',
      columnsCount: states => states.columns.length,
    }),
    table() {
      return this.$parent
    }
  },
  props: {
    stripe: Boolean
  },
  methods: {
    isColumnHidden(index) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedLeafCount
      } else if (this.fixed === 'right') {
        return index < this.columnsCount - this.rightFixedLeafCount
      } else {
        return (index < this.leftFixedLeafCount) || (index >= this.columnsCount - this.rightFixedLeafCount)
      }
    },
    getRowClass(row, rowIndex) {
      const classes = ['el-table__row']
      if (this.stripe && rowIndex % 2 === 1) {
        classes.push('el-table__row--striped')
      }
      const rowClassName = this.table.rowClassName
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName)
      } else if (typeof rowClassName === 'function') {
        // eslint-disable-next-line no-useless-call
        classes.push(rowClassName.call(null, { row, rowIndex }))
      }
    },
    rowRender(row, $index, treeRowData) {
      const { columns } = this
      const columnHidden = columns.map((column, index) => this.isColumnHidden(index))
      const rowClasses = this.getRowClass(row, $index)
      let display = true
      if (treeRowData) {
        rowClasses.push('el-table__row--level-' + treeRowData.level)
      }
    },
    wrappedRowRender(row, $index) {

    }
  },
  render(h) {
    const data = this.data || []
    return (
      <table
        class='el-table__body'
        cellspacing='0'
        cellpadding='0'
        border='0'>
        <colgroup>
          {
            this.columns.map(column => <col name={ column.id } key={column.id} />)
          }
        </colgroup>
        <tbody>
          {
            data.reduce((acc, row) => {
              return acc.concat(this.wrappedRowRender(row, acc.length))
            }, [])
          }
        </tbody>
      </table>
    )
  }
}
