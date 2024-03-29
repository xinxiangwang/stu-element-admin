import Vue from 'vue'
import scrollbarWidth from './scrollbar-width'
import header from 'element-ui/packages/header'

class TableLayout {
  constructor(options) {
    this.observers = []
    this.table = null
    this.columns = null
    this.fit = true
    this.showHeader = true
    this.height = true
    this.scrollX = false
    this.scrollY = false
    this.bodyWidth = null
    this.fixedWidth = null
    this.rightFixedWidth = null
    this.tableHeight = null
    this.headerHeight = 44
    this.appendHeight = 0
    this.footerHeight = 44
    this.viewportHeight = null
    this.bodyHeight = null
    this.fixedBodyHeight = null
    this.fixedBodyHeight = null
    this.gutterWidth = scrollbarWidth()

    for (const name in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(name)) {
        this[name] = options[name]
      }
    }
    if (!this.table) {
      throw new Error('table is required for Table Layout')
    }
    if (!this.store) {
      throw new Error('store is required for Table Layout')
    }
  }
  headerDisplayNone(elm) {
    if (!elm) return true
    let headerChild = elm
    while (headerChild.tagName !== 'DIV') {
      if (getComputedStyle(headerChild).display === 'none') {
        return true
      }
      headerChild = headerChild.parentElement
    }
    return false
  }
  updateElsHeight() {
    if (!this.table.$ready) return Vue.nextTick(() => this.updateElsHeight())
    const { headerWrapper, appendWrapper, footerWrapper } = this.table.$refs
    this.appendHeight = appendWrapper ? appendWrapper.offsetHeight : 0
    if (this.showHeader && !headerWrapper) return

    const headerTrElm = headerWrapper ? headerWrapper.querySelector('.el-table__header tr') : null
    const noneHeader = this.headerDisplayNone(headerTrElm)
    const headerHeight = this.headerHeight = !this.showHeader ? 0 : headerWrapper.offsetHeight
    if (this.showHeader && !noneHeader && headerWrapper.offsetWidth > 0 && (this.table.columns || []).length > 0 && headerHeight < 2) {
      return Vue.nextTick(() => this.updateElsHeight())
    }
  }
  updateColumnsWidth() {
    if (Vue.prototype.$isServer) return
    const fit = this.fit
    const bodyWidth = this.table.$el.clientWidth
    let bodyMinWidth = 0

    const flattenColumns = this.getFlattenColumns()
  }
  getFlattenColumns() {
    const flattenColumns = []
    const columns = this.table.columns
    columns.forEach(column => {
      if (column.isColumnGroup) {
        flattenColumns.push.apply(flattenColumns, column.columns)
      } else {
        flattenColumns.push(column)
      }
    })
    return flattenColumns
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  removeObserver(observer) {
    const index = this.observers.indexOf(observer)
    if (index !== -1) {
      this.observers.splice(index, 1)
    }
  }
  notifyObservers(event) {
    const observers = this.observers
    observers.forEach((observer) => {
      switch (event) {
        case 'columns':
          observer.onColumnsChange(this)
          break
        case 'scrollable':
          observer.onScrollableChange(this)
          break
        default:
          throw new Error(`Table Layout don't have event ${event}.`)
      }
    })
  }
  // updateScrollY() {
  //   const height = this.height
  //   if (height === null) return false
  //   const bodyWrapper = this.table.bodyWrapper
  //   if (this.table.$el && bodyWrapper) {
  //     const body = bodyWrapper
  //   }
  // }
}

export default TableLayout
