import Vue from 'vue'
import scrollbarWidth from './scrollbar-width'

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
