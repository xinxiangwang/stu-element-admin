import Watcher from './watcher'

Watcher.prototype.mutations = {
  insertColumn(states, column, index, parent) {
    let array = states._columns
    if (parent) {
      array = parent.children
      if (!array) {
        array = parent.children = []
      }
    }
    if (typeof index !== 'undefined') {
      array.splice(index, 0, column)
    } else {
      array.push(column)
    }
    // if (column.type === 'selection') {}
    if (this.table.$ready) {
      this.updateColumns()
      this.scheduleLayout()
    }
  }
}

Watcher.prototype.commit = function(name, ...args) {
  const mutations = this.mutations
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args))
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}

Watcher.prototype.updateTableScrollY = function() {}

export default Watcher
