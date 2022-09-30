import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      states: {
        columns: [],
        _columns: [],
        fixedColumns: [],
        rightFixedColumns: [],
        leafColumns: [],
        fixedLeafColumns: [],
        rightFixedLeafColumns: [],
        leafColumnsLength: 0,
        fixedLeafColumnsLength: 0,
        rightFixedLeafColumnsLength: 0
      }
    }
  },
  methods: {
    updateColumns() {
      const states = this.states
      const _columns = states._columns || []
      states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left')
      states.rightFixedColumns = _columns.filter(column => column.fixed === 'right')
    },
    scheduleLayout(needUpdateColumns) {
      if (needUpdateColumns) {
        this.updateColumns()
      }
      this.table.debouncedUpdateLayout()
    }
  }
})
