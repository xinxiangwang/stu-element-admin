import XlTableColumn from '../xl-table/src/table-column'

XlTableColumn.install = function(Vue) {
  Vue.component(XlTableColumn.name, XlTableColumn)
}

export default XlTableColumn
