import Vue from 'vue'
const doFlattenColumns = (columns) => {
  const result = []
  columns.forEach((column) => {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children))
    } else {
      result.push(column)
    }
  })
  return result
}
export default Vue.extend({
  data() {
    return {
      states: {
        originColumns: [],
        columns: [],
        _columns: [],
        fixedColumns: [],
        rightFixedColumns: [],
        leafColumns: [],
        fixedLeafColumns: [],
        rightFixedLeafColumns: [],
        leafColumnsLength: 0,
        fixedLeafColumnsLength: 0,
        rightFixedLeafColumnsLength: 0,
        isComplex: false
      }
    }
  },
  methods: {
    updateColumns() {
      console.log('zzzzzzzzzzzzzzzz')
      const states = this.states
      const _columns = states._columns || []
      states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left')
      states.rightFixedColumns = _columns.filter(column => column.fixed === 'right')
      if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
        _columns[0].fixed = true
        states.fixedColumns.unshift(_columns[0])
      }
      const notFixedColumns = _columns.filter(column => !column.fixed)
      states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns)

      const leafColumns = doFlattenColumns(notFixedColumns)
      const fixedColumns = doFlattenColumns(states.fixedColumns)
      const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns)

      states.columns = [].concat(fixedColumns).concat(leafColumns).concat(rightFixedLeafColumns)
      states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0
    },
    scheduleLayout(needUpdateColumns) {
      if (needUpdateColumns) {
        this.updateColumns()
      }
      this.table.debouncedUpdateLayout()
    }
  }
})
