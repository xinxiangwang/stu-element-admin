import { getPropByPath } from '../../../utils/util'

export const cellForced = {
  selection: {},
  index: {},
  expand: {}
}

export function defaultRenderCell(h, { row, column, $index }) {
  const property = column.property
  const value = property && getPropByPath(row, property).v
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index)
  }
  return value
}

export function treeCellPrefix(h, { row, treeNode, store }) {
  if (!treeNode) return null
}
