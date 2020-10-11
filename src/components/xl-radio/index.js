import XlRadio from './radio.vue'
import XlRadioGroup from './radio-group.vue'

XlRadio.install = function(Vue) {
  Vue.component(XlRadio.name, XlRadio)
  Vue.component(XlRadioGroup.name, XlRadioGroup)
}

export default XlRadio
