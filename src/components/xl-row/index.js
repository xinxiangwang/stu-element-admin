import XlRow from './row'

XlRow.install = function(Vue) {
  Vue.component(XlRow.name, XlRow)
  console.log(Vue)
}

export default XlRow
