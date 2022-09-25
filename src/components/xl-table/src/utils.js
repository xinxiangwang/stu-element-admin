function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
export function mergeOptions(defaults, config) {
  const options = {}
  let key
  for (key in defaults) {
    options[key] = defaults[key]
  }
  for (key in config) {
    if (hasOwn(config, key)) {
      const value = config[key]
      if (typeof value !== 'undefined') {
        options[key] = value
      }
    }
  }
  return options
}
// 将传递的函数从右往左依次执行，执行的过程中将会把上一个函数的返回值传递给下一个执行的函数作为参数，以此类推
export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export function parseWidth(width) {
  if (width !== undefined) {
    width = parseInt(width, 10)
    if (isNaN(width)) {
      width = null
    }
  }
  return width
}

export function parseMinWidth(minWidth) {
  if (minWidth !== undefined) {
    minWidth = parseInt(minWidth, 10)
    if (isNaN(minWidth)) {
      minWidth = null
    }
  }
  return minWidth
}
